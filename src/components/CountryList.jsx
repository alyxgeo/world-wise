
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'

import { useCities } from '../contexts/CitiesContext'

export default function CountriesList() {


    //consuming context using custom hook
    const { cities, isLoading } = useCities()



    //loading state spinner get return
    if (isLoading) {
        return <Spinner />
    }

    //if there is no data then this  message will return
    if (!cities.length) {
        return <Message message={'add yor first city by clicking on a  city on the map '} />
    }


    //deriving countries from the cities array
    const countries = cities.reduce((arr, city) => {

        if (!arr.map(el => el.country).includes(city.country))

            return [...arr, { country: city.country, emoji: city.emoji }]

        else return arr;

    }, [])


    return (

        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.country} />
            ))}

        </ul>
    )
}
