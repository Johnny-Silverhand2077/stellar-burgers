import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { ordersHistory, getUserOrdersLoading, getUserOrdersHistory } from '../../slices/UserOrderHistorySlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getUserOrdersHistory);
  const dispatch = useDispatch()
  const load = useSelector(getUserOrdersLoading)

  useEffect(() => {
    dispatch(ordersHistory())
  },[])

  if(load) {
    return <Preloader />
  }
 
  return <ProfileOrdersUI orders={orders} />;
};
