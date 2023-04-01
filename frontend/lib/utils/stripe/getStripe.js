import { loadStripe } from '@stripe/stripe-js'

export const redirectToCheckout = async (session) => {
  const stripe = await loadStripe(
    import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )

  return await stripe?.redirectToCheckout({
    sessionId: session,
  })
}
