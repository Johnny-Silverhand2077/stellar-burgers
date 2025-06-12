import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '../../services/store';
import { RegisterUI } from '@ui-pages';
import { TRegisterData } from '@api';
import { registerUser } from '../../slices/UserInfoSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newUser: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };
    dispatch(registerUser(newUser))
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
