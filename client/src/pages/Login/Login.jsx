import React, { useContext, useState } from "react";
import { API } from "../../API";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext";

export function Login() {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const { userData, setUserData } = useContext(UserContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const userLogin = async () => {
		console.log("btn clicked");
		try {
			const response = await axios(`${API}/api/user/login`, {
				method: "POST",
				data,
			});
			localStorage.setItem('userId',response.data.userData._id);
			setUserData(response.data.userData);
			navigate("/home");
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	console.log(data);

	return (
		<div className="p-5 m-5 login-container">
			<h3 className="mb-5">Login </h3>

			{/* <!-- Email input --> */}
			<div data-mdb-input-init className="form-outline mb-4">
				<input
					type="email"
					id="form2Example1"
					className="form-control"
					onChange={handleChange}
					name="email"
					value={data.email}
					autoComplete="off"
				/>
				<label className="form-label" htmlFor="form2Example1">
					Email address
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
					autoComplete="off"
				/>
				<label className="form-label" htmlFor="form2Example2">
					Password
				</label>
			</div>

			{/* <!-- Submit button --> */}
			<button
				onClick={userLogin}
				type="button"
				data-mdb-button-init
				data-mdb-ripple-init
				className="btn btn-primary btn-block mb-4"
			>
				Log in
			</button>

			<p onClick={() => navigate("/register")}>new user- register</p>
		</div>
	);
}
