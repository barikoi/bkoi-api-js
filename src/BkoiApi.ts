import { BkoiApiProps } from './types'

export class BkoiApi {
  // Properties
  #apiKey = ''
  #apiList = [
    {
      key: 'reverse-geo',
      name: 'Reverse Geo',
      apiUrl: 'https://barikoi.xyz/v1/api/search/reverse'
    }
  ]

  // Constructor
  constructor(options: BkoiApiProps) {
    this.#apiKey = options?.apiKey ?? ''
  }

  // Reverse Geo API
  reverseGeo = (options: any) => {
    // Check for apiKey
    if(!this.#apiKey) {
      return new Promise((resolve, reject) => reject(new Error('Please provide a valid API KEY to the constructor.')))
    }

    // Find Reverse Geo API
    const reverseGeoApi = this.#apiList.find(api => api.key === 'reverse-geo')?.apiUrl ?? ''

    if(!reverseGeoApi) {
      return new Promise((resolve, reject) => reject(new Error('Reverse Geo API unavailable. Please contact the provider.')))
    }

    // Inject apiKey in API URL Path
    const url = `${ reverseGeoApi }/${ this.#apiKey }/geocode?`

    // Stringify URL Params
    const params: any = {}
    if(options?.params) {
      Object.keys(options.params).forEach((k: string) => {
        params[k] = String(options.params[k])
      })
    }

    return fetch(url + new URLSearchParams(params).toString(), { headers: options?.headers ?? {}, method: 'GET', mode: 'cors', ...options })
      .then(res => {
        return res.json()
      })
      .then(res => {
        return res
      })
      .catch(err => {
        throw err
      })
  }
}