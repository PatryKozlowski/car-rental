import Icon from '../Icon/Icon'
import Paragraph from '../Paragraph/Paragraph'
import './NoCar.scss'

class NoCar {
  render() {
    const $container = document.createElement('div')
    $container.classList.add('no_car_container')

    const $paragraph = new Paragraph(null, 'No cars available')
    const $Icon = new Icon(['fa-solid', 'fa-road-barrier'])

    $container.appendChild($Icon.render())
    $container.appendChild($paragraph.render())

    return $container
  }
}

export default NoCar
