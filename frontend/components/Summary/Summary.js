import moment from 'moment'
import Heading from '../Heading/Heading'
import Paragraph from '../Paragraph/Paragraph'
import Button from '../Button/Button'
import './Summary.scss'

class Summary {
  constructor(deliveryPlace, dropOff, image) {
    this.deliveryPlace = deliveryPlace
    this.dropOff = dropOff
    this.carImage = image
  }

  confirmBtn() {
    window.sessionStorage.clear()
    window.location.pathname = '/'
  }

  render() {
    const $section = document.createElement('section')
    $section.classList.add('summary_section')

    const $summaryContainer = document.createElement('div')
    $summaryContainer.classList.add('summary_container')

    const $summaryParagraphWrapper = document.createElement('div')
    $summaryParagraphWrapper.classList.add('summary_paragrapg_wrapper')

    const $summaryCarImageWrapper = document.createElement('div')
    $summaryCarImageWrapper.classList.add('summary_car_image_wrapper')

    const $firstParagraph = new Paragraph(null, 'Thank you for renting a car.')

    const $secondParagraph = new Paragraph(
      null,
      `The car will be ready for collection on ${moment(this.dropOff).format(
        'YYYY-MM-DD'
      )} at gate 22 ${this.deliveryPlace} Airport`
    )

    const $headerSummary = new Heading('h1', 'Summary car order', [
      'summary_heading',
    ])

    const $summaryCarImg = document.createElement('img')
    $summaryCarImg.classList.add('summary_car_img')
    $summaryCarImg.src = `${this.carImage}`

    const $confirmSummary = new Button(
      ['summar_confirm_btn'],
      'Confirm',
      this.confirmBtn,
      null
    )

    $summaryContainer.appendChild($headerSummary.render())
    $summaryParagraphWrapper.appendChild($firstParagraph.render())
    $summaryParagraphWrapper.appendChild($secondParagraph.render())
    $summaryContainer.appendChild($summaryParagraphWrapper)
    $summaryContainer.appendChild($summaryCarImageWrapper)
    $summaryCarImageWrapper.appendChild($summaryCarImg)
    $summaryContainer.appendChild($confirmSummary.render())

    $section.appendChild($summaryContainer)

    return $section
  }
}

export default Summary
