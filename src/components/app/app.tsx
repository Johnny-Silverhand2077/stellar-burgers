import { useEffect } from 'react';
import { useDispatch} from '../../services/store';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Profile,
  ProfileOrders,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from '../protect-route/protected-route';
import { AppDispatch } from '../../services/store';
import { getIngredients } from '../../slices/IngredientsSlice';
import { userApi } from '../../slices/UserInfoSlice';
import { checkUserAuth } from '../../slices/UserInfoSlice'


const App = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const locationState = location.state as {background?: Location}
  const backgroundLocation = locationState && location.state?.backgroundLocation;

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  useEffect(() => {
    dispatch(checkUserAuth())
  },[dispatch])


  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute >
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredoents/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/order/:number'
            element={
              <ProtectedRoute >
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
