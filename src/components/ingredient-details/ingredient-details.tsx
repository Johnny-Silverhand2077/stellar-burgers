import { FC } from 'react';
import { useSelector} from '../../services/store';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientsWirhSelector } from '../../slices/IngredientsSlice';
import styles from '../app/app.module.css'
 
export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredientsWirhSelector)

  const {id} = useParams()

  const ingredientData = ingredients.find((item) => item._id === id)

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div className={styles.detailPageWrap}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
