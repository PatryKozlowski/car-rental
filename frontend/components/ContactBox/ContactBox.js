import Heading from '../Heading/Heading'
import './ContactBox.scss'
import ContactInfo from './ContactInfo/ContactInfo'

class ContacBox {
  constructor() {
    this.contact = [
      { icon: ['fa-solid', 'fa-location-dot'], text: 'Poznań' },
      { icon: ['fa-solid', 'fa-phone'], text: '000 - 000 - 000' },
      { icon: ['fa-solid', 'fa-envelope'], text: 'patrykozlowski0@gmail.com' },
    ]
    this.accept = [
      { icon: ['fa-brands', 'fa-cc-apple-pay'] },
      { icon: ['fa-brands', 'fa-google-pay'] },
      { icon: ['fa-regular', 'fa-credit-card'] },
    ]
    this.social = [
      {
        icon: ['fa-brands', 'fa-instagram'],
        href: 'https://github.com/PatryKozlowski/car-rental',
      },
      {
        icon: ['fa-brands', 'fa-facebook'],
        href: 'https://github.com/PatryKozlowski/car-rental',
      },
      {
        icon: ['fa-brands', 'fa-twitter'],
        href: 'https://github.com/PatryKozlowski/car-rental',
      },
    ]
  }

  render() {
    const $container = document.createElement('div')
    $container.classList.add('contact_box_container')

    const $wrapper = document.createElement('div')
    $wrapper.classList.add('contact_box_wrapper')

    const $contactContainer = document.createElement('div')
    $contactContainer.classList.add(
      ...['contact_info_container', 'contact_info_container_contact']
    )

    const $contactAccept = document.createElement('div')
    $contactAccept.classList.add(
      ...['contact_info_container', 'contact_info_container_accept']
    )

    const $contactSocial = document.createElement('div')
    $contactSocial.classList.add(
      ...['contact_info_container', 'contact_info_container_social']
    )

    const $headingContact = new Heading('h3', 'Contact', [
      'contact_box_heading',
    ])

    const $headingAccept = new Heading('h3', 'We accept', [
      'contact_box_heading',
    ])

    const $headingSocial = new Heading('h3', 'Social', ['contact_box_heading'])

    $contactContainer.appendChild($headingContact.render())

    this.contact.forEach(({ icon, text }) => {
      const $contactInfo = new ContactInfo(icon, text)
      $contactContainer.appendChild($contactInfo.render())
    })

    $wrapper.appendChild($contactContainer)

    $contactAccept.appendChild($headingAccept.render())

    this.accept.forEach(({ icon }) => {
      const $contactInfo = new ContactInfo(icon, null, null)
      $contactAccept.appendChild($contactInfo.render())
    })

    $wrapper.appendChild($contactAccept)

    $contactSocial.appendChild($headingSocial.render())

    this.social.forEach(({ icon, href }) => {
      const $contactInfo = new ContactInfo(icon, null, null, href)
      $contactSocial.appendChild($contactInfo.render())
    })

    $wrapper.appendChild($contactSocial)

    $container.appendChild($wrapper)

    return $container
  }
}

export default ContacBox
