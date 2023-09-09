
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'
import Spinner from './Spinner'

import { useCities } from '../contexts/CitiesContext'



export default function CityList() {


    //consuming context using custom hook
    const { cities, isLoading } = useCities()
    //console.log(cities)



    //loading state spinner get return
    if (isLoading) {
        return <Spinner />
    }


    //if there is no data then this  message will return
    if (!cities.length) return <Message
        message={'add yor first city by clicking on a  city on the map '} />





    return (
        <ul className={styles.cityList}>
            {cities.map((city, i) => (
                <CityItem city={city} key={i} />
            ))}
        </ul>
    )
}
