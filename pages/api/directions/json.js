import { sanitize } from '../../../utils/error/handler';
import { route } from '../../../utils/geoapify';

export default async function handler({ query: { origin, destination, mode, lang } }, res) {
  try {
    res.status(200).json(await route(origin, destination, mode, lang));
  } catch (error) {
    res.status(error.statusCode).json(sanitize(error));
  }
}
