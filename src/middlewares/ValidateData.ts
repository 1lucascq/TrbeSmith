import { Request, Response, NextFunction } from 'express';
import { IAddContact } from '../interfaces';
import Joi from 'joi';

export default function ValidateData (req: Request, _res: Response, next: NextFunction) {
  const { name, email, image, phoneNumbers } = req.body as IAddContact;
  
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().not().empty().required(),
    image: Joi.string().not().empty().required(),
    phoneNumbers: Joi.array().not().empty().required(),
  })
    .validate({ name, email, image, phoneNumbers })
  if(error) {
    return next(error)
  }
  next()
};
