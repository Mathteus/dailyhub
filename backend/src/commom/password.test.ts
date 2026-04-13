import { describe, expect, it } from 'vitest';
import {
	Password,
	PasswordSpecialLessThanMin,
	PasswordUpperLessThanMin,
	PasswordNumberLessThanMin,
	PasswordLenghtLessThanMin,
} from './password';

describe('Password', () => {
	it('should be possible to create a simple password', () => {
		const password = new Password({
			value: '123456789',
		});

		expect(password).toBeDefined();
		expect(password.value).toBe('123456789');
	});

	it('should be need to use at least one special character', () => {
		expect(() => {
			new Password({
				value: '126ghfh',
				config: {
					minSpecial: 1,
					minLength: 6,
				},
			});
		}).toThrow(PasswordSpecialLessThanMin);
	});

	it('should be need to use at least one Upper character', () => {
		expect(() => {
			new Password({
				value: '21sd2c',
				config: {
					minLength: 6,
					minUpper: 1,
				},
			});
		}).toThrow(PasswordUpperLessThanMin);
	});

	it('should be need to use at least one number character', () => {
		expect(() => {
			new Password({
				value: 'adsado',
				config: {
					minLength: 6,
					minNumber: 1,
				},
			});
		}).toThrow(PasswordNumberLessThanMin);
	});

	it('should be need to use 6 characters at least', () => {
		expect(() => {
			new Password({
				value: '1234',
				config: {
					minLength: 6,
				},
			});
		}).toThrow(PasswordLenghtLessThanMin);
	});
});
