import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createDogAction } from '../redux/actions/dog';

const CreateDog = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const defaultValues = { name: '', subBreeds: [], image: '' };

  const submit = data => {
    // Convierte las subrazas en un arreglo de objetos con el campo "name"
    const subBreedsArray = data.subBreeds
      .split('\n')
      .map(subBreed => ({ name: subBreed.trim() }));

    // Crea un objeto con la estructura esperada
    const dogData = {
      name: data.name,
      subBreeds: subBreedsArray,
      image: data.image,
    };

    dispatch(createDogAction(dogData));

    reset(defaultValues);
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit(submit)}>
        <div className="form-createDog--box">
          <img src="/pet-house.png" alt="" />
          <div className="box-item">
            <label className="name" htmlFor="name">
              Dog Name
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="Husky"
              id="name"
              name="name"
              {...register('name', { required: true })}
            />
          </div>
          <div className="box-item">
            <label className="subBreeds" htmlFor="subBreeds">
              Sub Breeds (Enter one sub breed per line)
            </label>
            <textarea
              className="form-textarea"
              placeholder="- Labrador
- Golden Retriever"
              id="subBreeds"
              name="subBreeds"
              {...register('subBreeds', { required: true })}
            />
          </div>

          <div className="box-item">
            <label className="image" htmlFor="image">
              Image URL
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="Ex: https://images.dog.ceo/breeds/terrier-norwich/n02094258_1003.jpg"
              id="image"
              name="image"
              {...register('image', { required: true })}
            />
          </div>

          <button className="form-button" type="submit">
            Add Dog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDog;
