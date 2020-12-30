import { BadRequest } from 'http-json-errors';
import is from 'is2';
import validator from 'validator';

/**
 * Prüft, ob ein Parameter gesetzt und nicht leer ist.
 * @param {String} parameterValue Wert des Parameters.
 * @param {String} parameterName Bezeichnung des Parameters.
 *
 * @throws {BadRequest} Wenn der Parameter nicht gesetzt ist.
 * @throws {BadRequest} Wenn der Wert des Parameters leer ist.
 */
export const validateParameter = (parameterValue, parameterName) => {
  // Prüft, ob der Parameter gesetzt ist.
  if (is.undefined(parameterValue))
    throw new BadRequest(`Parameter {${parameterName}} is required.`);

  // Prüft, ob der Parameter einen Wert enthält.
  if (is.empty(parameterValue))
    throw new BadRequest(`Parameter {${parameterName}} must not be empty.`);
};

/**
 * Prüft, ob es sich um eine valide Koordinate im Format 'lat,long' handelt.
 * @param {String} coordinateValue 'lat,long'-Koordinate
 * @param {String} coordinateName Bezeichnung der Koordinate.
 *
 * @throws {BadRequest} Wenn die Koordinate nicht dem Format 'lat,long' entspricht.
 */
export const validateCoordinate = (coordinateValue, coordinateName) => {
  // Prüft, ob es sich um eine valide geobasierte Koordinate handelt.
  if (!validator.isLatLong(coordinateValue))
    throw new BadRequest(`Parameter {${coordinateName}} must be a valid 'lat,long' coordinate.`);
};

/**
 * Prüft, ob ein Typ Element eines JavaScript Enums ist.
 * @param {String} typeValue Der zu prüfende Typ.
 * @param {Enum} type Das Referenz Enum.
 * @param {String} typeName Bezeichnund des Typs.
 *
 * @throws {BadRequest} Wenn der Typ nicht Element des JavaScript Enums ist.
 */
export const validateType = (typeValue, type, typeName) => {
  const typeValues = Object.values(type);
  if (!is.inArray(typeValue, typeValues))
    throw new BadRequest(`{${typeName}} must be one of [${typeValues}]`);
};
