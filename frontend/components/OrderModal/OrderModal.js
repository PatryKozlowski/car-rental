import Button from '../Button/Button'
import Heading from '../Heading/Heading'
import Input from '../Input/Input'
import OrderOption from '../OrderOption/OrderOption'
import Paragraph from '../Paragraph/Paragraph'
import moment from 'moment'
import Radio from '../Radio/Radio'
import { validation } from '../../lib/utils/validation'
import { getOptions } from '../../lib/services/api/getOptions'
import { getCheckout } from '../../lib/services/api/getCheckout'
import { redirectToCheckout } from '../../lib/utils/stripe/getStripe'
import './OrderModal.scss'

class OrderModal {
  constructor(handleOpen, cars) {
    this.container = null
    this.handleOpen = handleOpen
    this.cars = cars
    this.carID = null
    this.options = []
    this.selectedOptions = []
    this.focusedInput = ''
    this.searchPhrase = ''
    this.name = ''
    this.email = ''
    this.pickUpDate = moment().add(1, 'days').format('YYYY-MM-DD')
    this.dropOffDate = moment().add(2, 'days').format('YYYY-MM-DD')
    this.diffDays = 1
    this.carPrice = 0
    this.daysCarPrice = 0
    this.totalPrice = 0
    this.selectedOptionsPrice = 0
    this.placeDelivery = ''
    this.getOptions()
  }

  getOrderFormLs(order) {
    this.name = order[0]?.name
    this.email = order[0]?.email
    this.pickUpDate = order[0].pickUp
    this.dropOffDate = order[0].dropOff
    this.diffDays = order[0]?.diffDays
  }

  async getOptions() {
    try {
      const options = await getOptions()
      this.options = options
    } catch (error) {
      console.log(error.message)
    }
    this.render()
  }

  getCarId() {
    this.carID = Number(JSON.parse(window.sessionStorage.getItem('carID')))
  }

  getCarPrice() {
    this.carPrice = this.cars.filter((car) => car?.id === this.carID)[0]?.price
  }

  getTotalPrice() {
    this.totalPrice = this.daysCarPrice + this.selectedOptionsPrice
  }

  saveOrderToLocalStorage() {
    const data = [
      {
        name: this.name,
        email: this.email,
        pickUp: this.pickUpDate,
        dropOff: this.dropOffDate,
        daysPrice: this.daysCarPrice,
        diffDays: this.diffDays,
      },
    ]
    window.sessionStorage.setItem('order', JSON.stringify(data))
  }

  calculateDays() {
    this.getCarPrice()
    this.getTotalPrice()
    const dropOffDate = new Date(this.dropOffDate).getTime()
    const pickUpDate = new Date(this.pickUpDate).getTime()

    if (dropOffDate > pickUpDate) {
      const diffTime = Math.abs(dropOffDate - pickUpDate)
      this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      this.daysCarPrice = this.carPrice * this.diffDays
      this.saveOrderToLocalStorage()
    }
  }

  updateModalInfo() {
    this.getCarPrice()
    this.calculateDays()
    this.getTotalPrice()
    const $rentalDays = document.getElementsByClassName('order_rental_days')
    $rentalDays[0].innerText = `Number of rental days: ${this.diffDays}`

    const $daysCarPrice = document.getElementsByClassName(
      'order_days_car_price'
    )
    $daysCarPrice[0].innerText = `Cost of renting a car: ${this.daysCarPrice}`

    const $totalPrice = document.getElementsByClassName('total_price')
    $totalPrice[0].innerText = `Total price: ${this.totalPrice}`
  }

  setPlaceDelivery = (e) => {
    this.placeDelivery = e.target.value
    this.saveOrderToLocalStorage()
  }

  setSearchPhrase = (e) => {
    this.searchPhrase = e.target.value
    this.focusedInput = 'searchInput'
    this.render()
    this.focusedInput = ''
    this.saveOrderToLocalStorage()
  }

  setName = (e) => {
    this.name = e.target.value
    this.focusedInput = 'name'
    this.focusedInput = ''
    this.saveOrderToLocalStorage()
  }

  setEmail = (e) => {
    this.email = e.target.value
    this.focusedInput = 'email'
    this.focusedInput = ''
    this.saveOrderToLocalStorage()
  }

  setPickUpDate = (e) => {
    this.pickUpDate = e.target.value
    this.saveOrderToLocalStorage()
    this.updateModalInfo()
    this.render()
  }

  setDropOffDate = (e) => {
    this.dropOffDate = e.target.value
    this.saveOrderToLocalStorage()
    this.updateModalInfo()
    this.render()
  }

  handleSubmit = async (e) => {
    const isValid = validation(e)
    const carID = Number(window.sessionStorage.getItem('carID'))
    const carBrand = this.cars.filter((car) => car.id === carID)[0].brand
    const $totalPrice = document.getElementsByClassName('total_price')[0]
    const toalPrice = Number($totalPrice.innerText.split(' ').at(2))

    try {
      if (isValid) {
        const data = [
          {
            carID,
            name: this.name,
            email: this.email,
            brand: carBrand,
            options: [...this.selectedOptions],
            days: this.diffDays,
            placeDelivery: this.placeDelivery,
            price: toalPrice,
            pickUp: this.pickUpDate,
            dropOff: this.dropOffDate,
          },
        ]
        window.sessionStorage.clear()
        try {
          const checkout = await getCheckout(data)

          if (checkout) {
            window.sessionStorage.setItem(
              'sessionID',
              JSON.stringify(checkout.id)
            )
            await redirectToCheckout(checkout.id)
            console.log(data)
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  filteredOptions() {
    const searchPhraseLowerCase = this.searchPhrase
      .toLowerCase()
      .replace(' ', '')
      .replace(/[^a-zA-Z ]/g, '')

    return this.options.filter((option) => {
      return option.option.toLowerCase().includes(searchPhraseLowerCase)
    })
  }

  renderOrderForm() {
    const $closeBtn = new Button(['order_close_btn'], null, this.handleOpen, [
      'fa-solid',
      'fa-xmark',
    ])
    this.container.appendChild($closeBtn.render())

    const $formContainer = document.createElement('form')
    $formContainer.classList.add('order_form_container')

    const $nameWrapper = document.createElement('div')
    $nameWrapper.classList.add('order_name_wrapper')

    const $inputWrapper = document.createElement('div')
    $inputWrapper.classList.add('order_input_wrapper')

    const $searchInputWrapper = document.createElement('div')
    $searchInputWrapper.classList.add('order_search_input_wrapper')

    const $selectOption = document.createElement('div')
    $selectOption.classList.add('order_car_option_select')

    const $selectedOption = document.createElement('div')
    $selectedOption.classList.add('order_car_option_selected')

    const $priceContainer = document.createElement('div')
    $priceContainer.classList.add('order_info_price_wrapper')

    const $dateInfo = document.createElement('div')
    $dateInfo.classList.add('order_info_date_wrapper')

    const $dateTitle = document.createElement('div')
    $dateTitle.classList.add('order_date_wrapper')

    const $dateInputWrapper = document.createElement('div')
    $dateInputWrapper.classList.add('order_date_input_wrapper')

    const $headerContainer = document.createElement('div')
    $headerContainer.classList.add('order_header_container')

    const $orderDelivery = document.createElement('div')
    $orderDelivery.classList.add('order_delivery_place_wrapper')

    const $mainContainer = document.createElement('div')
    $mainContainer.classList.add('order_main_container')

    const $orderBtnWrapper = document.createElement('div')
    $orderBtnWrapper.classList.add('order_btn_wrapper')

    this.filteredOptions().forEach((option) => {
      const $Option = new OrderOption(
        option.option,
        this.handleOption,
        option.id,
        option.price
      )
      $selectOption.appendChild($Option.render())
    })

    this.selectedOptions.forEach((option) => {
      const $Option = new OrderOption(
        option.option,
        this.handleOption,
        option.id,
        option.price
      )
      $selectedOption.appendChild($Option.render())
    })

    this.getCarId()
    this.getCarPrice()
    this.calculateDays()
    this.getTotalPrice()

    const $h3 = new Heading('h3', 'Order car', ['header_order_form'])
    const $totalPrice = new Heading('h3', `Total price: ${this.totalPrice}`, [
      'total_price',
    ])

    const $carPrice = new Paragraph(
      ['car_price'],
      `Car price: ${this.carPrice} / d`
    )
    const $daysCarPrice = new Paragraph(
      ['order_days_car_price'],
      `Cost of renting a car: ${this.daysCarPrice}`
    )
    const $optionPrice = new Paragraph(
      null,
      `Options price: ${this.selectedOptionsPrice}`
    )
    const $pickUpDateParagaraph = new Paragraph(null, 'Pick-up date')
    const $dropOffDateParagaraph = new Paragraph(null, 'Drop-off date')
    const $rentalDaysParagraph = new Paragraph(
      ['order_rental_days'],
      `Number of rental days: ${this.diffDays}`
    )
    const $optionsParagraph = new Paragraph(
      ['order_title_paragraph'],
      'Additional options'
    )
    const $selectedOptionsParagraph = new Paragraph(
      ['order_title_paragraph'],
      'Selected options'
    )
    const $priceTitle = new Paragraph(
      ['order_title_paragraph'],
      'Price summary'
    )
    const $dateTitleSummary = new Paragraph(
      ['order_title_paragraph'],
      'Date summary'
    )
    const $inputErrorParagraph = new Paragraph(
      ['error_paragraph'],
      'This field is required'
    )
    const $orderDeliveryParagraph = new Paragraph(
      ['order_title_paragraph', 'order_mobile_title_paragraph'],
      'Place of delivery'
    )

    const $name = new Input(
      ['order_input'],
      'text',
      'First and last name',
      this.setName,
      this.name,
      this.focusedInput === 'name',
      'name'
    )
    const $email = new Input(
      ['order_input'],
      'text',
      'Email',
      this.setEmail,
      this.email,
      this.focusedInput === 'email',
      'email'
    )

    const $search = new Input(
      ['order_input', 'order_search_input'],
      'text',
      'Search for an additional option',
      this.setSearchPhrase,
      this.searchPhrase,
      this.focusedInput === 'searchInput'
    )

    const $pickUp = new Input(
      ['order_input_data'],
      'date',
      null,
      this.setPickUpDate,
      this.pickUpDate,
      null,
      'pickUp'
    )

    const $dropOff = new Input(
      ['order_input_data'],
      'date',
      null,
      this.setDropOffDate,
      this.dropOffDate,
      null,
      'dropOff'
    )

    const $placeDeliveryRadio = new Radio(
      [
        {
          label: 'Poznań (Airport)',
          value: 'Poznan',
          id: '0',
          name: 'select_place_delivery',
        },
        {
          label: 'Warszawa (Airport)',
          value: 'Warszawa',
          id: '1',
          name: 'select_place_delivery',
        },
      ],
      this.setPlaceDelivery
    )

    const $submitBtn = new Button(
      ['order_submit_btn'],
      'Order now',
      this.handleSubmit,
      null
    )

    $selectedOption.appendChild($selectedOptionsParagraph.render())
    $selectOption.appendChild($optionsParagraph.render())
    $mainContainer.appendChild($selectOption)
    $mainContainer.appendChild($selectedOption)
    $formContainer.appendChild($h3.render())
    $inputWrapper.appendChild($name.render())
    $inputWrapper.appendChild($email.render())
    $formContainer.appendChild($nameWrapper)
    $searchInputWrapper.appendChild($search.render())
    $orderDelivery.appendChild($placeDeliveryRadio.render())
    $nameWrapper.appendChild($inputWrapper)
    $nameWrapper.appendChild($inputErrorParagraph.render())
    $formContainer.appendChild($headerContainer)
    $headerContainer.appendChild($searchInputWrapper)
    $headerContainer.appendChild($orderDelivery)
    $orderDelivery.appendChild($orderDeliveryParagraph.render())
    $priceContainer.appendChild($priceTitle.render())
    $dateInfo.appendChild($dateTitleSummary.render())
    $priceContainer.appendChild($carPrice.render())
    $priceContainer.appendChild($optionPrice.render())
    $priceContainer.appendChild($daysCarPrice.render())
    $priceContainer.appendChild($totalPrice.render())
    $dateTitle.appendChild($pickUpDateParagaraph.render())
    $dateTitle.appendChild($dropOffDateParagaraph.render())
    $mainContainer.appendChild($priceContainer)
    $mainContainer.appendChild($dateInfo)
    $dateInfo.appendChild($dateTitle)
    $dateInfo.appendChild($dateInputWrapper)
    $dateInputWrapper.appendChild($pickUp.render())
    $dateInputWrapper.appendChild($dropOff.render())
    $dateInfo.appendChild($rentalDaysParagraph.render())
    $formContainer.appendChild($mainContainer)
    $orderBtnWrapper.appendChild($submitBtn.render())

    $formContainer.appendChild($orderBtnWrapper)
    this.container.appendChild($formContainer)
  }

  handleOption = (e) => {
    const optionID = e.target.getAttribute('optionId')
    const index = this.options.findIndex(
      (option) => option.id === Number(optionID)
    )
    const selectedOptionIndex = this.selectedOptions.findIndex(
      (option) => option.id === Number(optionID)
    )

    if (selectedOptionIndex > -1) {
      const [elementToMove] = this.selectedOptions.splice(
        selectedOptionIndex,
        1
      )
      this.options.splice(index, 0, elementToMove)
    } else {
      const [elementToMove] = this.options.splice(index, 1)
      this.selectedOptions.push(elementToMove)
    }

    this.selectedOptionsPrice = this.selectedOptions.reduce(
      (acc, val) => acc + val.price,
      0
    )
    this.saveOrderToLocalStorage()
    this.render()
  }

  render() {
    const $container = document.createElement('div')

    if (!this.container) {
      this.container = $container
      $container.classList.add('order_modal_container')
    }

    this.container.innerHTML = ''
    const order = JSON.parse(window.sessionStorage.getItem('order'))

    if (order) {
      this.getOrderFormLs(order)
    }

    this.renderOrderForm()
    return $container
  }
}

export default OrderModal
