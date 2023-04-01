import { fetcher } from '../../utils/fetcher'

export const getOrder = async (id) => {
  return await fetcher(`/api/v1/order/${id}`, {
    method: 'GET',
  })
}
