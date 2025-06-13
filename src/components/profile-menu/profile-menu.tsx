import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../slices/UserInfoSlice';
import { useDispatch } from '../../services/store';


export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/')
    } catch (err) {
      console.error('Неудолось выйти из системы', err)
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
