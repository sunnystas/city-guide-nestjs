import { Entity, Column, OneToMany } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GenericEntity } from './abstract-generic.entity';
import { Point } from './point.entity';

@Entity()
export class PointType extends GenericEntity {
  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  icon?: string;

  @Column({ type: 'smallint', nullable: true })
  @ApiPropertyOptional({ type: Number })
  sortOrder?: number;

  @OneToMany(
    type => Point,
    point => point.type,
    {
      onDelete: 'RESTRICT',
      cascade: true,
    },
  )
  points: Point[];
}
