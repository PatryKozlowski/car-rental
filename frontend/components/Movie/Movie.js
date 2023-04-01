import movieBg from '../../assets/movie/main_movie.mp4'
import './Movie.scss'

class Movie {
  render() {
    const $movie = document.createElement('video')
    $movie.classList.add('bg_video')
    $movie.src = movieBg
    $movie.autoplay = true
    $movie.muted = true
    $movie.playsInline = true

    return $movie
  }
}

export default Movie
