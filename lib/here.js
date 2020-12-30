import { NotFound } from 'http-json-errors';
import is from 'is2';

import { getResponse } from '../utils/helpers/rest';
import { validateCoordinate, validateParameter, validateType } from '../utils/helpers/validate';

// Der Here API Schlüssel, welcher in den Umgebungsvariablen definiert wurde.
const { HERE_API_KEY: api_key } = process.env;

const ROUTING_API_ENDPOINT = 'https://route.ls.hereapi.com/routing/7.2/calculateroute.json';

export const Language = {
  EN: 'en',
  DE: 'de'
};

export const Mode = {
  DRIVE: 'drive',
  WALK: 'walk',
  BICYCLE: 'bicycle',
  TRANSIT: 'transit'
};

export const routingEndpoint = async (
  origin,
  destination,
  mode = Mode.DRIVE,
  language = Language.DE
) => {
  // Überprüfung der Angaben zum Ursprungsort.
  validateParameter(origin, 'origin');
  validateCoordinate(origin, 'origin');

  // Überprüfung der Angaben zum Zielort.
  validateParameter(destination, 'destination');
  validateCoordinate(destination, 'destination');

  // Überprüfung der Angaben zum genutzen Transportweg.
  validateParameter(mode, 'mode');
  validateType(mode, Mode, 'mode');

  // Überprüfung der Angaben zur sprachlichen Ausgabe.
  validateParameter(language, 'lang');
  validateType(language, Language, 'lang');

  const response = await getResponse(ROUTING_API_ENDPOINT, {
    apiKey: api_key,
    waypoint0: `geo!${origin}`,
    waypoint1: `geo!${destination}`,
    mode: `fastest;${getMode(mode)};traffic:disabled`,
    instructionFormat: 'text',
    language: language
  });

  if (is.undefined(response.response)) throw new NotFound('Route calculation returned no results.');

  return response;
};

const getMode = (mode) => {
  switch (mode) {
    case Mode.DRIVE:
      return 'car';

    case Mode.WALK:
      return 'pedestrian';

    case Mode.BICYCLE:
      return Mode.BICYCLE;

    case Mode.TRANSIT:
      return 'publicTransport';

    default:
      return Mode.DRIVE;
  }
};
