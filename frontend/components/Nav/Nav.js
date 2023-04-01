import './Nav.scss'

class Nav {
  constructor() {
    this.links = [
      { href: '#use', text: 'Why us' },
      { href: '#cars', text: 'Cars' },
      { href: '#contact', text: 'Contact' },
    ]
  }

  render() {
    const $nav = document.createElement('nav')
    $nav.classList.add('nav_container')

    this.links.forEach(({ href, text }) => {
      const $a = document.createElement('a')
      $a.innerText = text
      $a.href = href

      $nav.appendChild($a)
    })

    return $nav
  }
}

export default Nav
