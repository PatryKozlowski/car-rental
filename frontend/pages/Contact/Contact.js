import ContacBox from '../../components/ContactBox/ContactBox'
import Map from '../../components/Map/Map'
import './Contact.scss'

class Contact {
  constructor() {
    this.container = null
  }

  render() {
    const $section = document.createElement('section')

    if (!this.container) {
      this.container = $section
      $section.classList.add('contact_section')
    }

    const $contactContainer = document.createElement('div')
    $contactContainer.classList.add('contanct_container')

    const $mapWrapper = document.createElement('div')
    $mapWrapper.classList.add('contact_map_wrapper')

    const $Map = new Map()
    $mapWrapper.appendChild($Map.render())

    const $contactinfoWrapper = document.createElement('div')
    $contactinfoWrapper.classList.add('contat_info_wrapper')

    const $contactBox = new ContacBox()
    $contactinfoWrapper.appendChild($contactBox.render())

    $contactContainer.appendChild($mapWrapper)
    $contactContainer.appendChild($contactinfoWrapper)

    $section.appendChild($contactContainer)

    return this.container
  }
}

export default Contact
