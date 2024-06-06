import React, { useContext } from "react";
import ".//ChatList.scss";
import { UserContext } from "../../userContext";

export const ChatList = () => {
	const { allUsers, fetchSecondPerson } = useContext(UserContext);

	return (
		<div className="chatlist-container">
			<h3>Chat List</h3>

			{allUsers.map((data, index) => (
				<div className="single-chat" key={index} onClick={() => fetchSecondPerson(data)}>
					<img src="/images/profile.svg" alt="profile" />
					{data?.username}
				</div>
			))}
		</div>
	);
};
