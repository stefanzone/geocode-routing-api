import query from 'querystring';

/**
 * Gibt die Abfrage der REST API als JSON Array zurück.
 * @param {String} endpoint Endpoint, welche für die Anfrage genutzt wird.
 * @param {Object} params Parameter, welche an die REST API übergeben werden.
 */
export const getResponse = async (endpoint, params) => {
  const resource = `${endpoint}?${query.stringify(params)}`;
  const request = await fetch(resource);
  const response = request.json();

  return response;
};
