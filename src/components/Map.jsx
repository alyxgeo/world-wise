import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'

import { useEffect, useState } from 'react'
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';


export default function Map() {

  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([10, 0])



  //custom hook
  const { isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition } = useGeolocation();



  //reading data fro url using custom hook
  const [maplat, maplng] = useUrlPosition();


  useEffect(() => {
    if (maplat && maplng) setMapPosition([maplat, maplng])
  }, [maplat, maplng])



  useEffect(() => {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])



  return (

    <div className={styles.mapContainer}>

      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Lodaing' : 'use your Position'}</Button>
      )}


      <MapContainer
        center={mapPosition}

        zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city, i) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={i}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}


//custom component to change position
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}



function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      //console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  })
}