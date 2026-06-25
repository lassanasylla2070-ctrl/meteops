import { registerDecorator, ValidationOptions } from 'class-validator';

export const IsNotBlank = (validationOptions?: ValidationOptions) => (object: any, propertyName: string) => {
  registerDecorator({
    name: 'isNotBlank',
    target: object.constructor,
    propertyName,
    options: {
      message: 'Cannot be empty',
      ...validationOptions,
    },
    validator: {
      validate(value: any) {
        return typeof value === 'string' && value?.trim().length > 0;
      },
    },
  });
};
