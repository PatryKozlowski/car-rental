import Button from '../../components/Button/Button'
import Car from '../../components/Car/Car'
import NoCar from '../../components/NoCar/NoCar'
import OrderModal from '../../components/OrderModal/OrderModal'
import './Cars.scss'

class Cars {
  constructor(cars) {
    this.container = null
    this.cars = cars
    this.pages = null
    this.translateAmount = 100
    this.translate = 0
    this.isOpenOrder = false
    this.orderModal = null
  }

  isFullHeightViewPort(element) {
    const rect = element.getBoundingClientRect()
    const isFullViewport = rect.y === 0

    return isFullViewport
  }

  renderCars() {
    if (!this.cars?.length) {
      this.container.classList.add('no_car')
      const $NoCars = new NoCar()
      this.container.appendChild($NoCars.render())
    } else {
      const $carsContainer = document.createElement('div')
      $carsContainer.classList.add('cart_container')
      $carsContainer.style.width = this.cars.length * 100 + '%'

      this.container.appendChild($carsContainer)

      if (this.cars.length > 1) {
        const $NextBtn = new Button(
          ['arrow_btn', 'next_btn'],
          null,
          () => this.slide('next'),
          ['fa-solid', 'fa-chevron-right']
        )
        const $PrevBtn = new Button(
          ['arrow_btn', 'prev_btn'],
          null,
          () => this.slide('prev'),
          ['fa-solid', 'fa-chevron-left']
        )

        this.container.appendChild($NextBtn.render())
        this.container.appendChild($PrevBtn.render()).style.display = 'none'
      }
      this.cars.forEach(
        ({
          id,
          brand,
          model,
          power,
          speed,
          year,
          price,
          image,
          available,
          dropOff,
        }) => {
          const $Car = new Car(
            id,
            brand,
            model,
            power,
            speed,
            year,
            price,
            image,
            available,
            dropOff,
            this.handleOpen
          )
          $carsContainer.appendChild($Car.render())
        }
      )
    }
  }

  updateCarePriceUI = (carPrice) => {
    const order = JSON.parse(window.sessionStorage.getItem('order'))
    const $carPrice = document.getElementsByClassName('car_price')
    const $totalPrice = document.getElementsByClassName('total_price')
    const $daysCarPrice = document.getElementsByClassName(
      'order_days_car_price'
    )
    $carPrice[0].innerText = `Car price: ${carPrice} / d`

    if (order) {
      $daysCarPrice[0].innerText = `Cost of renting a car: ${
        carPrice * order[0].diffDays
      }`
      $totalPrice[0].innerText = `Total price: ${carPrice * order[0].diffDays}`
    } else {
      $daysCarPrice[0].innerText = `Cost of renting a car: ${carPrice}`
      $totalPrice[0].innerText = `Total price: ${carPrice}`
    }
  }

  handleOpen = (e) => {
    const isFullViewPort = this.isFullHeightViewPort(this.container)

    if (!isFullViewPort) {
      this.container.scrollIntoView()
      return
    }

    const carID = Number(e.target.getAttribute('car-id'))

    this.isOpenOrder = !this.isOpenOrder
    const carPrice = this.cars?.filter((car) => car?.id === carID)[0]?.price
    const $navContainer = document.getElementsByClassName('nav_container')[0]

    if (this.isOpenOrder && isFullViewPort) {
      this.orderModal[0].classList.add('order_is_open')
      document.body.style.overflow = 'hidden'
      $navContainer.style.opacity = '0'
      console.log(this.isFullHeightViewPort(this.container))

      window.sessionStorage.setItem('carID', JSON.stringify(carID))

      this.updateCarePriceUI(carPrice)
    } else {
      this.orderModal[0].classList.remove('order_is_open')
      document.body.style.overflow = 'auto'
      $navContainer.style.opacity = '1'
    }
  }

  renderOrderModal = () => {
    const $OrderModal = new OrderModal(this.handleOpen, this.cars)
    this.container.appendChild($OrderModal.render())
    this.orderModal = document.getElementsByClassName('order_modal_container')
  }

  slide = (direction) => {
    const $leftBtn = document.getElementsByClassName('prev_btn')
    const $rightBtn = document.getElementsByClassName('next_btn')

    this.pages = document.querySelectorAll('.car_wrapper')

    if (
      direction === 'next' &&
      !(this.translate === -this.cars.length * 100 + 100)
    ) {
      this.translate -= this.translateAmount
      $leftBtn[0].style.display = 'block'
    }

    if (direction === 'prev' && this.translate !== 0 && !this.isOpenOrder) {
      if (this.translate === -100) {
        $leftBtn[0].style.display = 'none'
      }
      this.translate += this.translateAmount
    }

    this.pages.forEach(
      (pages) => (pages.style.transform = `translateX(${this.translate}%)`)
    )

    if (this.translate === -this.cars.length * 100 + 100) {
      $rightBtn[0].style.display = 'none'
    } else {
      $rightBtn[0].style.display = 'block'
    }
  }

  render() {
    const $section = document.createElement('section')

    if (!this.container) {
      this.container = $section
      $section.classList.add('section_cars')
    }

    this.container.innerHTML = ''

    this.renderCars()
    this.renderOrderModal()

    return this.container
  }
}

export default Cars
