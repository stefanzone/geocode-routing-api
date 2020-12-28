import { BadRequest } from 'http-json-errors';
import humanizeDuration from 'humanize-duration';
import is from 'is2';

import { Language, Mode, routing, search } from '../lib/geoapify';

/**
 * Sammelt Informationen zu einer gegebenen Adresse.
 * @param {String} address Eine Adresse.
 */
export const lookup = async (address) => {
  const meta = await search(address);

  const properties = meta.features[0].properties;

  return {
    address: {
      street: properties.street,
      number: properties.housenumber,
      city: properties.city,
      county: properties.county,
      state: properties.state,
      postCode: properties.postcode,
      country: properties.country,
      countryCode: properties.country_code,
      formatted: properties.formatted
    },
    position: {
      lon: properties.lon,
      lat: properties.lat
    }
  };
};

/**
 * Sammelt Informationen zu einer Route zwischen zwei verschiedenen Orten.
 * @param {String} origin Adresse des Ursprungsortes.
 * @param {String} destination Adresse des Zielortes.
 * @param {Mode} mode Transportmittel
 * @param {Language} language Gewünschte Sprache der Routenführung.
 *
 * @throws {BadRequest} Parameter 'origin' ist nicht vorhanden.
 * @throws {BadRequest} Parameter 'origin' hat keinen Wert.
 * @throws {BadRequest} Parameter 'destination' ist nicht vorhanden.
 * @throws {BadRequest} Parameter 'destination' hat keinen Wert.
 */
export const route = async (origin, destination, mode = Mode.DRIVE, language = Language.DE) => {
  // Überprüfung der Angaben zum Ursprungsort.
  if (is.undefined(origin)) throw new BadRequest('Parameter {origin} is required.');
  if (is.empty(origin)) throw new BadRequest('Parameter {origin} must not be empty.');

  // Überprüfung der Angaben zum Zielort.
  if (is.undefined(destination)) throw new BadRequest('Parameter {destination} is required.');
  if (is.empty(destination)) throw new BadRequest('Parameter {destination} must not be empty.');

  const address = {
    origin: await lookup(origin),
    destination: await lookup(destination)
  };

  const coordinates = {
    origin: `${address.origin.position.lat},${address.origin.position.lon}`,
    destination: `${address.destination.position.lat},${address.destination.position.lon}`
  };

  const meta = await routing(coordinates.origin, coordinates.destination, mode, language);

  const properties = meta.features[0].properties.legs[0];

  return {
    summary: {
      location: {
        origin: address.origin.address.formatted,
        destination: address.destination.address.formatted
      },
      duration: {
        seconds: properties.time,
        text: humanizeDuration(properties.time * 1000, { language: language })
      },
      distance: {
        meters: properties.distance,
        text:
          properties.distance > 1000
            ? properties.distance / 1000 + ' km'
            : properties.distance + ' m'
      }
    },
    route: properties.steps.map(function (step) {
      return {
        instruction: step.instruction.text,
        distance: step.distance > 1000 ? step.distance / 1000 + ' km' : step.distance + ' m',
        duration: humanizeDuration(step.time * 1000, { language: language })
      };
    })
  };
};
