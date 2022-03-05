import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
	constructor(private usersService: UsersService) {}
	@Post('signup')
	public createUser(@Body() body: CreateUserDto) {
		this.usersService.create(body.email, body.password);
	}

	@Get('/:id')
	public findUser(@Param('id') id: string) {
		return this.usersService.findOne(parseInt(id));
	}

	@Get()
	public findAllUsers(@Query('email') email: string) {
		return this.usersService.find(email);
	}

	@Delete('/:id')
	public removeUser(@Param('id') id: string) {
		return this.usersService.remove(parseInt(id));
	}

	@Patch('/:id')
	public updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.usersService.update(parseInt(id), body);
	}
}
