import { v4 as uuidv4 } from 'uuid';

export class Identifier {
	private _value: string;

	constructor() {
		this._value = uuidv4();
	}

	get value(): string {
		return this._value;
	}
}
