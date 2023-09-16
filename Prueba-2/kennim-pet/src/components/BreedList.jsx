import axios from 'axios';
import { useEffect, useState } from 'react';
import CardBreed from './CardBreed';

const BreedList = () => {
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
      fetchImages(breed);
      fetchSubBreeds(breed);
    });
  }, [breeds]);

  return (
    <div className="container">
      <h1 className="app-title">Vislumbre de maravillas</h1>
      <div className="breed-container">
        <CardBreed
          breeds={breeds}
          breedsImages={breedsImages}
          subBreeds={subBreeds}
        />
      </div>
    </div>
  );
};

export default BreedList;
