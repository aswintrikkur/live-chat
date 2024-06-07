import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API } from "./API";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({});
	const [allUsers, setAllUsers] = useState([]);
	const [secondPerson, setSecondPerson] = useState({});
	const [roomDetails, setRoomDetails] = useState("");


	// console.log("allUsers-----------", allUsers);
	// console.log("userData-----------", userData);
	// console.log("secondPerson----------", secondPerson);
	// // console.log("roomDetails----------", roomDetails);
	// console.log('=============================================');


	const fetchSecondPerson = (id) => {
		const fetchedData = allUsers.find((data) => data._id == id);
		setSecondPerson(fetchedData);
	};

	
	const fetchAllUsers = async () => {
		try {
			const response = await axios(`${API}/api/user/all`, {
				method: "GET",
			});
			setAllUsers(response.data.users.filter((data) => data._id != localStorage.getItem("userId")));
			const user = response.data.users.find((data) => data._id == localStorage.getItem("userId"));
			setUserData(user);
		} catch (error) {
			console.log(error);
		}
	};



	return (
		<UserContext.Provider
			value={{ userData, setUserData, allUsers, setAllUsers, fetchAllUsers, secondPerson, 
				fetchSecondPerson , roomDetails, setRoomDetails}}
		>
			{children}
		</UserContext.Provider>
	);
};
