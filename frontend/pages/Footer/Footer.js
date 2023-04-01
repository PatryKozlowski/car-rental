import './Footer.scss'

class Footer {
  render() {
    const $footer = document.createElement('footer')
    $footer.classList.add('footer_container')

    const $a = document.createElement('a')
    $a.innerText = 'Patryk Kozłowski'
    $a.href = 'https://github.com/PatryKozlowski?tab=repositories'
    $a.target = '_blank'

    $footer.appendChild($a)
    return $footer
  }
}

export default Footer
