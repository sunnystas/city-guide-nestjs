import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiHideProperty,
} from '@nestjs/swagger';
import { UserRoles } from '../../common/enums/user-roles';

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
  @IsOptional()
  @IsString()
  first_name?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  last_name?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
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
  is_active?: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    this.password = hashSync(this.password, 10);
  }
}
