import React from 'react';
import Header from './Header'
import { useState } from 'react';
import logo from '../images/logo.svg';
import profileImage from '../images/profile.svg';

function App() {
  // устанавливаем автоматическое изменение даты с помощью экземпляра Dateи его метода
  const currentYear = new Date().getFullYear();

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  return (

<div className="page">
  <Header />
  
  {/* main */}
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={profileImage} alt="Аватар профиля" className="profile__avatar" name="avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name" name="profile-name">Жак-Ив Кусто</h1>
          <p className="profile__about" name="profile-about">Исследователь океана</p>
          <button className="profile__edit-button" type="button"></button>
        </div>
        <button className="profile__add-button" type="button"></button>
      </section>
  
      <section aria-label="Фотосетка">
        <ul className="photo-grid">
        </ul>
      </section>
    </main>

  {/* footer */}
  <footer className="footer">
    <p className="footer__copyright">&copy; {currentYear} Mesto Russia</p>
  </footer>
  {/*error message to catch server errors*/}
  <p id="error-message"></p>

  {/*profile edit popup*/}
  <div className="popup popup_type_edit-profile">
    <div className="popup__container">
      <button className="popup__close-button" type="button"></button>
      <h3 className="popup__heading">Редактировать профиль</h3>
      <form action="/" className="popup__form" name="edit-profile" id="edit-profile" noValidate>
        <input 
        type="text" 
        className="popup__input popup__input_type_name" 
        id="profile-name" name="name" 
        required 
        minLength="2" 
        maxLength="40" 
        value={inputValue} 
        onChange={handleInputChange} 
        placeholder="Имя" />
        <span className="popup__error profile-name-error"></span>
        <input 
        type="text" 
        className="popup__input popup__input_type_about" 
        id="profile-about" 
        name="about" 
        required 
        value={inputValue} 
        onChange={handleInputChange}  
        minLength="2" 
        maxLength="200" 
        placeholder="О себе" />
        <span className="popup__error profile-about-error"></span>
        <button className="popup__submit-button" type="submit">Сохранить</button>
      </form>
    </div>
  </div>

  {/* add-card popup */}
  <div className="popup popup_type_add-card">
    <div className="popup__container">
      <button className="popup__close-button" type="button"></button>
      <h3 className="popup__heading">Новое место</h3>
      <form action="/" className="popup__form" name="add-card" id="add-card" noValidate>
        <input type="text" className="popup__input popup__input_type_card-name" id="card-name" name="name" required minLength="2" maxLength="30" placeholder="Название" />
        <span className="popup__error card-name-error"></span>
        <input type="url" className="popup__input popup__input_type_image-src" id="url" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__error url-error"></span>
        <button className="popup__submit-button" type="submit">Создать</button>
      </form>
    </div>
  </div>

  {/* confirm popup */}
  <div className="popup popup_type_confirm">
    <div className="popup__container">
      <button className="popup__close-button" type="button"></button>
      <h3 className="popup__heading">Вы уверены?</h3>
      <form action="/" className="popup__form" name="confirm" id="confirm" noValidate>
        <button className="popup__submit-button" type="submit">Да</button>
      </form>
    </div>
  </div>

  {/* update avatar popup */}
  <div className="popup popup_type_avatar">
    <div className="popup__container">
      <button className="popup__close-button" type="button"></button>
      <h3 className="popup__heading">Обновить аватар</h3>
      <form action="/" className="popup__form popup__form-avatar" name="avatar" id="avatar" noValidate>
        <input type="url" className="popup__input popup__input_type_avatar" id="urlav" name="url" placeholder="Ссылка на картинку" required />
        <span className="popup__error urlav-error"></span>
        <button className="popup__submit-button" type="submit">Сохранить</button>
      </form>
    </div>
  </div>

  {/* card-zoom */}
  <div className="popup popup_type_card-modal">
    <div className="popup__container">
      <button className="popup__close-button" type="button"></button>
      <img alt="" src="#" className="popup__image" />
      <h3 className="popup__image-name">Фото</h3>
    </div>
  </div>

  {/* photo-grid-template */}
  <template id="photo-grid-template">
    <li className="photo-grid__item card-element">
      <button className="photo-grid__delete-button" type="button"></button>
      <img alt="" src={logo} className="photo-grid__image" id="photo-grid__image" />
      <div className="photo-grid__item-description">
        <h2 className="photo-grid__item-name">Название картинки</h2>
        <div className="photo-grid__like">
          <button className="photo-grid__like-button" type="button"></button>
          <div className="photo-grid__like-count"></div>
        </div>
      </div>
    </li>
  </template>
  </div>
  );
}

export default App;
