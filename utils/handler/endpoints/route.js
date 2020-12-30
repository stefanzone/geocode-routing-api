import humanizeDuration from 'humanize-duration';

import { Language, Mode, routingEndpoint } from '../../../lib/here';
import { validateParameter } from '../../helpers/validate';
import { geoCodeHandler } from './geocode';

export const routeHandler = async (
  origin,
  destination,
  mode = Mode.DRIVE,
  language = Language.DE
) => {
  validateParameter(origin, 'origin');
  validateParameter(destination, 'destination');
  validateParameter(mode, 'mode');
  validateParameter(language, 'lang');

  const address = {
    origin: await geoCodeHandler(origin),
    destination: await geoCodeHandler(destination)
  };

  const coordinates = {
    origin: `${address.origin.position.lat},${address.origin.position.lon}`,
    destination: `${address.destination.position.lat},${address.destination.position.lon}`
  };

  const routingEndpointResponse = await routingEndpoint(
    coordinates.origin,
    coordinates.destination,
    mode,
    language
  );

  const properties = routingEndpointResponse.response.route[0];

  return {
    summary: {
      location: {
        origin: address.origin.address.formatted,
        destination: address.destination.address.formatted
      },
      text: properties.summary.text,
      duration: {
        seconds: properties.summary.travelTime,
        text: humanizeDuration(properties.summary.travelTime * 1000, { language: language })
      },
      distance: {
        meters: properties.summary.distance,
        text:
          properties.summary.distance > 1000
            ? properties.summary.distance / 1000 + ' km'
            : properties.summary.distance + ' m'
      }
    },
    route: properties.leg[0].maneuver.map(function (step) {
      return {
        instruction: step.instruction,
        distance: step.length > 1000 ? step.length / 1000 + ' km' : step.length + ' m',
        duration: humanizeDuration(step.travelTime * 1000, { language: language })
      };
    })
  };
};
