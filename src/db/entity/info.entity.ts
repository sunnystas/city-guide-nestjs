import { Entity, ManyToOne } from 'typeorm';
import { City } from './city.entity';
import { GenericEntity } from './abstract-generic.entity';

@Entity()
export class Info extends GenericEntity {
  @ManyToOne(
    type => City,
    city => city.infos,
  )
  city: City;
}
