import { useContext } from 'react';
import { DogsContext } from '../context/DogsContext';

const CardBreed = () => {
  const { breeds } = useContext(DogsContext);

  return breeds ? (
    <div className="breed-container">
      {breeds.map(breed => {
        return (
          <div className="breed-card" key={breed.id}>
            <div className="image-container">
              <p>{breed.image}</p>
            </div>
            <div className="breed-card--info">
              <h2 className="breed-name">{breed.name}</h2>
              <div className="sub-breeds-container">
                <ul className='sub-breeds-list'>
                {breed.subBreeds.map(subBreed => {
                  return (
                    <li className="sub-breed-item" key={subBreed.id}>
                      {subBreed.name}
                    </li>
                  );
                })}
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
