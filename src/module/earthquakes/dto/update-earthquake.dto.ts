import { PartialType } from '@nestjs/mapped-types';
import { CreateEarthquakeDto } from './create-earthquake.dto';

export class UpdateEarthquakeDto extends PartialType(CreateEarthquakeDto) {}
