import { IsNotEmpty } from 'class-validator';

export class InfoDto {
  @IsNotEmpty()
  section: string;
}
