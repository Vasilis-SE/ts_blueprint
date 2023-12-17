import Logger from '@config/logger';
import UserMapper from '@helpers/mappers/userMapper';
import { IProfileDb, IUserDb, IUserDbExtended } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import { PrismaClient } from '@prisma/client';
import UserRepository from '@repositories/userRepository';

export default class UserPostgresRepository extends UserRepository {
	public async getUserById(userid: number): Promise<boolean | IUserDbExtended> {
		const prisma = new PrismaClient();

		try {
			const searchedUser: IUserDbExtended | null = await prisma.users.findUnique({
				where: {
					id: Number(userid)
				},
				include: {
					profile: true
				}
			});

			if (!searchedUser) throw new Error(`Could not find user with given id [${userid}]...`);

			return searchedUser;
		} catch (error: any) {
			Logger.error(`Repository Error on getUserById. Message: ${error.message}`, __filename);
			return false;
		}
	}

	public async getUserByUsername(username: string): Promise<boolean | IUserDbExtended> {
		const prisma = new PrismaClient();

		try {
			const searchedUser: IUserDbExtended | null = await prisma.users.findUnique({
				where: {
					username: username
				},
				include: {
					profile: true
				}
			});

			if (!searchedUser) throw new Error(`Could not find user with given username [${username}]...`);

			return searchedUser;
		} catch (error: any) {
			Logger.error(`Repository Error on getUserByUsername. Message: ${error.message}`, __filename);
			return false;
		}
	}

	public async getUserProfile(userid: number): Promise<IProfileDb | boolean> {
		const prisma = new PrismaClient();

		try {
			const userProfile: IProfileDb | null = await prisma.profiles.findUnique({
				where: {
					userid: userid
				}
			});

			if (!userProfile) throw new Error(`Could not find a user profile for user [${userid}]...`);

			return userProfile;
		} catch (error: any) {
			Logger.error(`Repository Error on getUserProfile. Message: ${error.message}`, __filename);
			return false;
		}
	}

	public async storeUser(user: UserModel): Promise<IUserDbExtended> {
		const prisma = new PrismaClient();

		try {
			return await prisma.$transaction(async trnsactionPrisma => {
				const newUser: any = UserMapper.fromUserInstanceToUserDb(user);
				delete newUser.id;

				const userDb: IUserDb = await prisma.users.create({
					data: newUser
				});

				const profileDb: IProfileDb = await prisma.profiles.create({
					data: UserMapper.fromProfileInstanceToProfileDb(
						new ProfileModel({
							userid: userDb.id,
							firstName: null,
							lastName: null,
							address: null,
							image: null
						})
					)
				});

				return { ...userDb, profile: profileDb } as IUserDbExtended;
			});
		} catch (error: any) {
			Logger.error(`[UserPostgresRepository|storeUserAndProfile] - ${error.message}`, __filename);
			throw error;
		}
	}
}
