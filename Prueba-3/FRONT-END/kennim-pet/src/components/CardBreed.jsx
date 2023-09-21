import { useContext, useState } from 'react';
import { DogsContext } from '../context/DogsContext';

const CardBreed = () => {
  const { breeds } = useContext(DogsContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return breeds || !imageLoaded ? (
    <div className="breed-container">
      {breeds.map(breed => {
        return (
          <div className="breed-card" key={breed.id}>
            <div className="image-container">
            
              <img className='breed-image' src={breed.image} alt={breed.name} onLoad={handleImageLoad} />
            </div>
            <div className="breed-card--info">
              <h2 className="breed-name">{breed.name}</h2>
              <div className="sub-breeds-container">
                <ul className='sub-breeds-list'>
                { breed.subBreeds.length > 0 ? breed.subBreeds.map(subBreed => {
                  return (
                    <li className="sub-breed-item" key={subBreed.id}>
                      {subBreed.name}
                    </li>
                  );
                }) : <p className='no-sub-breeds'>No sub-races</p>}
                </ul>
              </div>
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
