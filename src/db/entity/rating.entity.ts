import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Point } from './point.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  @ApiHideProperty()
  id: number;

  @ManyToOne(
    type => Point,
    point => point.ratings,
    {
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  point: Point;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  rating: number;
}
