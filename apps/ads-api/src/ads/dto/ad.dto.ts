import { IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Ad, AdImage } from '../ad.types';


class AdImageDto implements AdImage {
  @IsString()
  @ApiProperty({
    description: 'Ad ID.',
    type: String,
    required: true,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: 'URL of the image',
    type: String,
    required: true,
  })
  image: string;

  @IsString()
  @ApiProperty({
    description: 'URL of the image thumbnail',
    type: String,
    required: true,
  })
  thumbnail: string;

  @IsString()
  @ApiProperty({
    description: 'Creator of the image',
    type: String,
    required: true,
  })
  user: number;
}


export class AdDto implements Ad {
  @IsString()
  @ApiProperty({
    description: 'Ad ID.',
    type: String,
    required: true,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: 'Ad name.',
    type: String,
    required: true,
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Ad description.',
    type: String,
    required: true,
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Ad city.',
    type: String,
    required: false,
  })
  city_name?: string;

  @IsString()
  @ApiProperty({
    description: 'Ad district.',
    type: String,
    required: false,
  })
  district_name?: string;

  @IsString()
  @ApiProperty({
    description: 'Creation date of the ad.',
    type: String,
    required: true,
  })
  created_at: string;

  @IsString()
  @ApiProperty({
    description: 'How many times the ad has been viewed.',
    type: Number,
    required: true,
  })
  views: number;

  @IsString()
  @ApiProperty({
    description: 'Creator of the ad',
    type: String,
    required: true,
  })
  user: number;

  @IsNumber()
  @ApiProperty({
    description: 'Ad price.',
    type: Number,
    required: true,
  })
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdImageDto)
  @ApiProperty({
    description: 'Ad images.',
    type: [AdImageDto],
    required: true,
  })
  images: AdImageDto[];
}
