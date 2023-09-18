import { useContext} from 'react';
import CardBreed from './CardBreed';
import { DogsContext } from '../context/DogsContext';

const BreedList = () => {
 
  const {breeds, breedsImages, subBreeds} = useContext(DogsContext);

  return (
    <div className="container">
     
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
