import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isNotEmpty,
  isString,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'notEmptyOrZero', async: false })
export class NotEmptyOrZero implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    console.log(
      args,
      'args validate',
      value,
      'value',
      value !== '',
      "value !== ''",
      value !== 0,
      'value !== 0',
      value !== '0',
      "value !== '0'",
    );
    return value !== '' && value !== 0 && value !== '0';
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args, 'args default message');
    return `${args.property} should not be an empty string or 0`;
  }
}

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isNotEmptyString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean =>
          isString(value) && isNotEmpty(value.trim()),
        defaultMessage: (validationArguments?: ValidationArguments): string =>
          `${validationArguments.property} should be a valid string`,
      },
    });
  };
}
