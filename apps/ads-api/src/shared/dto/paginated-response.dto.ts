import { ApiProperty } from '@nestjs/swagger'


export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Total items.',
    type: Number,
    required: true,
  })
  total: number

  @ApiProperty({
    description: 'Requested page.',
    type: Number,
    required: true,
  })
  page: number

  @ApiProperty({
    description: 'Requested page size.',
    type: Number,
    required: true,
  })
  pageSize: number

  results: T[]
}
