import { BadRequest, NotFound } from 'http-json-errors';
import is from 'is2';

import { getResponse } from '../utils/helpers/rest';

const GEOCODE_API_ENDPOINT = 'https://nominatim.openstreetmap.org/search';

/**
 * Fragt Metadaten zu einer Adresse ab.
 * @param {String} address Eine Adresse.
 *
 * @throws {BadRequest} Parameter 'address' ist nicht vorhanden.
 * @throws {BadRequest} Parameter 'address' hat keinen Wert.
 * @throws {NotFound} Adresse konnte nicht gefunden werden.
 */
export const getAddress = async (address) => {
  if (is.undefined(address)) throw new BadRequest('Parameter {address} is required.');
  if (is.empty(address)) throw new BadRequest('Parameter {address} must not be empty.');

  const response = await getResponse(GEOCODE_API_ENDPOINT, {
    q: address,
    format: 'json',
    addressdetails: 1,
    'accept-language': 'de'
  });

  if (is.empty(response)) throw new NotFound(`Address {${address}} could not be found.`);

  return response;
};
