import validator from 'validator'

const showErrorInput = (message) => {
  const $errorMessageInput =
    document.getElementsByClassName('error_paragraph')[0]
  $errorMessageInput.style.visibility = 'visible'
  $errorMessageInput.innerText = message
}

export const validation = (e) => {
  e.preventDefault()
  let isValid = true

  const $nameInput = document.getElementById('name')
  const $emailInput = document.getElementById('email')
  const $radiosInput = document.getElementsByName('select_place_delivery')
  const $radioContainer = document.getElementsByClassName('container_radio')[0]

  if (validator.isEmpty($nameInput.value)) {
    $nameInput.classList.add('error_order_input')
    showErrorInput('This field is required')
    isValid = false
  }

  if (!validator.contains($nameInput.value, ' ')) {
    $nameInput.classList.add('error_order_input')
    showErrorInput('First name and last name must be separated by a space')
    isValid = false
  }

  if (validator.isEmpty($emailInput.value)) {
    $emailInput.classList.add('error_order_input')
    showErrorInput('This field is required')
    isValid = false
  }

  if (!validator.isEmail($emailInput.value)) {
    $emailInput.classList.add('error_order_input')
    showErrorInput('Please type valid email')
    isValid = false
  }

  if (!($radiosInput[0].checked || $radiosInput[1].checked)) {
    $radioContainer.classList.add('error_order_radio')
    showErrorInput('Please select a delivery location')
    isValid = false
  }

  return isValid
}
