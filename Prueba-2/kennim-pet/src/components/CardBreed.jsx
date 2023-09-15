import PropTypes from "prop-types";

const CardBreed = ({ breeds, breedsImages }) => {
  return (
    breeds ?  (
        <div className="breed-container">
      {breeds.map((breed) => {
        return (
          <div className="breed-card" key={breed}>
            <div className="image-container">
                {
                    breedsImages[breed] ? (
                        <img
                        className="breed-image"
                        src={breedsImages[breed]}
                        alt={breed}
                      />
                    ) : (
                        <p>Imagen no disponible</p>
                    )
                }
             
            </div>
            <h2 className="breed-name">{breed}</h2>
          </div>
        );
      })}
    </div>
    ) : (
        <p>
            Espere...
        </p>
    )
    
  );
};

CardBreed.propTypes = {
  breeds: PropTypes.array.isRequired,
  breedsImages: PropTypes.object.isRequired,
};

export default CardBreed;
