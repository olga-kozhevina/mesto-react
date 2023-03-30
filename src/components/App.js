import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Error from './Error';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  // переменные состояния видимости попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  // переменные состояния открытия попапа карточки
  const [selectedCard, setSelectedCard] = React.useState(null);

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

  return (

    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
        children={
          <div className="popup__form">
            <input type="text" className="popup__input popup__input_type_name" id="profile-name" name="name" required minLength="2" maxLength="40" placeholder="Имя" />
            <span className="popup__error profile-name-error"></span>
            <input type="text" className="popup__input popup__input_type_about" id="profile-about" name="about" required minLength="2" maxLength="200" placeholder="О себе" />
            <span className="popup__error profile-about-error"></span>
          </div>
        }
      />

      <PopupWithForm
        title="Новое место"
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText="Создать"
        children={
          <div className="popup__form">
            <input type="text" className="popup__input popup__input_type_card-name" id="card-name" name="name" required minLength="2" maxLength="30" placeholder="Название" />
            <span className="popup__error card-name-error"></span>
            <input type="url" className="popup__input popup__input_type_image-src" id="url" name="link" required placeholder="Ссылка на картинку" />
            <span className="popup__error url-error"></span>
          </div>
        }
      />

      <PopupWithForm
        title="Вы уверены?"
        name="confirm"
        buttonText="Да"
      />

      <PopupWithForm 
      title="Обновить аватар"
      name="avatar"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      buttonText="Сохранить"
      children={
        <div className="popup__form">
        <input type="url" className="popup__input popup__input_type_avatar" id="urlav" name="url" placeholder="Ссылка на картинку" required />
        <span className="popup__error urlav-error"></span>
        </div>
      }
      />

      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
      />

      <Footer />
      <Error />

    </div>
  );
}

export default App;
