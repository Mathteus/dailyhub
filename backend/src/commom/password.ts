export class PasswordLenghtLessThanMin extends Error {
	constructor() {
		super('Password length is less than min!');
	}
}

export class PasswordLenghtLessThanMax extends Error {
	constructor() {
		super('Password length is less than max!');
	}
}

export class PasswordSpecialLessThanMin extends Error {
	constructor() {
		super('Password special is less than min!');
	}
}

export class PasswordNumberLessThanMin extends Error {
	constructor() {
		super('Password number is less than min!');
	}
}

export class PasswordUpperLessThanMin extends Error {
	constructor() {
		super('Password upper is less than min!');
	}
}

export interface IPasswordConfig {
	minLength: number;
	maxLength: number;

	needSpecial?: boolean;
	minSpecial?: number;

	needNumber?: boolean;
	minNumber?: number;

	needUpper?: boolean;
	minUpper?: number;
}

export interface IPasswordParam {
	password: string;
	config: IPasswordConfig;
}

export class Password {
	private _value: string;
	private _config: IPasswordConfig;

	constructor(param: IPasswordParam) {
		this._config = param.config;
		this.validatePassword(param.password);
		this._value = param.password;
	}

	private validatePasswordLength(value: string) {
		if (value.length < this._config.minLength) {
			throw new PasswordLenghtLessThanMin();
		}

		if (value.length > this._config.maxLength) {
			throw new PasswordLenghtLessThanMax();
		}
		return true;
	}

	private validatePasswordSpecial(value: string) {
		if (
			!this._config.minSpecial ||
			value.search(/[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/) <
				this._config.minSpecial
		) {
			throw new PasswordSpecialLessThanMin();
		}
		return true;
	}

	private validatePasswordNumber(value: string) {
		if (
			!this._config.minNumber ||
			value.search(/[0-9]/) < this._config.minNumber
		) {
			throw new PasswordNumberLessThanMin();
		}

		return true;
	}

	private validatePasswordUpper(value: string) {
		if (
			!this._config.minUpper ||
			value.search(/[A-Z]/) < this._config.minUpper
		) {
			throw new PasswordUpperLessThanMin();
		}
		return true;
	}

	public validatePassword(value: string) {
		this.validatePasswordLength(value);
		if (this._config.needSpecial) {
			this.validatePasswordSpecial(value);
		}
		if (this._config.needNumber) {
			this.validatePasswordNumber(value);
		}
		if (this._config.needUpper) {
			this.validatePasswordUpper(value);
		}

		this._value = value;
	}

	public get value(): string {
		return this._value;
	}
}
