import { fetcher } from '../../utils/fetcher'

export const getOptions = async () => {
  return await fetcher('/api/v1/options', {
    method: 'GET',
  })
}
