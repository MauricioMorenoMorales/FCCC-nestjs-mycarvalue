import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	AfterInsert,
	AfterUpdate,
	AfterRemove,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@AfterInsert()
	public logInsert() {
		console.log('Inserted User with id', this.id);
	}

	@AfterUpdate()
	public logUpdate() {
		console.log('Updated User with id', this.id);
	}

	@AfterRemove()
	public logRemove() {
		console.log('Removed User with id', this.id);
	}
}
