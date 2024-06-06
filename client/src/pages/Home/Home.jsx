import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { API } from "../../API";
import { UserContext } from "../../userContext";
import { ChatList } from "../../components/ChatList/ChatList";

export const Home = () => {
	const { userData, setUserData, allUsers, fetchAllUsers, secondPerson } = useContext(UserContext);
	console.log(userData, "=========userData--------");

	console.log("all users=======", allUsers);

	const [userId, setUserId] = useState("");
	const [yourChat, setYourChat] = useState(userData?.chat);
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const fetchUserChat = async () => {
		try {
			const response = await axios(`${API}/api/chat`, {
				method: "GET",
				params: { id: userId },
			});
			setUserData(response.data.userData);
			setYourChat(response.data.userData.chat);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// setUserId(localStorage.getItem('userId'));
		// fetchUserChat();
		fetchAllUsers();
	}, [message]);

	const handleSend = async () => {
		console.log("send button clicked");
		try {
			const response = await axios(`${API}/api/chat`, {
				method: "POST",
				data: { message: message, id: userData._id },
			});
			console.log(response);
			setYourChat(response?.data?.userData?.chat);
			setMessage("");
		} catch (error) {
			console.log(error);
		}
		// setYourChat((prev) => [...prev, you]);
	};

	return (
		<div className="home-container">
			<h2>Welcome {userData?.username} </h2>
			<div className="main-content">
				<div className="col1">
					<ChatList />
				</div>
				<div className="col2 chat">
					<div className="chat-head">
						<img src="/images/profile.svg" alt="pic" />
						<h4>{secondPerson?.username}</h4>
						<button onClick={fetchAllUsers} >Refresh</button>
					</div>

					<div className="chat-area">
						<div className="left">
						{secondPerson?.chat?.map((data, index) => (
								<div key={index}>
									<p>{data}</p>
									<br />
								</div>
							))}
						</div>
						<div className="right">
							{userData?.chat?.map((data, index) => (
								<div key={index}>
									<p>{data}</p>
									<br />
								</div>
							))}
						</div>
					</div>

					<div className="input-bar">
						<input
							type="text"
							placeholder="Enter message"
							name="you"
							value={message}
							onChange={handleChange}
						/>
						<button onClick={handleSend}>Send</button>
					</div>
				</div>
			</div>
		</div>
	);
};
