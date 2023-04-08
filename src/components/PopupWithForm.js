import React from 'react';

function PopupWithForm(props) {
    const { title, name, buttonText, children, isOpen, onClose, onSubmit } = props;

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button 
                className="popup__close-button" 
                type="button" 
                onClick={onClose}></button>
            <h3 className="popup__heading">{title}</h3>
            <form
            className="popup__form" 
            name={name} 
            onSubmit={onSubmit} 
            onClick={() => console.log("Submit button clicked!")}
            noValidate>
                {children}
                <button 
                className="popup__submit-button" 
                type="submit" onClick={onClose}>{buttonText}</button>
            </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
