import { describe, expect, it } from 'vitest';
import { Email, InvalidFormatEmail } from './email';

describe('Email', () => {
	it('should be possible to create an email.', () => {
		const email = new Email('test@example.com');
		expect(email).toBeDefined();
		expect(email.value).toBe('test@example.com');
	});

	it('should throw an error if email is invalid.', () => {
		expect(() => {
			new Email('invalid@asdsadsads');
		}).toThrow(InvalidFormatEmail);
	});
});
