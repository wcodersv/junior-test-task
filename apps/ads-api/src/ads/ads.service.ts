import { Injectable } from '@nestjs/common'
import { Ad } from './ad.types'
import { db } from './db'

const escapeRx = /[|\\{}()[\]^$+*?.]/g
const isValidPrice = (price: number) => typeof price === 'number' && !isNaN(price)

const checkStringFilter = (ad: Ad, filter: string | undefined, field: keyof Ad) => {
  const fieldValue = (ad[field] as string | undefined)?.toLowerCase()
  return filter ? fieldValue?.includes(filter.trim().toLowerCase()) : true
}

@Injectable()
export class AdsService {
  async getAd(id: number): Promise<Ad | undefined> {
    return db.find(ad => ad.id === id)
  }

  async getList({
    maxPrice,
    minPrice,
    city,
    district,
    search,
    page,
    pageSize,
  }: {
    maxPrice?: number;
    minPrice?: number;
    city?: string;
    district?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{
    total: number
    results: Ad[]
  }> {
    const searchRx = search ? new RegExp(search.replace(escapeRx, '\\$&'), 'i') : null
    const results = db.filter(
      ad =>
        (searchRx ? searchRx.test(ad.title) || searchRx.test(ad.description) : true) &&
        (isValidPrice(minPrice) ? ad.price >= minPrice : true) &&
        (isValidPrice(maxPrice) ? ad.price <= maxPrice : true) &&
        checkStringFilter(ad, city, 'city_name') &&
        checkStringFilter(ad, district, 'district_name')
    )
    return {
      total: results.length,
      results: results.slice((page - 1) * pageSize, page * pageSize),
    }
  }
}
