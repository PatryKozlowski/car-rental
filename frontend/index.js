import App from './App'
import Order from './Order'
import './styles/global.scss'

const app = new App()
const order = new Order()

window.app = app

const isOrder = window.location.pathname.includes('/order')

document.onreadystatechange = () => {
  if (document.readyState === 'complete' && !isOrder) {
    document.querySelector('.loader_container').remove()
    document.querySelector('#root').appendChild(app.render())
  } else {
    document.querySelector('.loader_container').remove()
    document.querySelector('#root').appendChild(order.render())
    document.title = 'Summary order car'
  }
}
