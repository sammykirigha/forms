import React, { useState } from 'react'

const Form = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleRememberMe = (e) => {
		setRememberMe(e.target.checked)
	}

	const onSubmit = (e) => {
		let emailErr = "";
		let passwordErr = "";

		if (!email) {
			emailErr = "Email can't be empty"
		}

		if (!password) {
			passwordErr= "Password can't be empty"
		} else if(password.length < 4){
			passwordErr="password should be at least 8 characters"
		}
 
		if (emailErr || passwordErr) {
			setEmailError(emailErr)
			setPasswordError(passwordErr)
		}

		e.preventDefault()
		console.log({ email, password, rememberMe });
		setEmail("")
		setPassword("")
	}


  return (
	  <div className='mt-8 bg-gray-300 border rounded-md p-3 w-[400px]'>
		  <form onSubmit={onSubmit}>
			  <div className='flex flex-col gap-2'>
				  <label>Email</label>
				  <input value={email} onChange={handleEmail} className='outline outline-gray-50 rounded-md' type="email" />
				  {emailError && <p>{ emailError}</p> }
			  </div>
			  <div className='flex flex-col gap-2 mt-4'>
				  <label>Password</label>
				  <input value={password} onChange={handlePassword} className='outline outline-gray-50 rounded-md ' type="password" />
				  {passwordError && <p>{ passwordError}</p> }
			  </div>
			  <div className='flex flex-row gap-3 items-center mt-5'>
			  <input value={rememberMe} onChange={handleRememberMe} type="checkbox"  />
			  <span className='text-md text-slate-900'>Remember me</span> 
			  </div>
			  <input   className='mt-5 bg-blue-600 py-2 px-2 rounded-md cursor-pointer' type="submit" />
		  </form>
	</div>
  )
}

export default Form;
