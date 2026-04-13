import { DEFAULT_PASSWORD_CONFIG } from './constants';

export class PasswordLenghtLessThanMin extends Error {
	constructor() {
		super('Password length is less than min!');
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
	minSpecial?: number;
	minNumber?: number;
	minUpper?: number;
}

export interface IPasswordParam {
	value: string;
	config?: IPasswordConfig;
}

export class Password {
	private _value: string;
	private _config: IPasswordConfig;

	constructor(param: IPasswordParam) {
		this._config = param.config || DEFAULT_PASSWORD_CONFIG;
		this.validatePassword(param.value);
		this._value = param.value;
	}

	private validatePasswordSpecial(value: string) {
		if (
			!this._config.minSpecial ||
			value.search(/[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/) <
				this._config.minSpecial
		) {
			throw new PasswordSpecialLessThanMin();
		}
	}

	private validatePasswordNumber(value: string) {
		if (
			!this._config.minNumber ||
			value.search(/[0-9]/) < this._config.minNumber
		) {
			throw new PasswordNumberLessThanMin();
		}
	}

	private validatePasswordUpper(value: string) {
		if (
			!this._config.minUpper ||
			value.search(/[A-Z]/) < this._config.minUpper
		) {
			throw new PasswordUpperLessThanMin();
		}
	}

	private validatePassword(value: string) {
		if (value.length < this._config.minLength) {
			throw new PasswordLenghtLessThanMin();
		}

		if (this._config.minSpecial) {
			this.validatePasswordSpecial(value);
		}
		if (this._config.minNumber) {
			this.validatePasswordNumber(value);
		}
		if (this._config.minUpper) {
			this.validatePasswordUpper(value);
		}
	}

	public get value(): string {
		return this._value;
	}
}
