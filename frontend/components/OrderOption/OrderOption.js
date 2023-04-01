import './OrderOption.scss'

class OrderOption {
  constructor(option, onClick, optionId, price) {
    this.option = option
    this.onClick = onClick
    this.optionId = optionId
    this.price = price
  }

  render() {
    const $optionContainer = document.createElement('div')
    $optionContainer.classList.add('order_option_container')

    const $spanOption = document.createElement('span')
    $spanOption.classList.add('order_option')
    $spanOption.innerText = this.option
    $spanOption.setAttribute('optionId', this.optionId)

    const $spanInfo = document.createElement('span')
    $spanInfo.classList.add('order_info')
    $spanInfo.innerText = `${this.price} zł`

    $spanOption.addEventListener('click', this.onClick)
    $spanOption.addEventListener('mouseenter', () => {
      $spanInfo.classList.add('order_info_show')
    })
    $spanOption.addEventListener('mouseleave', () => {
      $spanInfo.classList.remove('order_info_show')
    })

    $optionContainer.appendChild($spanOption)
    $optionContainer.appendChild($spanInfo)

    return $optionContainer
  }
}

export default OrderOption
