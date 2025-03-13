import React, { useEffect } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../actions/UserAction'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.userSignin);
  const { userInfo, error } = user;

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  });

  return (
    <div class="login-page">
      <h2> ĐĂNG NHẬP </h2>
      <form onSubmit={handleSubmit(onSubmit)} class="form-login">
        <input {...register("email")} placeholder="Email" 
        {...register("email", {
          required: "Bạn phải nhập vào email",
          pattern: {  
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Email không hợp lệ",
          },
        })}
        
        />
      {errors.email && <span class="text-red text-sm">{errors.email.message}</span>}
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          {...register('password', {
            required: 'Bạn phải nhập vào mật khẩu',
          })}
        />
      {errors.password && <span class="text-red text-sm">{errors.password.message}</span>}
        <input type="submit" value="Đăng Nhập"></input>
        {error ? <h2>{error}</h2> : <></>}
        <Link to="/register">Tạo tài khoản?</Link>
      </form>
    </div>
  );
}

export default Login;