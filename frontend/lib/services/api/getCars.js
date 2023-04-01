import { fetcher } from '../../utils/fetcher'

export const getCars = async () => {
  return await fetcher('/api/v1/cars', {
    method: 'GET',
  })
}
