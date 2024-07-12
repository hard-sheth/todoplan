import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsValidEmailConstraint } from './emailvalidation';

export function IsDisposableMail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidEmailConstraint,
    });
  };
}