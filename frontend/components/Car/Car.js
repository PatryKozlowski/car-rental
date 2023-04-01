import moment from 'moment'
import Button from '../Button/Button'
import Paragraph from '../Paragraph/Paragraph'
import './Car.scss'

class Car {
  constructor(
    id,
    brand,
    model,
    power,
    speed,
    year,
    price,
    img,
    available,
    dropOff,
    handleModal
  ) {
    this.carID = id
    this.carBrand = brand
    this.carModel = model
    this.carPower = power
    this.carTopSpeed = speed
    this.carYear = year
    this.carPrice = price
    this.carImg = img || '../../assets/image/pexels-julio-nery-1687105.jpg'
    this.carAvailable = available
    this.availableDate = dropOff
    this.handleModal = handleModal
  }

  render() {
    const $conteiner = document.createElement('div')
    $conteiner.classList.add('car_wrapper')
    $conteiner.style.backgroundImage = `url(${this.carImg})`

    const $wrapperInfo = document.createElement('div')
    $wrapperInfo.classList.add('car_info_wrapper')

    const $brandModelWrapper = document.createElement('div')
    $brandModelWrapper.classList.add('car_brand_wrapper')

    const $restInfoWrapper = document.createElement('div')
    $restInfoWrapper.classList.add('car_rest_wrapper')

    const $unavailableWrapper = document.createElement('div')
    $unavailableWrapper.classList.add('car_not_available')

    const $brandParagraph = new Paragraph(
      ['car_paragraph_title', 'car_brand_paragraph'],
      this.carBrand
    )
    const $modelParagraph = new Paragraph(
      ['car_paragraph_title'],
      this.carModel
    )
    const $powerParagraph = new Paragraph(
      ['car_paragraph'],
      `${this.carPower} KM`
    )
    const $speedParagraph = new Paragraph(
      ['car_paragraph'],
      `${this.carTopSpeed} km/h`
    )
    const $yearParagraph = new Paragraph(['car_paragraph'], this.carYear)
    const $notAvailable = new Paragraph(null, 'Car unavailable')

    const $availableDate = new Paragraph(
      null,
      `until ${moment(this.availableDate).format('YYYY-MM-DD')}`
    )

    const $orderBtn = new Button(
      ['car_order_btn'],
      'Rent',
      this.handleModal,
      null
    )

    $brandModelWrapper.appendChild($brandParagraph.render())
    $brandModelWrapper.appendChild($modelParagraph.render())

    $restInfoWrapper.appendChild($powerParagraph.render())
    $restInfoWrapper.appendChild($speedParagraph.render())
    $restInfoWrapper.appendChild($yearParagraph.render())

    $wrapperInfo.appendChild($brandModelWrapper)
    $wrapperInfo.appendChild($restInfoWrapper)

    $conteiner.appendChild($wrapperInfo)

    if (this.carAvailable) {
      $conteiner
        .appendChild($orderBtn.render())
        .setAttribute('car-id', this.carID)
    } else {
      $unavailableWrapper.appendChild($notAvailable.render())
      $unavailableWrapper.appendChild($availableDate.render())
      $conteiner.appendChild($unavailableWrapper)
    }

    return $conteiner
  }
}

export default Car
