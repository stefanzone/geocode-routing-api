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
      postcode: properties.postcode,
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
 */
export const route = async (origin, destination, mode = Mode.DRIVE, language = Language.DE) => {
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
    address: {
      origin: address.origin.address.formatted,
      destination: address.destination.address.formatted
    },
    route: {
      steps: properties.steps.map((step) => step.instruction.text),
      details: {
        distance: properties.distance,
        time: properties.time
      }
    }
  };
};
