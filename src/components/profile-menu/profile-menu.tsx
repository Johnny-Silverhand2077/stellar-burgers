import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../slices/UserInfoSlice';
import { useDispatch } from '../../services/store';
import { error } from 'console';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/')
    } catch {
      console.error('Неудолось выйти из системы', error)
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
