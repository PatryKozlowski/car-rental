import { fetcher } from '../../utils/fetcher'

export const getCheckout = async (data) => {
  return await fetcher('/api/v1/payment', {
    method: 'POST',
    body: data,
  })
}
