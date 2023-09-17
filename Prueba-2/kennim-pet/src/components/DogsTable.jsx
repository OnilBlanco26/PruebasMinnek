import axios from 'axios';
import { useEffect, useState } from 'react';

const DogsTable = () => {
  const [breeds, setBreeds] = useState([]);
  const [breedsImages, setBreedsImages] = useState({});
  const [subBreeds, setSubBreeds] = useState({});

  useEffect(() => {
    axios
      .get('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        const breedList = Object.keys(res.data.message);
        setBreeds(breedList);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const breedsData = {};

    const fetchSubBreeds = async breed => {
      try {
        const res = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
        const subBreedList = res.data.message;
        if (subBreedList.length > 0) {
          breedsData[breed] = subBreedList;
          setSubBreeds(prevSubBreeds => ({
            ...prevSubBreeds,
            [breed]: breedsData[breed],
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };

    breeds.forEach(breed => {
      fetchSubBreeds(breed);
    });
  }, [breeds]);
  return (
    <table className="dogs-table">
      <thead className="dogs-table--head">
        <tr>
          <th>Dogs</th>
          <th>Sub Breed</th>
        </tr>
      </thead>
      <tbody className="dogs-table--body">
        {breeds.map(breed => {
          return (
            <tr key={breed} className="dogs-table--body__tr">
              <td>{breed}</td>
              {subBreeds[breed] && subBreeds[breed].length > 0 ? (
                <td>
                  {subBreeds[breed].map((subBreed, index) => (
                    <span key={subBreed}>
                      {subBreed}
                      {index !== subBreeds[breed].length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </td>
              ) : (
                <p className="">No hay subrazas</p>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DogsTable;
