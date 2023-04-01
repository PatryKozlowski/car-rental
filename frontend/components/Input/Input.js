import moment from 'moment'

class Input {
  constructor(
    className,
    type,
    placeholder,
    onChange,
    value,
    isFocused = false,
    inputID
  ) {
    this.className = className
    this.type = type || 'text'
    this.placeholder = placeholder
    this.onChange = onChange
    this.value = value
    this.isOpenModal = false
    this.isFoucsed = isFocused
    this.inputID = inputID
  }

  render() {
    const $input = document.createElement('input')

    $input.type = this.type

    $input.value = this.value

    if (this.inputID) {
      $input.setAttribute('id', this.inputID)
    }

    const isModalOpen = document.getElementsByClassName('order_is_open')[0]

    if (this.className) {
      $input.classList.add(...this.className)
    }

    if (this.placeholder) {
      $input.placeholder = this.placeholder
    }

    if (this.type === 'date') {
      if (this.inputID === 'dropOff') {
        $input.min = moment().add(2, 'days').format('YYYY-MM-DD')
      }

      if (this.inputID === 'pickUp') {
        $input.min = moment().add(1, 'days').format('YYYY-MM-DD')
      }
    }

    $input.addEventListener('input', this.onChange)

    if (isModalOpen) {
      if (this.isFoucsed) {
        setTimeout(() => {
          $input.focus()
        }, 0)
      }
    }

    return $input
  }
}

export default Input
