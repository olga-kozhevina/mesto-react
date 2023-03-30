import React from 'react';
import Card from './Card';
import Error from './Error';
import api from '../utils/Api';

function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick } = props;

    // переменные состояния карточек
    const [cards, setCards] = React.useState([]);

    //  переменные состояния данных пользователя
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');

    // переменная состояния ошибки
    const [errorMessage, setErrorMessage] = React.useState('');

    // получаем данные пользователя и карточки с сервера
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
                setCards(cards);
            })
            .catch((err) => {
                console.log(`Ошибка при получении данных: ${err}`);
                setErrorMessage('Произошла ошибка при получении данных');
            })
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img src={userAvatar} alt="Аватар профиля" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name" name="profile-name">{userName}</h1>
                    <p className="profile__about" name="profile-about">{userDescription}</p>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>

            <section aria-label="Фотосетка">
                <ul className="photo-grid">
                    {cards.map(card => (
                        <Card key={card._id} card={card} onCardClick={onCardClick} />
                    ))}
                </ul>
            </section>
            {errorMessage && <Error message={errorMessage} />}
        </main>
    )
}

export default Main;