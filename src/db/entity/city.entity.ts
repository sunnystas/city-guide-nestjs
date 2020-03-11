import { Entity, Column, OneToMany } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GenericEntity } from './abstract-generic.entity';
import { Guide } from './Guide.entity';
import { Info } from './info.entity';
import { Point } from './point.entity';
import { Path } from './path.entity';

@Entity()
export class City extends GenericEntity {
  @OneToMany(
    type => Path,
    path => path.city,
  )
  paths: Path[];

  @OneToMany(
    type => Point,
    point => point.city,
  )
  points: Guide[];

  @OneToMany(
    type => Guide,
    guide => guide.city,
  )
  guides: Guide[];

  @OneToMany(
    type => Info,
    info => info.city,
  )
  infos: Info[];

  @Column({
    type: 'point',
    nullable: true,
  })
  @ApiPropertyOptional({ type: String })
  coords: string;
}
