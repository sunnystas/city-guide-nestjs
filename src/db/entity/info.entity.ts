import { Entity, ManyToOne, Column } from 'typeorm';
import { City } from './city.entity';
import { GenericEntity } from './abstract-generic.entity';

@Entity()
export class Info extends GenericEntity {
  @Column({ nullable: true, type: 'varchar', length: 100 })
  section_name?: string;

  @ManyToOne(
    type => City,
    city => city.infos,
  )
  city: City;
}
