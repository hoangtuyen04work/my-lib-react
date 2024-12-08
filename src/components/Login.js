import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';
import { login, refresh } from '../service/authService'
import { doLogin } from '../redux/action/userAction';
import { useDispatch , useSelector} from "react-redux";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.user.user.roles)
  const refreshToken = useSelector((state) => state.user.user.refreshToken)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      dispatch(doLogin(response))
      if (response.data.code === 200) {
        if (roles.some((role) => role.roleName === 'ADMIN')) {
          navigate('/admin/home');
        } else {
          navigate('/home');
        }
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error) {
      setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    }
  };

  const checkPreLogin = async () => {
    if (refreshToken) {
      try {
        const response = await refresh(refreshToken);
        dispatch(doLogin(response))
        if (response.data.code === 200) {
          if (roles.some((role) => role.roleName === 'ADMIN')) {
            navigate('/admin/home');
          } else {
            navigate('/home');
          }
        } 
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false); // Mark loading as complete
  };
  useEffect(() => {
    checkPreLogin();
    setError();
  }, []);


  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }
  else return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a></p>
    </div>
  );
};

export default Login;
