import { Column, Entity, OneToMany, ManyToOne, Index } from 'typeorm';
import { IsNotEmpty, IsEmail, IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import {
  ApiProperty,
  ApiHideProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Rating } from './rating.entity';
import { City } from './city.entity';
import { GenericEntity } from './abstract-generic.entity';
import { PointType } from './point-type.entity';

@Entity()
@Index([`name_uk`, `type`], { unique: true })
export class PointEntity extends GenericEntity {
  @ManyToOne(
    type => PointType,
    pointType => pointType.points,
  )
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  type: PointType;

  @ManyToOne(
    type => City,
    city => city.points,
  )
  city: City;

  @OneToMany(
    type => Rating,
    rating => rating.point,
    {
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  ratings: Rating[];

  @Column('point')
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  coords: string;

  // top can be calculated based on ratings or just can be 0/1 values
  @Column({ nullable: true, type: 'real' })
  @ApiHideProperty()
  @IsOptional()
  @IsNumber()
  private top?: number;

  @Column({ nullable: true, type: 'character varying', array: true })
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  pics?: string[];

  @Column({ nullable: true, type: 'character varying', array: true })
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  videos?: string[];

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  url?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  work_hours?: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  phone?: string;
}
