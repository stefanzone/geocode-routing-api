/**
 * Entfernt nicht erforderliche Informationen aus dem HTTPError Object.
 * @param {HTTPError} error Das HTTPError Objekt.
 */
export const errorHandler = (error) => {
  delete error.isHttpError;
  return { error: error };
};
