import { geoCodeHandler } from '../../../utils/handler/endpoints/geocode';
import { errorHandler } from '../../../utils/handler/error';

export default async function handler({ query: { address } }, res) {
  try {
    res.status(200).json(await geoCodeHandler(address));
  } catch (error) {
    res.status(error.statusCode).json(errorHandler(error));
  }
}
