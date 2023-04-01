import {
  homeParagraphFirst,
  homeParagraphSecound,
  homeParagraphThird,
} from '../../assets/text'
import Movie from '../../components/Movie/Movie'
import Paragraph from '../../components/Paragraph/Paragraph'
import './Home.scss'

class Home {
  render() {
    const $section = document.createElement('section')
    $section.classList.add('home_section')

    const $paragraphContainer = document.createElement('div')
    $paragraphContainer.classList.add('paragaraph_wrapper')

    const $Movie = new Movie()
    const $ParagraphFirst = new Paragraph(
      ['home_info', 'home_info_frist', 'animated_text_frist'],
      homeParagraphFirst
    )
    const $ParagraphSecound = new Paragraph(
      ['home_info', 'home_info_secound', 'animated_text_secound'],
      homeParagraphSecound
    )
    const $ParagraphThird = new Paragraph(
      ['home_info', 'home_info_third', 'animated_text_third'],
      homeParagraphThird
    )

    $section.appendChild($Movie.render())
    $paragraphContainer.appendChild($ParagraphFirst.render())
    $paragraphContainer.appendChild($ParagraphSecound.render())
    $paragraphContainer.appendChild($ParagraphThird.render())

    $section.appendChild($paragraphContainer)

    return $section
  }
}

export default Home
