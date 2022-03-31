import { ITokenPayload } from '../../interfaces';

declare global {
  namespace Express {
    interface Request {
      userData?: ITokenPayload
    }
  }
}
