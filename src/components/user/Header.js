import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

import { useNavigate, useLocation } from 'react-router-dom';
import { Client } from '@stomp/stompjs';

import NotificationDropdown from './NotificationDropdown';
import '../../styles/user/Header.scss';
import SockJS from 'sockjs-client';
import { logout } from '../../service/authService';
import { useSelector, useDispatch } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';

import { fetchAllBookType } from '../../service/userApiService';
const Header = ({ onCategoryChange, onSearchChange }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [listCategory, setListCategory] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [numberNotification, setNumberNotification] = useState(1);
  const token = useSelector((state) => state.user.user.token);
  const refreshToken = useSelector((state) => state.user.user.refreshToken);
  const userId = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();

  // Handle search submit when the search icon is clicked
  const handleSearchSubmit = async () => {
    if (search.trim() !== "") {
      try {
        const response = await axios.get(`http://localhost:8888/lib/search/search?name=${search}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        onSearchChange(response.data.data.content); // Pass search results to parent component
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      onSearchChange([]); // Reset search results when search input is empty
    }
  };

  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClick = () => {
    if (location.pathname === '/home') {
      window.location.reload();
    } else {
      navigate('/home');
    }
  };

  const handleLogout = () => {
    logout(token, refreshToken);
    dispatch(doLogout());
    navigate('/login');
  }


  useEffect(() => {
    const getAllType = async () => {
      try {
        const response = await fetchAllBookType(token);
        setListCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllType();

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
          console.log("data", notificationReceive.data)
          setNotifications((prev) => [...prev, notificationReceive.data]);
        });
      },
      onStompError: (frame) => {
        console.error(`Broker error: ${frame.headers['message']}`, frame.body);
      },
    });

    client.activate();
    return () => client.deactivate();
  }, []);

  return (
    <header className="header">
<div className="logo" onClick={handleClick}>
      Library
    </div>
      <select className="category-select" onChange={handleCategoryChange}>
        <option value="0">All Categories</option>
        {listCategory.length > 0 ? (
          listCategory.map(category => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))
        ) : (
          <option disabled>Loading categories...</option>
        )}
      </select>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={handleSearchInputChange}
          className="search-bar"
        />
        <button className="search-btn" onClick={handleSearchSubmit}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
      </div>

      <div className="user-controls">
        <button className="notification-btn" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faBell} />
          {numberNotification.length > 0 && (
            <span className="notification-count">{numberNotification.length}</span>
          )}
        </button>

        <NotificationDropdown notifications={notifications}
          isOpen={isDropdownOpen}
        />

        <button className="profile-btn" onClick={() => window.location.href = '/profile'}>
          My Profile
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
