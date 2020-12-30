import { routeHandler } from '../../../utils/handler/endpoints/route';
import { errorHandler } from '../../../utils/handler/error';

export default async function handler({ query: { origin, destination, mode, lang } }, res) {
  try {
    res.status(200).json(await routeHandler(origin, destination, mode, lang));
  } catch (error) {
    res.status(error.statusCode).json(errorHandler(error));
  }
}
