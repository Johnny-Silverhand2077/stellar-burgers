import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../slices/UserInfoSlice';
import { useSelector } from '../../services/store';


export const AppHeader: FC = () => {
    const userName = useSelector(selectUser)
    
    return (
        <>
            <AppHeaderUI userName={userName?.name} />
        </>
    )
};
