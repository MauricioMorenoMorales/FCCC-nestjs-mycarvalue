import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repository: Repository<User>) {}

	public create(email: string, password: string) {
		//Aqui puedes hacer validaciones en las entities o tambien puedes ejecutar hooks
		const user = this.repository.create({ email, password });
		return this.repository.save(user);
	}

	public async findOne(id: number) {
		return await this.repository.findOne(id);
	}

	public async find(email: string) {
		return await this.repository.find({ email });
	}

	public async update(id: number, attributes: Partial<User>) {
		const user = await this.repository.findOne(id);
		if (!user) throw new NotFoundException(`User with id ${id} not found.`);
		Object.assign(user, attributes);
		return this.repository.save(user);
	}

	public async remove(id: number) {
		const user = await this.findOne(id);
		if (!user) throw new NotFoundException('The user already does not exist.');
		return this.repository.remove(user);
	}
}
