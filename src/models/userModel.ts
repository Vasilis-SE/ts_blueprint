import {
	ShouldBeSecurePassword,
	ShouldNotBeEmpty,
	ShouldNotExceedLengthOfChars
} from '@decorators/classValidationDecorators';
import { IUser } from '@interfaces/userInterfaces';
import { Exclude } from 'class-transformer';
import ProfileModel from './profileModel';

export default class UserModel {
	private id?: number;

	@ShouldNotBeEmpty()
	@ShouldNotExceedLengthOfChars(30)
	private username!: string;

	@Exclude({ toPlainOnly: true })
	@ShouldNotBeEmpty()
	@ShouldBeSecurePassword()
	private password!: string;

	private profile?: ProfileModel;

	constructor({id, username, password}: IUser) {
		this.setId(id);
		this.setUsername(username);
		this.setPassword(password);
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

	public setProfile(value?: ProfileModel): void {
		this.profile = value;
	}
}
