class Paragraph {
    constructor(className, label) {
        this.className = className
        this.label = label
    }

    render() {
        const $p = document.createElement('p')
        if (this.className) {
            $p.classList.add(...this.className)
        }
        
        $p.innerText = this.label

        return $p
    }
}

export default Paragraph