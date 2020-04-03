import { Column, Entity, ManyToMany, ManyToOne, JoinTable, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { City } from './city.entity';
import { GenericEntity } from './abstract-generic.entity';
import { Guide } from './guide.entity';

@Entity()
@Index([`name_uk`, `city`], { unique: true })
export class Path extends GenericEntity {
  @ManyToOne(
    type => City,
    city => city.paths,
  )
  city: City;

  @Column('path')
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  points: string;

  @ManyToMany(
    type => Guide,
    guide => guide.paths,
  )
  @JoinTable()
  guides: Guide[];

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  duration_hours?: number;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  length_metres?: number;

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
  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expires_at?: Date;
}
