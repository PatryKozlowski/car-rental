class Icon {
  constructor(icon) {
    this.icon = icon
  }

  render() {
    if (!this.icon) {
      console.error('Empty icon constructor')
    }

    const $icon = document.createElement('i')
    $icon.classList.add(...this.icon)

    return $icon
  }
}

export default Icon
