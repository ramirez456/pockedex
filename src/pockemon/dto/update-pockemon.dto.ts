import { PartialType } from '@nestjs/mapped-types';
import { CreatePockemonDto } from './create-pockemon.dto';

export class UpdatePockemonDto extends PartialType(CreatePockemonDto) {}
