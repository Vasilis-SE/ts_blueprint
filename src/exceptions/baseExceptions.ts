export class BaseException extends Error {
	status: boolean;
	message: string;
	httpCode: number;

	constructor(name: string, msg: string, httpCode: number) {
		super();
		this.status = false;
		this.name = name;
		this.message = msg;
		this.httpCode = httpCode;
	}

	public toString(): string {
		return `status: ${this.status}, httpCode: ${this.httpCode}, message: ${this.message}`;
	}
}

export class PropertyException extends BaseException {
	property: string;

	constructor(name: string, msg: string, httpCode: number, prop: string) {
		super(name, msg, httpCode);
		this.property = prop;
	}

	public toString(): string {
		return `[ ${super.toString()}, property: ${this.property} ]`;
	}
}

export class ExpectedPropertyException extends PropertyException {
	expected: string;

	constructor(name: string, msg: string, httpCode: number, prop: string, exp: string) {
		super(name, msg, httpCode, prop);
		this.expected = exp;
	}

	public toString(): string {
		return `[ ${super.toString()}, expected: ${this.expected} ]`;
	}
}
