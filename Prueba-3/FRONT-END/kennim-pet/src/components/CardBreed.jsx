
import { useContext } from 'react';
import { DogsContext } from '../context/DogsContext';

const CardBreed = () => {

  const { breeds, breedsImages, subBreeds } = useContext(DogsContext);
  
  return breeds ? (
    <div className="breed-container">
      {breeds.map(breed => {
        return (
          <div className="breed-card" key={breed}>
            <div className="image-container">
              {breedsImages[breed] ? (
                <img
                  className="breed-image"
                  src={breedsImages[breed]}
                  alt={breed}
                />
              ) : (
                <p className="noImage-text">Loading Image...</p>
              )}
            </div>

            <h2 className="breed-name">{breed}</h2>
            
            <div className="sub-breeds-container">
              {subBreeds[breed] && subBreeds[breed].length > 0 ? (
                <ul className="sub-breeds-list">
                  {subBreeds[breed].map(subBreed => {
                    return (
                      <li className="sub-breeds-item" key={subBreed}>
                        {subBreed}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="sub-breeds-item">No sub-races</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Wait...</p>
  );
};


export default CardBreed;
