import { Entity, Column, OneToMany } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GenericEntity } from './abstract-generic.entity';
import { Guide } from './guide.entity';
import { Info } from './info.entity';
import { PointEntity } from './point.entity';
import { Path } from './path.entity';

@Entity()
export class City extends GenericEntity {
  @OneToMany(
    type => Path,
    path => path.city,
    {
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  paths: Path[];

  @OneToMany(
    type => PointEntity,
    point => point.city,
    {
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  points: Guide[];

  @OneToMany(
    type => Guide,
    guide => guide.city,
    {
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  guides: Guide[];

  @OneToMany(
    type => Info,
    info => info.city,
    {
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  infos: Info[];

  @Column({
    type: 'point',
    nullable: true,
  })
  @ApiPropertyOptional({ type: String })
  coords: string;
}
