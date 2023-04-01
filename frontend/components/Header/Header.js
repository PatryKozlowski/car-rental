import Logo from '../Logo/Logo'
import Nav from '../Nav/Nav'
import './Header.scss'

class Header {
  constructor() {
    this.isOpen = null
  }

  render() {
    const $header = document.createElement('header')
    $header.classList.add('header_container')

    const $Logo = new Logo()
    $header.appendChild($Logo.render())

    const $Nav = new Nav()
    $header.appendChild($Nav.render())

    document.onscroll = function () {
      if (window.pageYOffset > 100) {
        $header.classList.add('header_bg')
      } else {
        $header.classList.remove('header_bg')
      }
    }

    return $header
  }
}

export default Header
