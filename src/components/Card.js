import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const { card, onCardClick, onCardLike, onCardDelete } = props;

    // подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    // определяем, являемся ли мы владельцем карточки
    const isOwn = card.owner._id === currentUser._id;

    // определяем постановку нами лайка карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    // определяем класс для кнопки лайка
    const cardLikeButtonClassName = `photo-grid__like-button ${isLiked ? 'photo-grid__like-button_active' : ''
        }`;

    // определяем класс для удаления карточки
    const cardDeleteButtonClassName = `photo-grid__delete-button ${isOwn ? 'photo-grid__delete-button_active' : ''
        }`;

    const handleCardClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    return (
        <li className="photo-grid__item card-element">
            {isOwn && (<button
                className={cardDeleteButtonClassName}
                type="button"
                onClick={handleDeleteClick} />)}
            <img
                alt={card.name}
                src={card.link}
                className="photo-grid__image"
                onClick={handleCardClick} />
            <div className="photo-grid__item-description">
                <h2 className="photo-grid__item-name">{card.name}</h2>
                <div className="photo-grid__like">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick} />
                    <div className="photo-grid__like-count">{card.likes.length}</div>
                </div>
            </div>
        </li>
    )
}

export default Card;