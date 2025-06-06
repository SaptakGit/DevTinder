import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utlis/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utlis/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    try{
        const res = await axios.post(BASE_URL+"/login", {
            emailId,
            password
        }, {withCredentials:true});
        //console.log(res.data);
        dispatch(addUser(res.data));
        return navigate("/");
    } catch(err){
        setError(err?.response.data || "Something went wrong");
    }
  }

  const handleSignup = async () => {
    try{
        const res =  await axios.post(
            BASE_URL + "/signup",
            {
                firstName, 
                lastName,
                emailId,
                password
            },
            {withCredentials:true}
        );
        dispatch(addUser(res.data.data));
        return navigate("/profile");
    } catch(err){
        setError(err?.response.data || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Signup"}</h2>
                <div>
                    {!isLoginForm && <><label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">Firstname</span>
                        </div>
                        <input 
                            type="text" 
                            value={firstName} 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setfirstName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">Lastname</span>
                        </div>
                        <input 
                            type="text" 
                            value={lastName} 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setlastName(e.target.value)}
                        />
                    </label></>}
                    <label className="form-control w-full max-w-xs my-4">
                        <div className="label">
                            <span className="label-text">Email Id</span>
                        </div>
                        <input 
                            type="text" 
                            value={emailId} 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input 
                            type="password" 
                            value={password} 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <p className='text-red-500'>{error}</p>
                <div className="card-actions justify-center m-2">
                    <button className="btn btn-primary" onClick={isLoginForm ?  handleLogin : handleSignup}>{isLoginForm ? "Login" : "Sign up"}</button>
                </div>
                <p className='m-auto cursor-pointer py-2' onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New User? Signup here":"Existing User? Login here"}</p>
            </div>
        </div>
    </div>
  )
}

export default Login;