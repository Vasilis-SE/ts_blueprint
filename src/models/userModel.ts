import {
	ShouldBeSecurePassword,
	ShouldNotBeEmpty,
	ShouldNotExceedLengthOfChars
} from '@decorators/classValidationDecorators';
import { IUserExtended } from '@interfaces/userInterfaces';
import { Exclude } from 'class-transformer';
import ProfileModel from './profileModel';

export default class UserModel {
	private id?: number | undefined;

	@ShouldNotBeEmpty()
	@ShouldNotExceedLengthOfChars(30)
	private username: string;

	@Exclude({ toPlainOnly: true })
	@ShouldNotBeEmpty()
	@ShouldBeSecurePassword()
	private password: string;

	private profile?: ProfileModel | null;


	constructor(user: IUserExtended) {
		this.id = user.id;
		this.username = user.username;
		this.password = user.password;
		this.profile = user.profile;
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

	public getProfile(): ProfileModel | null | undefined {
		return this.profile;
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

	public setProfile(value: ProfileModel | undefined | null): void {
		this.profile = value;
	}
}
