import { ShouldNotBeEmpty, ShouldNotExceedLengthOfChars } from '@helpers/decorators/classValidationDecorators';
import { IProfile } from '@interfaces/userInterfaces';

export default class ProfileModel {
	private id: number;
	private userid: number;

	@ShouldNotBeEmpty()
	@ShouldNotExceedLengthOfChars(50)
	private firstName: string;
	
	@ShouldNotBeEmpty()
	@ShouldNotExceedLengthOfChars(50)
	private lastName: string;
	
	@ShouldNotBeEmpty()
	private address: string;
	private image?: string | null;

	constructor({ id, userid, firstName, lastName, address, image }: IProfile) {
		this.id = id;
		this.userid = userid;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.image = image;
	}

	public getId(): number {
		return this.id;
	}

	public getUserId(): number {
		return this.userid;
	}

	public getFirstName(): string {
		return this.firstName;
	}

	public getLastName(): string {
		return this.lastName;
	}

	public getAddress(): string {
		return this.address;
	}

	public getImage(): string | null | undefined {
		return this.image;
	}

	public setId(value: number): void {
		this.id = value;
	}

	public setUserId(value: number): void {
		this.userid = value;
	}

	public setFirstName(value: string): void {
		this.firstName = value;
	}

	public setLastName(value: string): void {
		this.lastName = value;
	}

	public setAddress(value: string): void {
		this.address = value;
	}

	public setImage(value: string | null | undefined): void {
		this.image = value;
	}
}
