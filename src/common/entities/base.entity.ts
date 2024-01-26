import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export class BaseEntity<ID extends string = string> {
	@PrimaryGeneratedColumn("uuid") id!: ID;
	@CreateDateColumn({ type: "timestamptz" }) createdAt!: Date;
	@UpdateDateColumn({ type: "timestamptz" }) updatedAt!: Date;
	@DeleteDateColumn({ type: "timestamptz" }) deletedAt!: Date;
}
