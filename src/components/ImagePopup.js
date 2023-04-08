import React from 'react';

function ImagePopup(props) {
    const { onClose, card } = props;
    return (
        <div className={`popup popup_type_card-modal ${card ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    type="button"
                    onClick={onClose} />
                <img
                    alt={card?.name || ""}
                    src={card?.link || "#"}
                    className="popup__image" />
                <h3 className="popup__image-name">{card?.name || ""}</h3>
            </div>
        </div>
    )
}

export default ImagePopup;
