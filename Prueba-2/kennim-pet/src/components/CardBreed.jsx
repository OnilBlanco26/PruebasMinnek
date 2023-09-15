import PropTypes from 'prop-types';

const CardBreed = ({ breeds, breedsImages, subBreeds }) => {
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
                <p className="noImage-text">Cargando Imagen...</p>
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
                <p className="sub-breeds-item">No hay subrazas</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Espere...</p>
  );
};

CardBreed.propTypes = {
  breeds: PropTypes.array.isRequired,
  breedsImages: PropTypes.object.isRequired,
};

export default CardBreed;
