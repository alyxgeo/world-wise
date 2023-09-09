import { useCallback, useContext, useReducer } from "react";
import { createContext, useEffect} from "react"

//creating context
const CitiesContext = createContext()


const BASE_URL = "http://localhost:9000"



const initialSate = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
}


//reduecr function
function reducer(state, action) {

    switch (action.type) {

        case 'loading':
            return {
                ...state, isLoading: true
            }



        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            }



        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            }



        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }


        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => (city.id !== action.payload)),
                currentCity: {}
            }


        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }

        default: throw new Error('unknown action type')
    }


}





function CitiesProvider({ children }) {


    /*const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({})*/


    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialSate)


    useEffect(() => {
        async function fetchCities() {

            dispatch({ type: 'loading' })

            try {
                //setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json();
                //setCities(data)
                dispatch({ type: 'cities/loaded', payload: data })

            } catch {
                //alert('there is an error loading data...')
                dispatch({
                    type: 'rejected',
                    payload: 'there is an error loading cities...'
                })
            }
        }
        fetchCities()
    }, [])






    //city details 

   const getCity = useCallback(
    
    async function getCity(id) {

        //console.log(id, currentCity.id)
        if (Number(id) === currentCity.id) return;

        dispatch({ type: 'loading' })

        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json();
            //setCurrentCity(data)
            dispatch({ type: 'city/loaded', payload: data })

        } catch {
            //alert('there is an error loading data...')
            dispatch({
                type: 'rejected',
                payload: 'there is an error loading city...'
            })
        }
    }
    ,[currentCity.id]) 
    



    //adding new city data to api
    async function createCity(newCity) {
        dispatch({ type: 'loading' })

        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: { 'Content-Type': 'application/json' },
            })

            const data = await res.json();
            //console.log(data)

            //setCities(currCities => [...currCities, newCity])
            dispatch({ type: 'city/created', payload: data })

        } catch {
            //alert('there is an error on adding new city')
            dispatch({
                type: 'rejected',
                payload: 'there is an error creating city...'
            })
        }
    }






    //delete city 
    async function deleteCity(id) {

        dispatch({ type: 'loading' })

        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            })

            //setCities(currCities => currCities.filter((city) => (city.id !== id)))
            dispatch({ type: 'city/deleted', payload: id })

        } catch {
            //alert('there is an error on deleteing city')
            dispatch({
                type: 'rejected',
                payload: 'there is an error deleting city...'
            })
        }
    }




    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity,
        }}
        >{children}</CitiesContext.Provider>
    )
}



//customhook
function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) throw new Error('using context outside the provider')
    return context;
}



export { CitiesProvider, useCities }