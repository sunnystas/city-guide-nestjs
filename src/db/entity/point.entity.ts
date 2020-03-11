import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { IsEmail } from 'class-validator';
import {
  ApiProperty,
  ApiHideProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Rating } from './rating.entity';
import { City } from './city.entity';
import { GenericEntity } from './abstract-generic.entity';
import { PointType } from './point-type.entity';

@Entity()
export class Point extends GenericEntity {
  @ManyToOne(
    type => PointType,
    pointType => pointType.points,
    {
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  type: PointType;

  @ManyToOne(
    type => City,
    city => city.points,
    {
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  city: City;

  @OneToMany(
    type => Rating,
    rating => rating.point,
  )
  ratings: Rating[];

  @Column('point')
  @ApiProperty({ type: String })
  coords: string;

  // top can be calculated based on ratings or just can be 0/1 values
  @Column({ nullable: true, type: 'real' })
  @ApiHideProperty()
  private top: number;

  @Column({ nullable: true, type: 'character varying', array: true })
  @ApiPropertyOptional({ type: [String] })
  pics?: string[];

  @Column({ nullable: true, type: 'character varying', array: true })
  @ApiPropertyOptional({ type: [String] })
  videos?: string[];

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  url?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: String })
  workHours?: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsEmail()
  @ApiPropertyOptional({ type: String })
  email?: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  @ApiPropertyOptional({ type: String })
  phone?: string;
}
