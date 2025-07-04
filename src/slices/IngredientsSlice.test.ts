import ingredientsSlice, {getIngredients, TStateIngredient} from "./IngredientsSlice";
import { error } from "console";

const initialState: TStateIngredient = { 
    ingredients: [],
    loading: false,
    error: null
}

const ingredientTest = [
    {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
]

describe('Тесты ingredientsSlice', () => {
    it('Тест установки загрузку на значение true и err на значение null во время состояния ожидания', () => {
        const actualState= ingredientsSlice.reducer(
            {   ...initialState,
                error: 'Ошибка теста'
            },
            getIngredients.pending('')
        )

        expect(actualState).toEqual({
            ingredients: [],
            loading: true,
            error: null
        })
    })

    it('Тест установки загрузки на значение false и обновить ингредиенты', () => {
        const actualState= ingredientsSlice.reducer(
            {   ...initialState,
                loading: true
            },
            getIngredients.fulfilled(ingredientTest, '')
        )

        expect(actualState).toEqual({
            ingredients: ingredientTest,
            loading: false,
            error: null
        })
    })

    it('Тест установки загрузки на значение false и сообщение об ошибке error', () => {
        const errorTest = new Error('Ошибка теста')

        const actualState= ingredientsSlice.reducer(
            {   ...initialState,
                loading: true
            },
            getIngredients.rejected(errorTest, '')
        )

        expect(actualState).toEqual({
            ingredients: [],
            loading: false,
            error: 'Ошибка теста'
        })
    })
})
