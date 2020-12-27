import { BadRequest, NotFound, Unauthorized } from 'http-json-errors';
import is from 'is2';
import query from 'querystring';
import validator from 'validator';

// Der Geoapify API Schlüssel, welcher in den Umgebungsvariablen definiert wurde.
const { GEOAPIFY_API_KEY: api_key } = process.env;

const GEOCODE_API_ENDPOINT = 'https://api.geoapify.com/v1/geocode/search';
const ROUTING_API_ENDPOINT = 'https://api.geoapify.com/v1/routing';

export const Mode = {
  DRIVE: 'drive',
  TRUCK: 'truck',
  BICYCLE: 'bicycle',
  WALK: 'walk',
  TRANSIT: 'transit'
};

export const Language = {
  EN: 'en',
  DE: 'de',
  ES: 'es',
  FR: 'fr',
  HI: 'hi',
  IT: 'it',
  PT: 'pt',
  RU: 'ru',
  SL: 'sl',
  SV: 'sv',
  CA: 'ca',
  CS: 'cs'
};

/**
 * Gibt die Abfrage der REST API als JSON Array zurück.
 * @param {String} endpoint Adresse, welche für die Anfrage genutzt wird.
 * @param {Object} params Parameter, welche an die REST API übergeben werden.
 *
 * @throws {Unauthorized} API Schlüssel ist nicht vorhanden.
 * @throws {Unauthorized} API Schlüssel ist fehlerhaft.
 */
const getResponse = async (endpoint, params) => {
  if (is.undefined(api_key)) throw new Unauthorized(`Undefined Api Key.`);

  params['apiKey'] = api_key;

  const resource = `${endpoint}?${query.stringify(params)}`;
  const request = await fetch(resource);
  const response = request.json();

  if (is.equal(response.error, 'Unauthorized')) throw new Unauthorized('Invalid API Key.');

  return response;
};

/**
 * Fragt Metadaten zu einer Adresse ab.
 * @param {String} address Eine existente Adresse.
 *
 * @throws {BadRequest} Parameter 'address' ist nicht vorhanden.
 * @throws {BadRequest} Parameter 'address' hat keinen Wert.
 * @throws {NotFound} Adresse konnte nicht gefunden werden.
 */
export const search = async (address) => {
  if (is.undefined(address)) throw new BadRequest('Parameter {address} is required.');
  if (is.empty(address)) throw new BadRequest('Parameter {address} must not be empty.');

  const response = await getResponse(GEOCODE_API_ENDPOINT, {
    text: address,
    lang: Language.DE
  });

  if (is.empty(response.features)) throw new NotFound(`Address {${address}} could not be found.`);

  return response;
};

/**
 * Fragt Informationen zu einer Route ab.
 * @param {String} origin Latitude, Longitude Koordinate des Ursprungsortes.
 * @param {String} destination Latitude, Longitude Koordinate des Zielortes.
 * @param {Mode} mode Methode der Fortbewegung.
 * @param {Language} language Sprachcode für die Routenbeschreibung.
 *
 * @throws {BadRequest} Parameter 'origin' ist nicht vorhanden.
 * @throws {BadRequest} Parameter 'origin' hat keinen Wert.
 * @throws {BadRequest} Parameter 'destination' ist nicht vorhanden.
 * @throws {BadRequest} Parameter 'destination' hat keinen Wert.
 * @throws {BadRequest} Angabe eines nicht unterstützten Transportmittels.
 * @throws {BadRequest} Angabe eines nicht unterstützten Sprachcodes.
 * @throws {BadRequest} Es kann keine Route für das angegebene Verkehrsmittel gefunden werden.
 */
export const routing = async (origin, destination, mode = Mode.DRIVE, language = Language.DE) => {
  // Überprüfung der Angaben zum Ursprungsort.
  if (is.undefined(origin)) throw new BadRequest('Parameter {origin} is required.');
  if (is.empty(origin)) throw new BadRequest('Parameter {origin} must not be empty.');
  if (!validator.isLatLong(origin))
    throw new BadRequest("Parameter {origin} must be a valid 'lat,long' coordinate.");

  // Überprüfung der Angaben zum Zielort.
  if (is.undefined(destination)) throw new BadRequest('Parameter {destination} is required.');
  if (is.empty(destination)) throw new BadRequest('Parameter {destination} must not be empty.');
  if (!validator.isLatLong(destination))
    throw new BadRequest("Parameter {destination} must be a valid 'lat,long' coordinate.");

  // Überprüfung der Angaben zum Transportmittel.
  const modes = Object.values(Mode);
  if (!is.inArray(mode, modes)) throw new BadRequest(`Invalid travel mode {${mode}}.`);

  // Überprüfung der Angaben zur sprachlichen Ausgabe.
  const languages = Object.values(Language);
  if (!is.inArray(language, languages))
    throw new BadRequest(`Parameter {lang} must be a valid language code.`);

  const response = await getResponse(ROUTING_API_ENDPOINT, {
    waypoints: `${origin}|${destination}`,
    mode: mode,
    lang: language
  });

  // Fehler bei der Routenberechnung.
  if (is.equal(response.error, 'Bad Request')) throw new BadRequest(response.message);

  return response;
};
