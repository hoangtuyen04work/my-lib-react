import { useSelector, useDispatch } from 'react-redux';
// NotificationDropdown.js
import React, { useEffect, useState } from 'react';
import '../../styles/user/NotificationDropdown.scss';
import { numberNotifications } from '../../redux/action/userAction';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
const NotificationDropdown = ({ isOpen }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.user.token);
  const userId = useSelector((state) => state.user.user.id);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const socket = new SockJS('http://localhost:8087/notify/notify/websocket', null, {
      withCredentials: true,
    });
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        client.subscribe(`/notify/receiver/${userId}`, (response) => {
          const notificationReceive = JSON.parse(response.body);
          setNotifications((prev) => [...prev, notificationReceive.data]);
          dispatch(numberNotifications(notifications.length + 1))
          console.log(notifications.length + 1)
        });
      },
      onStompError: (frame) => {
        console.error(`Broker error: ${frame.headers['message']}`, frame.body);
      },
    });

    client.activate();
    return () => client.deactivate();
  }, [notifications])
  if (!isOpen) {
    return null;
  }

  return (
    <ul className="notification-dropdown">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <li key={index}>
            <strong>{notification.title}</strong>
            <p>{notification.body}</p>
            <span>{notification.date}</span>
          </li>
        ))
      ) : (
        <li className="no-notifications">No new notifications</li>
      )}
    </ul>
  );
};

export default NotificationDropdown;
