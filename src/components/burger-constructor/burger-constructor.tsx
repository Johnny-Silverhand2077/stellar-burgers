import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getConstructorItems, getOrderModalData, getOrderRequst, createOrder, clearOrder } from '../../slices/BurgerConstructoSlice';
import { selectUser, selectIsAuthChecked, selectIsAuth, checkUserAuth} from '../../slices/UserInfoSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderRequst)
  const orderModalData = useSelector(getOrderModalData)
  const auth = useSelector(selectIsAuth)

  const onOrderClick = () => {
    if(!auth) {
      return navigate('/login')
    }

    if (!constructorItems.bun || orderRequest) return;

    const order = [
    constructorItems.bun?._id,
    ...constructorItems.ingredients.map((item) => item._id),
    constructorItems.bun?._id
  ].filter(Boolean)

    dispatch(createOrder(order))
  };
 
  const closeOrderModal = () => {
    dispatch(clearOrder())
    navigate('/')
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );


  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
