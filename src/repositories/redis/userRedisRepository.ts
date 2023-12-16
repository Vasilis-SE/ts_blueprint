import { IUserDbExtended, IProfileDb } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import UserRepository from '@repositories/userRepository';
import Logger from '@config/logger';
import RedisConnector from '@connections/redisConnector';
import { instanceToPlain } from 'class-transformer';

export default class UserRedisRepository extends UserRepository {
	getUserById(userid: number): Promise<boolean | IUserDbExtended> {
		throw new Error('Method not implemented.');
	}
	getUserByUsername(username: string): Promise<boolean | IUserDbExtended> {
		throw new Error('Method not implemented.');
	}
	getUserProfile(userid: number): Promise<boolean | IProfileDb> {
		throw new Error('Method not implemented.');
	}

	public async storeUser(user: UserModel, profile?: ProfileModel | undefined): Promise<boolean | IUserDbExtended> {
		// Data to database format
		const userDb: IUserDbExtended = {
			id: user.getId() as number,
			username: user.getUsername(),
			password: user.getPassword(),
		};

		if (profile)
			userDb.profile = {
				id: profile.getId(),
				userid: profile.getUserId(),
				first_name: profile.getFirstName(),
				last_name: profile.getLastName(),
				address: profile.getAddress(),
				image: profile.getImage()
			};
		
		try {
			const result = await RedisConnector.redis().set(`${process.env.REDIS_USERS_KEY}:${userDb.id}`, JSON.stringify(userDb));
			console.log(result);
		} catch (error: any) {
			Logger.error(`Repository Error on storeUser. Message: ${error.message}`, __filename);
			return false;
		}

		return userDb;
	}

	storeProfile(profile: ProfileModel): Promise<boolean | IProfileDb> {
		throw new Error('Method not implemented.');
	}
}
