import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Cars from './pages/Cars/Cars'
import Info from './pages/Info/Info'
import Loader from './components/Loader/Loader'
import { getCars } from './lib/services/api/getCars'
import Button from './components/Button/Button'
import Contact from './pages/Contact/Contact'
import Footer from './pages/Footer/Footer'

class App {
  constructor() {
    this.container = null
    this.cars = []
    this.isLoadingData = false
    this.loadCars()
  }

  goTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  setLoadingData(newIsLoading) {
    this.isLoadingData = newIsLoading
    this.render()
  }

  async loadCars() {
    this.setLoadingData(true)
    try {
      const cars = await getCars()
      this.cars = cars
    } catch (error) {
      console.log(error.message)
    } finally {
      this.setLoadingData(false)
    }
  }

  render() {
    const $rootDiv = document.createElement('main')
    if (!this.container) {
      this.container = $rootDiv
      $rootDiv.classList.add('app_container')
    }

    this.container.innerHTML = ''

    const $Header = new Header()
    this.container.appendChild($Header.render())

    const $Home = new Home()
    this.container.appendChild($Home.render())

    const $Info = new Info()
    this.container.appendChild($Info.render()).setAttribute('id', 'use')

    if (this.isLoadingData) {
      const $Loader = new Loader()
      this.container.appendChild($Loader.render())
    } else {
      const $Cars = new Cars(this.cars)
      this.container.appendChild($Cars.render()).setAttribute('id', 'cars')
    }

    const $Contact = new Contact()
    this.container.appendChild($Contact.render()).setAttribute('id', 'contact')

    const $Footer = new Footer()
    this.container.appendChild($Footer.render())

    const $TopBtn = new Button(['top_btn'], null, this.goTop, [
      'fa-solid',
      'fa-circle-chevron-up',
    ])
    const $btn = $TopBtn.render()
    this.container.appendChild($btn)

    window.onscroll = function () {
      if (window.pageYOffset > 100) {
        $btn.style.display = 'block'
      } else {
        $btn.style.display = 'none'
      }
    }

    return this.container
  }
}

export default App
