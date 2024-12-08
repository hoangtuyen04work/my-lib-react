import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/register.scss';
import { useDispatch , useSelector} from "react-redux";
import { doLogin } from '../redux/action/userAction';
import { refresh } from '../service/authService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state)=>state?.user?.isAuthenticated)
  const roles = useSelector((state) => state?.user?.user?.roles)
  const refreshToken = useSelector((state) => state?.user?.user?.refreshToken)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('multipartFile', file);
    formData.append('roles', roles);  // Giả sử roles là danh sách
    try {
      const response = await axios.post('http://localhost:8888/lib/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(doLogin(response))
      if (isAuthenticated) {
        if (roles.some((role) => role.roleName === 'ADMIN')) {
          navigate('/admin/home');
        } else {
          navigate('/home');
        }
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error) {
      setError('Đăng ký không thành công.');
    }
  };
  const checkPreSignup = async () => {
    if (refreshToken) {
      try {
        const response = await refresh(refreshToken);
        dispatch(doLogin(response))
        if (isAuthenticated) {
          if (roles.some((role) => role.roleName === 'ADMIN')) {
            navigate('/admin/home');
          } else {
            navigate('/home');
          }
        } else {
          setError('Authentication failed. Please try again.');
        }
      } catch (error) {
        console.log(error);
        setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      }
    }
  };
  useEffect(() => {
    checkPreSignup();
  }, [])

  return (
    <div className="register-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input type="file" onChange={handleFileChange} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Đăng ký</button>
      </form>
      <p>Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
    </div>
  );
};

export default Register;
