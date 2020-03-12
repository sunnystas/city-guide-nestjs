import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiHideProperty,
} from '@nestjs/swagger';

export enum UserRoles {
  GUEST = 'guest',
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiHideProperty()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  firstName?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  lastName?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  phone?: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  @ApiPropertyOptional({
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role?: UserRoles;

  @Column({ default: false })
  @ApiHideProperty()
  isActive?: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    this.password = hashSync(this.password, 10);
  }
}
