import {
	UseInterceptors,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { nextTick } from 'process';

interface ClassConstructor {
	new (...args: any[]): {};
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
			map((data: any) => {
				//Run something before the response is sent out
				//Filtra la data comparandola con un dto
				return plainToClass(this.dto, data, { excludeExtraneousValues: true });
			}),
		);
	}
}
