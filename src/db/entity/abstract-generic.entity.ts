import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiHideProperty,
} from '@nestjs/swagger';

@Entity()
export abstract class GenericEntity {
  @PrimaryGeneratedColumn()
  @ApiHideProperty()
  id: number;

  @Column({ type: 'character varying', length: 255 })
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name_uk: string;

  @Column({ nullable: true, type: 'text' })
  @ApiPropertyOptional({ type: String })
  description_uk?: string;

  @Column({ nullable: true, type: 'character varying', length: 255 })
  @ApiPropertyOptional({ type: String })
  name_ru?: string;

  @Column({ nullable: true, type: 'text' })
  @ApiPropertyOptional({ type: String })
  description_ru?: string;

  @Column({ nullable: true, type: 'character varying', length: 255 })
  @ApiPropertyOptional({ type: String })
  name_en?: string;

  @Column({ nullable: true, type: 'text' })
  @ApiPropertyOptional({ type: String })
  description_en?: string;
}
