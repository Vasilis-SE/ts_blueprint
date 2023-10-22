import Logger from '@config/logger';
import { IUserDB } from '@interfaces/userInterface';
import UserModel from '@models/userModel';
import { Prisma, PrismaClient } from '@prisma/client';
import UserRepository from '@repositories/userRepository';

export default class UserPostgresRepository extends UserRepository {

	public async storeUser(user: UserModel): Promise<IUserDB | boolean> {
		const prisma = new PrismaClient();

		try {
			const newUser: IUserDB = await prisma.users.create({
				data: {
					username: user.getUsername(),
					password: user.getPassword()
				}
			});

			return newUser;
		} catch (error: any) {
			Logger.error(`Repository Error on storeUser. Message: ${error.message}`, __filename)
			return false;
		}
	}
}
