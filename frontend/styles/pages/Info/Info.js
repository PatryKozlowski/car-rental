import InfoBox from '../../components/InfoBox/InfoBox'
import noLimits from '../../assets/movie/no_limits.mp4'
import cashBack from '../../assets/movie/cash_back.mp4'
import loyaltyProgram from '../../assets/movie/loyalty_program.mp4'

import './Info.scss'

class Info {
  render() {
    const $section = document.createElement('section')
    $section.classList.add('info_section')

    const $infoContainer = document.createElement('div')
    $infoContainer.classList.add('info_section_container')

    const $infoBoxWrapper = document.createElement('div')
    $infoBoxWrapper.classList.add('info_box_section_wrapper')

    const $noLimits = new InfoBox(
      noLimits,
      ['fa-solid', 'fa-road-circle-xmark'],
      'No kilometer limit'
    )

    const $cashBack = new InfoBox(
      cashBack,
      ['fa-solid', 'fa-sack-dollar'],
      'Free booking cancellation'
    )

    const $loyaltyProgram = new InfoBox(
      loyaltyProgram,
      ['fa-solid', 'fa-people-group'],
      'Loyalty program'
    )

    $infoBoxWrapper.appendChild($noLimits.render())
    $infoBoxWrapper.appendChild($cashBack.render())
    $infoBoxWrapper.appendChild($loyaltyProgram.render())

    $infoContainer.appendChild($infoBoxWrapper)
    $section.appendChild($infoContainer)

    return $section
  }
}

export default Info
