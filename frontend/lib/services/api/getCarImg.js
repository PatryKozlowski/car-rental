import { fetcher } from '../../utils/fetcher'

export const getCarImg = async (id) => {
  return await fetcher(`/api/v1/cars/${id}`, {
    method: 'GET',
  })
}
