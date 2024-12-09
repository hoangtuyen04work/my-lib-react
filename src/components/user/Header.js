import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

import { useNavigate, useLocation } from 'react-router-dom';

import NotificationDropdown from './NotificationDropdown';
import '../../styles/user/Header.scss';

import { logout } from '../../service/authService';
import { useSelector, useDispatch } from 'react-redux';
import { doLogout, search, offSearch } from '../../redux/action/userAction';
import { numberNotifications } from '../../redux/action/userAction';

import { fetchAllBookType } from '../../service/userApiService';
const Header = ({ onCategoryChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchContent, setSearchContent] = useState('');
  const [listCategory, setListCategory] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const numberNotification = useSelector((state) => state.user.numberNotifications);
  const token = useSelector((state) => state.user.user.token);
  const refreshToken = useSelector((state) => state.user.user.refreshToken);
  const userId = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();

  const handleSearchSubmit = async () => {
    if (searchContent.trim() !== "") {
      dispatch(search(searchContent));
    } else {
    }
  };

  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchContent(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    if (isDropdownOpen === false) {
      dispatch(numberNotifications(0))
    }
  };

  const handleClick = () => {
    dispatch(offSearch());
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
        setListCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllType();
  }, [numberNotification]);



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
          value={searchContent}
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
          {numberNotification > 0 && (
            <span className="notification-count">{numberNotification}</span>
          )}
        </button>

        <NotificationDropdown
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
