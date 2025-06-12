import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { TLoginData } from '@api';
import { useDispatch } from '../../services/store';
import { loginUser, selectIsAuth } from '../../slices/UserInfoSlice'
import {useSelector} from '../../services/store' 

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  if(isAuth) {
    return <Navigate to={'/'} />
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userLogin: TLoginData = {
      email: email,
     password: password,
    }
    dispatch(loginUser(userLogin))
  };
  

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
