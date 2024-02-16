import { IsString, IsOptional, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationInputDto } from '../../shared/dto'
import { Type } from 'class-transformer'


export class AdsListQueryDto extends PaginationInputDto {
  @ApiProperty({
    description: 'Min price.',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number

  @ApiProperty({
    description: 'Max price.',
    type: Number,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number

  @ApiProperty({
    description: 'Search ads by text in ads name or description.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({
    description: 'City filter',
    type: String,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  city?: string;


  @ApiProperty({
    description: 'District filter',
    type: String,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  district?: string
}
