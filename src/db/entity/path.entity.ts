import { Column, Entity, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { City } from './city.entity';
import { GenericEntity } from './abstract-generic.entity';
import { Guide } from './Guide.entity';

@Entity()
export class Path extends GenericEntity {
  @ManyToOne(
    type => City,
    city => city.paths,
    {
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  city: City;

  @Column('path')
  @ApiProperty({ type: String })
  points: string;

  @ManyToMany(
    type => Guide,
    guide => guide.paths,
  )
  @JoinTable()
  guides: Guide[];

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: Number })
  durationHours?: number;

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: Number })
  lengthMetres?: number;

  @Column({ nullable: true, type: 'character varying', array: true })
  @ApiPropertyOptional({ type: [String] })
  pics?: string[];

  @Column({ nullable: true, type: 'character varying', array: true })
  @ApiPropertyOptional({ type: [String] })
  videos?: string[];

  @Column({ nullable: true })
  @ApiPropertyOptional({ type: Date })
  expiresAt?: Date;
}
