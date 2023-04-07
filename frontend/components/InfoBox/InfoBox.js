import Icon from '../Icon/Icon'
import Paragraph from '../Paragraph/Paragraph'
import './InfoBox.scss'

class InfoBox {
  constructor(video, icon, text) {
    this.video = video
    this.icon = icon
    this.text = text
  }

  autoPlay(element) {
    if (window.innerWidth > 992) {
      element.setAttribute('autoplay', '')
      element.setAttribute('playsinline', '')
    }
  }

  render() {
    const $container = document.createElement('div')
    $container.classList.add('info_box_container')

    const $infoContainer = document.createElement('div')
    $infoContainer.classList.add('info_container')

    const $infoWrapper = document.createElement('div')
    $infoWrapper.classList.add('info_wrapper')

    const $icon = new Icon(this.icon)
    const $infoParagraph = new Paragraph(null, this.text)

    const $video = document.createElement('video')
    $video.setAttribute('id', 'info_box_video')
    $video.src = this.video
    $video.preload = 'none'
    $video.loop = true
    $video.muted = true
    $video.setAttribute('type', 'video/mp4')

    this.autoPlay($video)

    $infoWrapper.appendChild($icon.render())
    $infoWrapper.appendChild($infoParagraph.render())

    $infoContainer.appendChild($infoWrapper)
    $container.appendChild($video)
    $container.appendChild($infoContainer)

    return $container
  }
}

export default InfoBox
