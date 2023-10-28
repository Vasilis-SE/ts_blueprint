import Logger from '@config/logger';
import { IUserDb } from '@interfaces/userInterfaces';
import UserModel from '@models/userModel';
import { PrismaClient } from '@prisma/client';
import UserRepository from '@repositories/userRepository';

export default class UserPostgresRepository extends UserRepository {
	public async getUserById(user: UserModel): Promise<boolean | IUserDb> {
		const prisma = new PrismaClient();

		try {
			const searchedUser: IUserDb | null = await prisma.users.findUnique({
				where: {
					id: user.getId()
				}
			});

			if (!searchedUser) throw new Error(`Could not find user with given id [${user.getId()}]...`);

			return searchedUser;
		} catch (error: any) {
			Logger.error(`Repository Error on getUserById. Message: ${error.message}`, __filename);
			return false;
		}
	}

	public async getUserByUsername(user: UserModel): Promise<boolean | IUserDb> {
		const prisma = new PrismaClient();

		try {
			const searchedUser: IUserDb | null = await prisma.users.findUnique({
				where: {
					username: user.getUsername()
				}
			});

			if (!searchedUser) throw new Error(`Could not find user with given username [${user.getUsername()}]...`);

			return searchedUser;
		} catch (error: any) {
			Logger.error(`Repository Error on getUserByUsername. Message: ${error.message}`, __filename);
			return false;
		}
	}

	public async storeUser(user: UserModel): Promise<IUserDb | boolean> {
		const prisma = new PrismaClient();

		try {
			const newUser: IUserDb = await prisma.users.create({
				data: {
					username: user.getUsername(),
					password: user.getPassword()
				}
			});

			return newUser;
		} catch (error: any) {
			Logger.error(`Repository Error on storeUser. Message: ${error.message}`, __filename);
			return false;
		}
	}
}
