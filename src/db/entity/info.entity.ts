import { Entity, ManyToOne, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { City } from './city.entity';
import { GenericEntity } from './abstract-generic.entity';

@Entity()
export class Info extends GenericEntity {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 100 })
  section: string;

  @ManyToOne(
    type => City,
    city => city.infos,
  )
  city: City;
}
