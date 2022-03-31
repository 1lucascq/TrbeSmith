// import { VerifyOptions } from 'jsonwebtoken';
// import { ITokenPayload } from '../interfaces';

// /**
// @param token the expected token payload
//  */
// export default function validateToken(token: string): Promise<ITokenPayload> {
//   const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'));

//   const verifyOptions: VerifyOptions = {
//     algorithms: ['RS256'],
//   };

//   return new Promise((resolve, reject) => {
//     verify(token, publicKey, verifyOptions, (error, decoded: ITokenPayload) => {
//       if (error) return reject(error);

//       resolve(decoded);
//     });
//   });
// }