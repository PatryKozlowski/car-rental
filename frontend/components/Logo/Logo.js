import './Logo.scss'

class Logo {
  render() {
    const $logoDiv = document.createElement('div')
    $logoDiv.classList.add('logo_container')

    const $h3 = document.createElement('h3')
    $h3.classList.add('logo_wrapper')

    const $a = document.createElement('a')
    $a.href = '/'
    $a.innerText = 'CARS RENTS'

    $h3.appendChild($a)

    $logoDiv.appendChild($h3)

    return $logoDiv
  }
}

export default Logo
