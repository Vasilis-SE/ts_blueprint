import Logger from '@config/logger';
import { IProfileDb, IUserDb } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import { PrismaClient } from '@prisma/client';
import UserRepository from '@repositories/userRepository';

export default class UserPostgresRepository extends UserRepository {
	public async getUserById(userid: number): Promise<boolean | IUserDb> {
		const prisma = new PrismaClient();

		try {
			const searchedUser: IUserDb | null = await prisma.users.findUnique({
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

	public async getUserByUsername(username: string): Promise<boolean | IUserDb> {
		const prisma = new PrismaClient();

		try {
			const searchedUser: IUserDb | null = await prisma.users.findUnique({
				where: {
					username: username
				}
			});

			if (!searchedUser) throw new Error(`Could not find user with given username [${username}]...`);

			return searchedUser;
		} catch (error: any) {
			Logger.error(`Repository Error on getUserByUsername. Message: ${error.message}`, __filename);
			return false;
		}
	}

	public async storeUser(user: UserModel, userProfile?: ProfileModel): Promise<IUserDb | boolean> {
		const prisma = new PrismaClient();

		try {
			const result = await prisma.$transaction(async prisma => {
				const prismaUser: IUserDb = await prisma.users.create({
					data: {
						username: user.getUsername(),
						password: user.getPassword()
					}
				});

				if (userProfile) {
					const prismaProfile: IProfileDb = await prisma.profiles.create({
						data: {
							userid: prismaUser.id,
							first_name: userProfile.getFirstName(),
							last_name: userProfile.getLastName(),
							address: userProfile.getAddress(),
							image: userProfile.getImage()
						}
					});

					prismaUser.profile = prismaProfile;
				}

				return prismaUser;
			});

			return result;
		} catch (error: any) {
			Logger.error(`Repository Error on storeUser. Message: ${error.message}`, __filename);
			return false;
		}
	}

	public async storeProfile(profile: ProfileModel): Promise<IProfileDb | boolean> {
		const prisma = new PrismaClient();

		try {
			return (await prisma.profiles.create({
				data: {
					userid: profile.getUserId(),
					first_name: profile.getFirstName(),
					last_name: profile.getLastName(),
					address: profile.getAddress(),
					image: profile.getImage()
				}
			})) as IProfileDb;
		} catch (error: any) {
			Logger.error(`Repository Error on storeProfile. Message: ${error.message}`, __filename);
			return false;
		}
	}
}
