import { ShouldNotExceedLengthOfChars } from '@helpers/decorators/classValidationDecorators';
import { IProfile } from '@interfaces/userInterfaces';

export default class ProfileModel {
	private id?: number;
	private userid!: number;

	@ShouldNotExceedLengthOfChars(50)
	private firstName!: string | null;

	@ShouldNotExceedLengthOfChars(50)
	private lastName!: string | null;

	private address!: string | null;
	private image!: string | null;

	constructor({ id, userid, firstName, lastName, address, image }: IProfile) {
		this.setId(id);
		this.setUserId(userid);
		this.setFirstName(firstName);
		this.setLastName(lastName);
		this.setAddress(address);
		this.setImage(image);
	}

	public getId(): number | undefined {
		return this.id;
	}

	public getUserId(): number {
		return this.userid;
	}

	public getFirstName(): string | null {
		return this.firstName;
	}

	public getLastName(): string | null {
		return this.lastName;
	}

	public getAddress(): string | null {
		return this.address;
	}

	public getImage(): string | null {
		return this.image;
	}

	public setId(value: number | undefined): void {
		this.id = value;
	}

	public setUserId(value: number): void {
		this.userid = value;
	}

	public setFirstName(value: string | null): void {
		this.firstName = value;
	}

	public setLastName(value: string | null): void {
		this.lastName = value;
	}

	public setAddress(value: string | null): void {
		this.address = value;
	}

	public setImage(value: string | null): void {
		this.image = value;
	}
}
