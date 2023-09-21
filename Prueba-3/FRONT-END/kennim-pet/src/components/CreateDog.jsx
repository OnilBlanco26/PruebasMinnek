import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createDogAction, updateDogsList } from '../redux/actions/dog';
import { useContext } from 'react';
import { DogsContext } from '../context/DogsContext';

const CreateDog = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const { breeds, setBreeds } = useContext(DogsContext);

  const defaultValues = { name: '', subBreeds: [], image: '' };

  const submit = data => {
    const subBreedsArray = data.subBreeds
      .split('\n')
      .map(subBreed => ({ name: subBreed.trim() }));

    const dogData = {
      name: data.name,
      subBreeds: subBreedsArray,
      image: data.image,
    };

    dispatch(createDogAction(dogData));

    reset(defaultValues);
    setBreeds(breeds => [...breeds, dogData]);
  };

  const errorMessages = {
    name: "Dog name is required",
    image: "Image URL is required",
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
            {errors.name && <p className="error">{errorMessages.name}</p>}
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
              {...register('subBreeds')}
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
            {errors.image && <p className="error">{errorMessages.image}</p>}
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
