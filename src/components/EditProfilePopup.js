import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const { isOpen, onClose } = props;

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [about, setAbout] = useState(currentUser.about);

    function handleName(evt) {
        setName(evt.target.value);
    }

    function handleAbout(evt) {
        setAbout(evt.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name, 
            about
        });
    }

    return (
        <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText="Сохранить"
        children={
          <div className="popup__form">
            <input
              type="text"
              className="popup__input popup__input_type_name"
              id="profile-name"
              name="name"
              required
              minLength="2"
              maxLength="40"
              placeholder="Имя" 
              value={name} 
              onChange={handleName} />
            <span className="popup__error profile-name-error"></span>
            <input
              type="text"
              className="popup__input popup__input_type_about"
              id="profile-about"
              name="about"
              required
              minLength="2"
              maxLength="200"
              placeholder="О себе" 
              value={about} 
              onChange={handleAbout} />
            <span className="popup__error profile-about-error"></span>
          </div>
        }
      />
    )
}

export default EditProfilePopup;
