import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Error from './Error';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext, initialUser } from '../contexts/CurrentUserContext';
import api from '../utils/Api';

function App() {

  // переменная состояния ошибки
  const [errorMessage, setErrorMessage] = React.useState('');

  // переменные состояния видимости попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // переменные состояния открытия попапа карточки
  const [selectedCard, setSelectedCard] = useState(null);

  // переменные состояния пользователя
  const [currentUser, setCurrentUser] = useState(initialUser);

  // переменные состояния карточек
  const [cards, setCards] = useState([]);

  // получаем данные пользователя и карточки с сервера
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка при получении данных: ${err}`);
        setErrorMessage('Произошла ошибка при получении данных');
      })
  }, []);

  // закрываем все попапы
  const closeAllPopups = () => {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  // функции открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // функция лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevCards) => prevCards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка лайка: ${err}`)
      })
  }

  // функция удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter(c => c._id === card._id))
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`)
      })
  };

  // обновление инфо о пользователе
  function handleUpdateUser(userData) {
    api.editUserInfo(userData)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных пользователя: ${err}`)
      })
  };

  // функция обновления аватара
  function handleUpdateAvatar(avatar) {
    api.updateProfileAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара: ${err}`)
      })
  };

  // функция добавления карточки
  function handleAddPlaceSubmit(card) {
    console.log('Submitting new card:', card);
    api.addCard(card)
      .then((newCard) => {
        console.log('New card added:', newCard);
        setCards([newCard, ...cards]);
        closeAllPopups(); 
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`)
      })
    };

  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          buttonText="Да"
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <Footer />
        <Error />
      </CurrentUserContext.Provider>
      {errorMessage && <Error message={errorMessage} />}
    </div>
  );
}

export default App;
