import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatarRef = useRef(null);


  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
    }
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
            ref={avatarRef} />
          <span className="popup__error urlav-error"></span>
        </div>
      }
    />
  )
}

export default EditAvatarPopup;
