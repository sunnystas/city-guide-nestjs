import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { GenericEntity } from './abstract-generic.entity';
import { City } from './city.entity';
import { Path } from './path.entity';

@Entity()
export class Guide extends GenericEntity {
  @ManyToOne(
    type => City,
    city => city.guides,
  )
  city: City;

  @ManyToMany(
    type => Path,
    path => path.guides,
  )
  paths: Path[];

  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsEmail()
  @ApiPropertyOptional({ type: String })
  email?: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  @ApiPropertyOptional({ type: String })
  phone?: string;
}
