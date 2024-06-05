import React, { useState } from "react";
import { API } from "../../API";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
	const [data, setData] = useState({ username: "", email: "", mobile: "", password: "" });

	const navigate = useNavigate();

	const handleChange = (e) => {
		setData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const userRegister = async () => {
		console.log("btn clicked");
		try {
			const response = await axios(`${API}/api/user/register`, {
				method: "POST",
				data,
			});
			navigate("/");
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	console.log(data);

	return (
		<div className="p-5 m-5 login-container">
			<h3 className="mb-5">Register </h3>

			{/* <!-- Username input --> */}
			<div data-mdb-input-init className="form-outline mb-4">
				<input
					type="text"
					// id="form2Example1"
					className="form-control"
					onChange={handleChange}
					name="username"
					value={data.username}
				/>
				<label className="form-label" for="form2Example1">
					User Name
				</label>
			</div>

			{/* <!-- Email input --> */}
			<div data-mdb-input-init className="form-outline mb-4">
				<input
					type="email"
					id="form2Example1"
					className="form-control"
					onChange={handleChange}
					name="email"
					value={data.email}
				/>
				<label className="form-label" for="form2Example1">
					Email address
				</label>
			</div>
			{/* <!-- mobile input --> */}
			<div data-mdb-input-init className="form-outline mb-4">
				<input
					type="number"
					// id="form2Example1"
					className="form-control"
					onChange={handleChange}
					name="mobile"
					value={data.mobile}
				/>
				<label className="form-label" for="form2Example1">
					Mobile
				</label>
			</div>

			{/* <!-- Password input --> */}
			<div data-mdb-input-init className="form-outline mb-4">
				<input
					type="password"
					id="form2Example2"
					className="form-control"
					onChange={handleChange}
					name="password"
					value={data.password}
				/>
				<label className="form-label" for="form2Example2">
					Password
				</label>
			</div>

			{/* <!-- Submit button --> */}
			<button
				onClick={userRegister}
				type="button"
				data-mdb-button-init
				data-mdb-ripple-init
				className="btn btn-primary btn-block mb-4"
			>
				Register
			</button>

			<p onClick={()=>navigate('/')}>existing user</p>
		</div>
	)
}
