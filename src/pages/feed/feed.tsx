import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {useSelector, useDispatch} from '../../services/store'
import { getFeedData, getFeedOrders, getLoading } from '../../slices/FeedDataSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch()
  const loading = useSelector(getLoading)

  const orders: TOrder[] = useSelector(getFeedOrders)

  useEffect(() => {
    dispatch(getFeedData()).then((result) => {})
  }, [dispatch])

  

  if (!orders.length || loading) {
    return <Preloader />;
  }
const handleGetAllOrders = () => {
  dispatch(getFeedData())
}


 return ( <FeedUI orders={orders} handleGetFeeds={handleGetAllOrders} /> )
};
