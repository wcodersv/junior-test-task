export interface AdImage {
  id: number;
  image: string;
  thumbnail: string;
  user: number;
}

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  city_name?: string;
  district_name?: string;
  images: AdImage[];
  created_at: string;
  views: number;
  user: number;
}
