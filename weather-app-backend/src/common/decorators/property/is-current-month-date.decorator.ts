import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateTime, Interval } from 'luxon';

export const IsCurrentMonthDateValidatorName = 'isCurrentMonthDate';
export const IsCurrentMonthDateValidatorMessage = 'The date is not in the current month';

export const IsCurrentMonthDate = (validationOptions?: ValidationOptions) => (object: { [key: string]: any }, propertyName: string) => {
  registerDecorator({
    name: IsCurrentMonthDateValidatorName,
    target: object.constructor,
    propertyName,
    options: {
      message: IsCurrentMonthDateValidatorMessage,
      ...validationOptions,
    },
    validator: {
      validate(value: string) {
        const date = DateTime.fromISO(value);
        const startOfMonth = DateTime.local().startOf('month');
        const endOfMonth = DateTime.local().endOf('month');

        return Interval.fromDateTimes(startOfMonth, endOfMonth).contains(date);
      },
    },
  });
};
