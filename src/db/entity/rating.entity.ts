import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { PointEntity } from './point.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  @ApiHideProperty()
  id: number;

  @ManyToOne(
    type => PointEntity,
    point => point.ratings,
  )
  point: PointEntity;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  rating: number;
}
