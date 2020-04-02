import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
