import axios from "axios";
import { useEffect, useState } from "react";
import CardBreed from "./CardBreed";

const BreedList = () => {
  const [breeds, setBreeds] = useState([]);
  const [breedsImages, setBreedsImages] = useState({});

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((res) => {
        const breedList = Object.keys(res.data.message);
        setBreeds(breedList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const breed of breeds) {
        try {
          const res = await axios.get(
            `https://dog.ceo/api/breed/${breed}/images/random`
          );
          images[breed] = res.data.message;
        } catch (err) {
          console.log(err);
          images[breed] = null;
        }
      }
      setBreedsImages(images);
      console.log(setBreedsImages)
    };

    if (breeds.length > 0) {
      fetchImages();
    }
  }, [breeds]);
  

  return (
    <div className="container">
      <h1>Vislumbre de maravillas</h1>

      <div>
        <CardBreed breeds={breeds} breedsImages={breedsImages} />
      </div>
    </div>
  );
};

export default BreedList;
