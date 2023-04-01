class Button {
  constructor(className, label, onClick, icon) {
    this.className = className
    this.label = label
    this.onClick = onClick
    this.icon = icon || null
  }

  render() {
    const $button = document.createElement('button')
    $button.innerText = this.label

    if (this.className) {
      $button.classList.add(...this.className)
    }

    if (this.icon) {
      const $Icon = document.createElement('i')
      $Icon.classList.add(...this.icon)
      $button.appendChild($Icon)
    }

    $button.addEventListener('click', this.onClick)
    return $button
  }
}

export default Button
