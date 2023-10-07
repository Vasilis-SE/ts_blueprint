import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { InputExceedMaxLimit, PasswordIsWeak, PropertyIsMissing } from '@exceptions/customExceptions';
import Password from '@security/password';

export function ShouldNotBeEmpty(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'shouldNotBeEmpty',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (!value) throw new PropertyIsMissing(propertyName);
					return true;
				}
			}
		});
	};
}

export function ShouldNotExceedLengthOfChars(maxLength: number, validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'shouldNotBeEmpty',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: string, args: ValidationArguments) {
					if (value.length > maxLength) throw new InputExceedMaxLimit(propertyName);
					return true;
				}
			}
		});
	};
}

export function ShouldBeSecurePassword(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'shouldNotBeEmpty',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				async validate(value: string, args: ValidationArguments) {
					const password = new Password(value);
					if (!(await password.isPasswordStrong())) throw new PasswordIsWeak();
					return true;
				}
			}
		});
	};
}
