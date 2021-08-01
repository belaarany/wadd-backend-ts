import { buildMessage, ValidateBy, ValidationOptions } from "class-validator"

export function IsWaddObjectId(validationOptions?: ValidationOptions): PropertyDecorator {
	return ValidateBy(
		{
			name: "isWaddObjectId",
			validator: {
				validate: (value) => {
					return value && value.match(/^([a-z]{2,4})(\_)(t_){0,1}([a-zA-Z0-9]{10,20})$/g)
				},
				defaultMessage: buildMessage(
					(eachPrefix) => eachPrefix + "$property must be a valid Wadd Object ID",
					validationOptions,
				),
			},
		},
		validationOptions,
	)
}
