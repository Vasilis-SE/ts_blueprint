import { IUserDbExtended, IProfileDb } from '@interfaces/userInterfaces';
import ProfileModel from '@models/profileModel';
import UserModel from '@models/userModel';
import UserRepository from '@repositories/userRepository';
import Logger from '@config/logger';
import RedisConnector from '@connections/redisConnector';
import { instanceToPlain } from 'class-transformer';

export default class UserPostgresRepository extends UserRepository {
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
		try {
			await RedisConnector.redis().set(`${process.env.REDIS_USERS_KEY}:${user.getId()}`, instanceToPlain(user).toString());
		} catch (error: any) {
			Logger.error(`Repository Error on storeUser. Message: ${error.message}`, __filename);
			return false;
		}
	}

	storeProfile(profile: ProfileModel): Promise<boolean | IProfileDb> {
		throw new Error('Method not implemented.');
	}
}
