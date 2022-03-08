import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
	UseInterceptors,
	ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
	constructor(
		private usersService: UsersService,
		private authService: AuthService,
	) {}
	@Post('signup')
	public createUser(@Body() body: CreateUserDto) {
		return this.authService.signup(body.email, body.password);
	}

	@Post('signin')
	public signin(@Body() body: CreateUserDto) {
		return this.authService.signin(body.email, body.password);
	}

	//? @UseInterceptors(ClassSerializerInterceptor) // requiere que el entity posea un decorador exclude
	@Get('/:id')
	public async findUser(@Param('id') id: string) {
		const user = await this.usersService.findOne(parseInt(id));
		if (!user) throw new NotFoundException('The user was not found');
		return user;
	}

	@Get()
	public findAllUsers(@Query('email') email: string) {
		console.log('Controller is running');
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
