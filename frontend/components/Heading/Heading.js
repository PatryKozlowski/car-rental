class Heading {
  constructor(heading, label, className) {
    this.heading = heading
    this.label = label
    this.className = className
  }

  render() {
    if (!this.heading) {
      console.error('Heading constructor is empty')
    }

    const $heading = document.createElement(this.heading)
    $heading.innerText = this.label

    if (this.className) {
      $heading.classList.add(...this.className)
    }

    return $heading
  }
}

export default Heading
