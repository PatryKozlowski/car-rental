import Icon from '../../Icon/Icon'
import Paragraph from '../../Paragraph/Paragraph'
import './ContactInfo.scss'

class ContactInfo {
  constructor(icon, text, classList, href) {
    this.icon = icon
    this.text = text
    this.classList = classList
    this.href = href
  }

  render() {
    const $contactWrapper = document.createElement('div')
    $contactWrapper.classList.add('contact_info_wrapper')

    if (this.classList) {
      $contactWrapper.classList.add(this.classList)
    }

    const $icon = new Icon(this.icon)

    if (this.href) {
      const $a = document.createElement('a')
      $a.href = this.href
      $a.target = '_blank'
      $a.appendChild($icon.render())
      $contactWrapper.appendChild($a)
    } else {
      $contactWrapper.appendChild($icon.render())
    }

    if (this.text) {
      const $paragraph = new Paragraph(null, this.text)
      $contactWrapper.appendChild($paragraph.render())
    }

    return $contactWrapper
  }
}

export default ContactInfo
