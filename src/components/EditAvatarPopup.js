import React, { useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {

    const { isOpen, onClose, onUpdateAvatar } = props;

    const currentUser = useContext(CurrentUserContext);

    const avatarRef = useRef(currentUser.avatar);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText="Сохранить"
        children={
          <div className="popup__form">
            <input
              type="url"
              className="popup__input popup__input_type_avatar"
              id="urlav"
              name="url"
              placeholder="Ссылка на картинку"
              required
              ref={avatarRef} />
            <span className="popup__error urlav-error"></span>
          </div>
        }
      />
    )
}

export default EditAvatarPopup;
