import Loader from './components/Loader/Loader'
import Summary from './components/Summary/Summary'
import { getCarImg } from './lib/services/api/getCarImg'
import { getOrder } from './lib/services/api/getOrder'

class Order {
  constructor() {
    this.container = null
    this.isLoadingData = false
    this.deliveryPlace = null
    this.dropOff = null
    this.carImage = null
    const sessionID = JSON.parse(window.sessionStorage.getItem('sessionID'))

    if (!sessionID && window.location.pathname.includes('/order')) {
      window.location.pathname = '/'
    } else {
      if (sessionID) {
        this.getOrder(sessionID)
      }
    }
  }

  setLoadingData(newIsLoading) {
    this.isLoadingData = newIsLoading
    this.render()
  }

  async getOrder(sessionID) {
    this.setLoadingData(true)
    try {
      const order = await getOrder(sessionID)
      const { deliveryPlace, dropOff, carId } = order
      const carImage = await getCarImg(carId)
      const { image } = carImage
      this.deliveryPlace = deliveryPlace
      this.dropOff = dropOff
      this.carImage = image
    } catch (error) {
      console.log(error.message)
    } finally {
      this.setLoadingData(false)
    }
  }

  render() {
    const $rootDiv = document.createElement('main')

    if (!this.container) {
      this.container = $rootDiv
      $rootDiv.classList.add('app_container')
    }

    this.container.innerHTML = ''

    if (this.isLoadingData) {
      const $Loader = new Loader()
      this.container.appendChild($Loader.render())
    } else {
      const $Summary = new Summary(
        this.deliveryPlace,
        this.dropOff,
        this.carImage
      )
      this.container.appendChild($Summary.render())
    }

    return this.container
  }
}

export default Order
