export class InvalidEmail extends Error {
	constructor() {
		super('Email is invalid');
	}
}

export class Email {
	private _value: string;

	constructor(value: string) {
		this.validateEmail(value);
		this._value = value;
	}

	private validateEmail(value: string) {
		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
			throw new InvalidEmail();
		}
		return true;
	}

	get value(): string {
		return this._value;
	}
}
