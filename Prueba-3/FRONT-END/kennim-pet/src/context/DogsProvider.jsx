import { useEffect, useState } from "react";

import axios from "axios";
import PropTypes from 'prop-types';
import { DogsContext } from "./DogsContext";

export const DogsProvider = ({ children }) => {

    const [breeds, setBreeds] = useState([]);
  
    useEffect(() => {
      axios
        .get('https://pruebasminnek-production.up.railway.app/minnerk/api/v1/dogs')
        .then(res => {
          setBreeds(res.data.data.dogs);
        })
        .catch(err => console.log(err));
    }, []);


    DogsProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };


    return (
        <DogsContext.Provider value={{breeds, setBreeds }}>
            {children}
        </DogsContext.Provider>
    )
}

