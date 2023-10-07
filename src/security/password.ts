import * as bcrypt from 'bcrypt';
import { UserGlobals } from '@interfaces/user';
import Validator from '@helpers/validator';
import { ForbiddenCharacters } from '@helpers/enums/generalEnums';

export default class Password {
	private password: string;

	constructor(p?: string) {
		this.password = p ? p : '';
	}

	public hashPassword(): boolean {
		try {
			const saltRounds = 10;
			const salt = bcrypt.genSaltSync(saltRounds);
			const hash = bcrypt.hashSync(this.password, salt);
			this.setPassword(hash);

			return true;
		} catch (e) {
			return false;
		}
	}

	public async comparePassword(plainPass = ''): Promise<boolean> {
		return await bcrypt.compare(plainPass, this.getPassword());
	}

	public isPasswordLong(): boolean {
		return this.password.length >= UserGlobals.PASSWORD_MINLENGTH;
	}

	public async isPasswordStrong() {
		let points = 0;

		if (Validator.hasLowerCase(this.password)) points++;
		if (Validator.hasUpperCase(this.password)) points++;
		if (Validator.hasNumbers(this.password)) points++;
		if (Validator.hasSpecialCharacters(this.password, ForbiddenCharacters._ALL)) points++;
		if (this.isPasswordLong()) points++;

		return points >= 3;
	}

	// Getters - Setters
	public getPassword(): string {
		return this.password;
	}

	public setPassword(p: string): void {
		this.password = p;
	}
}
