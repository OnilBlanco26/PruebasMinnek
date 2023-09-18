import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { startLogin } from "../../../redux/actions/auth"

const Login = () => {

  const dispatch = useDispatch()

  const {register, handleSubmit, reset} = useForm()
  const {email} = useSelector(state => state.auth)

  const defaultValues = {
    email: "",
    password: ""
  }

  const submit = (data) => {
    dispatch(startLogin(data.email, data.password))
    reset(defaultValues)
  }


  
  
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div >
        <label htmlFor="email">Email address</label>
        <input 
          type="email" 
           
          id="email" 
          name="email"
          defaultValue={email}
          {...register("email", {required: true})}
        />
      </div>
      <div >
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
           
          id="password" 
          name="password"
          {...register("password", {required: true})}
        />
      </div>
      <button 
        type="submit" 
        
      >
        Submit
      </button>
    </form>
  )
}

export default Login