import * as L from 'leaflet'
import markIcon from '../../assets/image/marker-icon-2x.png'
import 'leaflet/dist/leaflet.css'
import './Map.scss'

class Map {
  render() {
    const $container = document.createElement('div')

    $container.setAttribute('id', 'map')

    setTimeout(() => {
      const $map = document.getElementById('map')

      if ($map) {
        const map = L.map('map', { scrollWheelZoom: false }).setView(
          [52.409538, 16.931992],
          13
        )
        const icon = L.icon({
          iconUrl: markIcon,
          iconSize: [25, 41],
          popupAnchor: [0, -10],
        })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 20,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
        }).addTo(map)
        L.marker([52.40019, 16.92755], { icon })
          .addTo(map)
          .bindPopup(
            '<b>Cars Rental - Poznań</b><br>Półwiejska 999A<br><br><b>Monday:</b> 9 AM–5 PM<br><b>Tuesday:</b> 9 AM–5 PM<br><b>Wednesday:</b> 9 AM–5 PM<br><b>Thursday:</b> 9 AM–5 PM<br><b>Friday:</b> 9 AM–5 PM<br><b>Saturday:</b> 8 AM–13 PM<br><b>Sunday:</b> Closed<br>'
          )
          .openPopup()
      }
    }, 0)

    return $container
  }
}

export default Map
