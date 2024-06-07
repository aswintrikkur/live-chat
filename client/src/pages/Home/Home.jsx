import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { API } from "../../API";
import { UserContext } from "../../userContext";
import { ChatList } from "../../components/ChatList/ChatList";

export const Home = () => {
	const {
		userData,
		setUserData,
		allUsers,
		fetchAllUsers,
		secondPerson,
		fetchSecondPerson,
		roomDetails,
		setRoomDetails,
	} = useContext(UserContext);


	const [message, setMessage] = useState("");
	const chatAreaRef = useRef(null);


	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const refreshChat = async () => {
		try {
			const response = await axios(`${API}/api/chat`, {
				method: "GET",
				params: { roomId: roomDetails?._id },
			});
			// console.log(response.data,'===========refresh');
			setRoomDetails(response?.data?.roomDetails);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSend = async () => {
		try {
			const response = await axios(`${API}/api/chat`, {
				method: "PUT",
				data: { roomId: roomDetails?._id, userId: userData._id, message },
			});
			setRoomDetails(response?.data?.roomDetails);
			setMessage("");
		} catch (error) {
			console.log(error);
		}
	};


	useEffect(() => {
		const refreshTimer = setInterval(() => {
			// refreshChat();
		}, 1000);

		return () => {
			clearInterval(refreshTimer);
		};
	}, []);

	useEffect(() => {
		fetchAllUsers();
	}, []);

	useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [message, roomDetails]);

	return (
		<div className="home-container">
			<h2>Welcome {userData?.username} </h2>
			<div className="main-content">
				<div className="col1">
					<ChatList />
				</div>
				<div className="col2 chat">
					{secondPerson?._id && (
						<>
							<div className="chat-head">
								<img src="/images/profile.svg" alt="pic" />
								<div className="user-details">
									<h4>{secondPerson?.username}</h4>
									<p>{secondPerson?.mobile}</p>
								</div>
								<button onClick={refreshChat}>Refresh</button>
							</div>

							<div className="chat-area" ref={chatAreaRef}>
								<div className="scroll-area">
									{roomDetails?.chat?.map((data, index) => (
										<div
											key={index}
											className={`message ${
												data?.userId === userData._id ? "first-person" : "second-person"
											} `}
										>
											<p>{data?.message}</p>
										</div>
									))}
								</div>
							</div>

							<div className="input-bar">
								<input
									type="text"
									placeholder="Enter message"
									name="message"
									value={message}
									onChange={handleChange}
								/>
								<button onClick={handleSend}>Send</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
