import React from 'react';

function Card(props) {
    const { card, onCardClick } = props;

    const handleCardClick = () => {
        onCardClick(card);
    };

    return (
        <li className="photo-grid__item card-element">
            <button className="photo-grid__delete-button" type="button" />
            <img alt={card.name} src={card.link} className="photo-grid__image" onClick={handleCardClick} />
                <div className="photo-grid__item-description">
                    <h2 className="photo-grid__item-name">{card.name}</h2>
                    <div className="photo-grid__like">
                        <button className="photo-grid__like-button" type="button" />
                        <div className="photo-grid__like-count">{card.likes.length}</div>
                    </div>
                </div>
        </li>
    )
}

export default Card;