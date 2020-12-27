import { sanitize } from '../../../utils/error/handler';
import { lookup } from '../../../utils/geoapify';

export default async function handler({ query: { address } }, res) {
  try {
    res.status(200).json(await lookup(address));
  } catch (error) {
    res.status(error.statusCode).json(sanitize(error));
  }
}
