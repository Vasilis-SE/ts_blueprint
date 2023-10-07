import { ShouldBeSecurePassword, ShouldNotBeEmpty, ShouldNotExceedLengthOfChars } from '@decorators/classValidationDecorators';
import { IUser } from '@interfaces/userInterface';

export default class UserModel {
	private id?: number | undefined;

	@ShouldNotBeEmpty()
    @ShouldNotExceedLengthOfChars(30)
	private username: string;

	@ShouldNotBeEmpty()
    @ShouldBeSecurePassword()
	private password: string;

	constructor({ id, username, password }: IUser) {
		this.id = id;
		this.username = username;
		this.password = password;
	}

	public getId(): number | undefined {
		return this.id;
	}

	public getUsername(): string {
		return this.username;
	}

	public getPassword(): string {
		return this.password;
	}

	public setId(value: number | undefined): void {
		this.id = value;
	}

	public setUsername(value: string): void {
		this.username = value;
	}

	public setPassword(value: string): void {
		this.password = value;
	}
}
