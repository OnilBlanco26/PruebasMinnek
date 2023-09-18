import { useForm } from 'react-hook-form';
import Navbar from '../../../components/Navbar';
import { useDispatch } from 'react-redux';
import { startRegister } from '../../../redux/actions/auth';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const defaultValues = { name: '', lastname: '', email: '', password: '' };

  const submit = data => {
    dispatch(
      startRegister(data.name, data.lastname, data.email, data.password)
    );
    reset(defaultValues);
  };

  return (
    <>
      <Navbar />
      <form className="form-container" onSubmit={handleSubmit(submit)}>
        <div className="form-login--box box-red">
          <img src="/pet-house.png" alt="" />
          <div className='box-name'>
          <div className="box-item">
            <label className="form-label" htmlFor="email">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="Jhon"
              id="name"
              name="name"
              {...register('name', { required: true })}
            />
          </div>
          <div className="box-item">
            <label className="form-label" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="form-input"
              type="lastname"
              placeholder="Doe"
              id="lastname"
              name="lastname"
              {...register('lastname', { required: true })}
            />
          </div>
          </div>
          <div className="box-item">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              className="form-input"
              type="email"
              placeholder="Ex:jhondoe@gmail.com"
              id="email"
              name="email"
              {...register('email', { required: true })}
            />
          </div>
          <div className="box-item">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              placeholder="***********"
              id="password"
              name="password"
              {...register('password', { required: true })}
            />
          </div>
          <button className="form-button" type="submit">
            Sign Up
          </button>
          <NavLink className="text-link" to="/">
            Login
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default SignUp;
