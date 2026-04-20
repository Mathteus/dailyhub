import { z } from 'zod';

export class InvalidFormatEmail extends Error {
	constructor() {
		super('email is in an invalid format!');
	}
}

const emailSchema = z.email();

export class Email {
	private _value: string;

	constructor(value: string) {
		this.validateEmail(value);
		this._value = value;
	}

	private validateEmail(value: string) {
		if (!emailSchema.safeParse(value).success) {
			throw new InvalidFormatEmail();
		}
	}

	get value(): string {
		return this._value;
	}
}
