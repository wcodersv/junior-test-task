import { Query, Controller, Get, Param, NotFoundException } from '@nestjs/common'
import { AdsService } from './ads.service'
import { AdsListQueryDto, AdDto } from './dto'
import { ApiPaginatedResponse } from '../shared/decorators'
import { PaginatedResponseDto } from '../shared/dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('ads')
@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Get()
  @ApiPaginatedResponse(AdDto, { description: 'List of ads.' })
  async getAdsList(
    @Query() query: AdsListQueryDto
  ): Promise<PaginatedResponseDto<AdDto>> {
    const data = await this.adsService.getList(query)
    return {
      page: query.page,
      pageSize: query.pageSize,
      results: data.results,
      total: data.total,
    }
  }

  @Get(':id')
  getAd(@Param('id') id: number) {
    const ad = this.adsService.getAd(id)
    if (!ad) {
      throw new NotFoundException(`Ad with ID ${id} not found`);
    }

    return ad;
  }
}
