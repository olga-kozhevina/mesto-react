import { createContext } from 'react';
import avatar from '../images/profile.svg';

export const CurrentUserContext = createContext(null);

export const initialUser = {
    name: 'Жак Ив Кусто',
    about: 'Исследователь океана',
    avatar: avatar
}
