import { useEffect, useState } from "react";

import axios from "axios";
import PropTypes from 'prop-types';
import { DogsContext } from "./DogsContext";

export const DogsProvider = ({ children }) => {

    const [breeds, setBreeds] = useState([]);
    const [breedsImages, setBreedsImages] = useState({});
  
    useEffect(() => {
      axios
        .get('https://pruebasminnek-production.up.railway.app/minnerk/api/v1/dogs')
        .then(res => {
          setBreeds(res.data.data.dogs);
          console.log(res)
        })
        .catch(err => console.log(err));
    }, []);
  
    useEffect(() => {
      const images = {};
      const breedsData = {};
  
      const fetchImages = async breed => {
        try {
          const res = await axios.get(
            `https://dog.ceo/api/breed/${breed}/images/random`
          );
          images[breed] = res.data.message;
          setBreedsImages(prevImages => ({
            ...prevImages,
            [breed]: images[breed],
          }));
        } catch (err) {
          console.log(err);
          images[breed] = 'sin imagen';
          setBreedsImages(prevImages => ({
            ...prevImages,
            [breed]: 'sin imagen',
          }));
        }
      };
  
     
  
      breeds.forEach(breed => {
        fetchImages(breed);
    
      });
    }, [breeds]);



    DogsProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };


    return (
        <DogsContext.Provider value={{breeds, breedsImages}}>
            {children}
        </DogsContext.Provider>
    )
}

