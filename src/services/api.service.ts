import http, {AxiosRequestConfig, Method} from "axios";
const qs = require('qs');

const ApiService = {
  request (resource:Method, url: string,  config?:AxiosRequestConfig): Promise<any> {
    config = {
      method: resource,
      url: url,
      baseURL: process.env.GATEWAY_SERVICE_ENDPOINT,
      ...config
    }

    return http.request(config)
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },
};

export default ApiService;

// FIXME: Break these out.
export const GalaxiesService = {
  all () {
    return ApiService.request('get', '/galaxies');
  },
};

export const AmenitiesService = {
  all () {
    return ApiService.request('get', '/amenities');
  },
};

export const PlanetsService = {
  query(params: {[key: string]: string}): Promise<any> {
    const q = qs.stringify({filter: params}, {encode: false });
    return ApiService.request('get', `/planets?${q}`);
  },
  get(id: number): Promise<any> {
    return ApiService.request('get', `/planets/${id}`);
  },
  toggleLike(id: number): Promise<any> {
    return ApiService.request('get',`/planets/${id}/likes`);
  },
  reviews(id: number, pageNumber?: number): Promise<any> {
    return ApiService.request('get', `/planets/${id}/reviews?page=${pageNumber || 1}`);
  },
};
