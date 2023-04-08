import React, { useContext, useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {

  const { isOpen, onClose, onUpdateAvatar } = props;
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState('');
  const avatarRef = useRef(null);

  useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    setAvatar('');
  }, [isOpen]);

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
            value={avatar}
            onChange={(evt) => setAvatar(evt.target.value)}
            ref={avatarRef} />
          <span className="popup__error urlav-error"></span>
        </div>
      }
    />
  )
}

export default EditAvatarPopup;
