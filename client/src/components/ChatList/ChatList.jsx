import React, { useContext } from "react";
import ".//ChatList.scss";
import { UserContext } from "../../userContext";
import axios from "axios";
import { API } from "../../API";

export const ChatList = () => {
	const { allUsers, fetchSecondPerson ,setRoomDetails } = useContext(UserContext);


	const createChatRoom = async (data) => {
		try {
			const response = await axios(`${API}/api/chat/room`, {
				method: "POST",
				data: {
					idOne: localStorage.getItem("userId"),
					idTwo: data._id,
				},
			});

			fetchSecondPerson(data._id);
			setRoomDetails(response?.data?.roomDetails)
			
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="chatlist-container">
			<h3>Chat List</h3>

			{allUsers.map((data, index) => (
				<div className="single-chat" key={index} onClick={() => createChatRoom(data)}>
					<img src="/images/profile.svg" alt="profile" />
					{data?.username}
				</div>
			))}
		</div>
	);
};
