export interface BkoiApiProps {
  apiKey: string
}

export interface ReverseGeoParams {
  longitude: number | string,
  latitude: number | string,
  location_type?: boolean | string,
  address?: boolean | string,
  post_code?: boolean | string,
  area?: boolean | string,
  union?: boolean | string,
  pauroshova?: boolean | string,
  sub_district?: boolean | string,
  district?: boolean | string,
  division?: boolean | string,
  country?: boolean | string,
  bangla?: boolean | string
}

export interface ReverseGeoProps {
  params: ReverseGeoParams,
  headers?: any
}