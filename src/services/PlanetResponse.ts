
export interface PlanetResponse {
  id: number,
  name: string,
  diameter: number,
  description: string,
  population: number,
  climate: string,
  rotation_period_hours: number,
  price_dollars: number,
  price_cents: number,
  photo: {
    thumbnail: string,
    file_path: string,
  },
  amenities_available: [{
      id: number,
      name: string,
      description: string,
      slug: string,
  }],
  terrains: [{
    id: number,
    name: string,
    description: string,
  }]
}
