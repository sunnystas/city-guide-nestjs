import { Entity, Column, OneToMany } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GenericEntity } from './abstract-generic.entity';
import { PointEntity } from './point.entity';

@Entity()
export class PointType extends GenericEntity {
  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  icon?: string;

  @Column({ type: 'smallint', nullable: true })
  @ApiPropertyOptional({ type: Number })
  sort_order?: number;

  @OneToMany(
    type => PointEntity,
    point => point.type,
    {
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  points: PointEntity[];
}
