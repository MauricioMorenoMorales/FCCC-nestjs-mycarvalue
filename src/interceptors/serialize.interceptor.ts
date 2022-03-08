import {
	UseInterceptors,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
	new (...args: Array<any>): {};
}

export const Serialize = (dto: ClassConstructor) =>
	UseInterceptors(new SerializeInterceptor(dto));

export class SerializeInterceptor implements NestInterceptor {
	constructor(private dto: any) {}
	public intercept(
		context: ExecutionContext,
		handler: CallHandler,
	): Observable<any> {
		// Run something before a request is handled by the request handler
		return handler.handle().pipe(
			//Run something before the response is sent out
			//Filtra la data comparandola con un dto
			map((data: any) =>
				plainToClass(this.dto, data, { excludeExtraneousValues: true }),
			),
		);
	}
}
