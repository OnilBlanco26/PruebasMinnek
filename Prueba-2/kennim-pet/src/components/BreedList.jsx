import axios from "axios"
import { useEffect, useState } from "react"

const BreedList = () => {

    const [breeds, setBreeds] = useState([])

    useEffect(() => {
      axios.get('https://dog.ceo/api/breeds/list/all')
            .then(res => {
                const breedList = Object.keys(res.data.message)
                setBreeds(breedList)
            })
            .catch(err => console.log(err))
    }, [])
    
   
    
  return (
    <div>
        <h1>
            Vislumbre de maravillas
        </h1>
        
        <ul>
            {
                breeds.map((breed) => (
                    <li key={breed}>
                        <p>{breed}</p>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default BreedList