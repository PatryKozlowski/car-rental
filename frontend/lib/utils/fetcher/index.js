export const fetcher = async (endpoint, { method, body, config }) => {
  const response = await fetch(import.meta.env.VITE_PUBLIC_API_URL + endpoint, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method,
    ...(body && { body: JSON.stringify(body) }),
  })

  const data = await response.json()

  return data ?? []
}
