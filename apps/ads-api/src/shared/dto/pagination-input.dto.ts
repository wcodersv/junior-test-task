import { IsOptional, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'


export class PaginationInputDto {
  @ApiProperty({
    description: 'Page number',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 20))
  page = 1

  @ApiProperty({
    description: 'Page size',
    required: false,
    default: 20,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 20))
  pageSize = 20
}
