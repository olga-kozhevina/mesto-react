import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const { isOpen, onClose, onAddPlace } = props;

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleName(evt) {
        setName(evt.target.value);
    }

    function handleLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name, link
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Создать"
            children={
                <div className="popup__form">
                    <input
                        type="text"
                        className="popup__input popup__input_type_card-name"
                        id="card-name"
                        name="name"
                        required
                        minLength="2"
                        maxLength="30"
                        placeholder="Название"
                        value={name}
                        onChange={handleName} />
                    <span className="popup__error card-name-error"></span>
                    <input
                        type="url"
                        className="popup__input popup__input_type_image-src"
                        id="url"
                        name="link"
                        required
                        placeholder="Ссылка на картинку"
                        value={link}
                        onChange={handleLink} />
                    <span className="popup__error url-error"></span>
                </div>
            }
        />
    )
}

export default AddPlacePopup;
