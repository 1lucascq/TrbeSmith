import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { INewProduct } from '../interfaces';
import 'express-async-errors';
import ProductsService from '../services/ProductsService';

export default class ProductsController {
  constructor(private productsServices = new ProductsService()) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products: INewProduct[] = await this.productsServices.getAll();
      return res.status(StatusCodes.OK).json(products);    
    } catch (err) {
      next(err);
    }  
  };
}

//   public create = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Cont.create', req.body);
//       const { name, email, image, phoneNumbers } = req.body as IContact;
//       const newContact: IContact = await this.productsService.add({ name, email, image, phoneNumbers });
//       return res.status(StatusCodes.CREATED).json(newContact);
//     } catch (err) {
//       next(err)
//     }  
//   };

//   public update = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Cont.update: ', req.body);
//       const { name, email, image, phoneNumbers } = req.body as IContact;
//       const contact: IContact = await this.productsService.update(+req.params.id, name, email, image, phoneNumbers);
//       return res.status(StatusCodes.OK).json(contact);
//     } catch (err) {
//       next(err)
//     }  
//   };

//   public destroy = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const contact: IContact | null = await this.productsService.exclude(+req.params.id);
//       if (contact === null) {
//         return res.status(StatusCodes.NOT_FOUND).json({ message: 'The refereed ID doesn\'t exist!' });
//       }
      
//       return res.status(StatusCodes.OK).json({ message: 'Contact deleted!'});
//     } catch (err) {
//       next(err)
//     }  
//   };
// }

// import productsService from '../services/productsServices';
// import { IContact } from '../interfaces';
// export default class UserController {
//   constructor(private productsService = new productsService()) { }

//   public getAll = async (_req: Request, res: Response, next: NextFunction) => {
//     try {
//       const products: IContact[] = await this.productsService.getAllproducts();

//       return res.status(StatusCodes.OK).json(products);    
//     } catch (err) {
//       next(err)
//     }  
//   };

//   public getById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const contact: IContact | null = await this.productsService.getById(+req.params.id);
//       if (contact === null) {
//         return res.status(StatusCodes.NOT_FOUND).json({ message: 'The refereed ID doesn\'t exist!' });
//       }
//       return res.status(200).json(contact);
//     } catch (err) {
//       next(err)
//     }  
//   };

//   public create = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Cont.create', req.body);
//       const { name, email, image, phoneNumbers } = req.body as IContact;
//       const newContact: IContact = await this.productsService.add({ name, email, image, phoneNumbers });
//       return res.status(StatusCodes.CREATED).json(newContact);
//     } catch (err) {
//       next(err)
//     }  
//   };

//   public update = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log('Cont.update: ', req.body);
//       const { name, email, image, phoneNumbers } = req.body as IContact;
//       const contact: IContact = await this.productsService.update(+req.params.id, name, email, image, phoneNumbers);
//       return res.status(StatusCodes.OK).json(contact);
//     } catch (err) {
//       next(err)
//     }  
//   };

//   public destroy = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const contact: IContact | null = await this.productsService.exclude(+req.params.id);
//       if (contact === null) {
//         return res.status(StatusCodes.NOT_FOUND).json({ message: 'The refereed ID doesn\'t exist!' });
//       }
      
//       return res.status(StatusCodes.OK).json({ message: 'Contact deleted!'});
//     } catch (err) {
//       next(err)
//     }  
//   };
// }
