import React, { useContext }  from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards } = props;

    // подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div 
                className="profile__avatar-container" 
                onClick={onEditAvatar}>
                    <img 
                    src={currentUser.avatar} 
                    alt="Аватар профиля" 
                    className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name" name="profile-name">{currentUser.name}</h1>
                    <p className="profile__about" name="profile-about">{currentUser.about}</p>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>

            <section aria-label="Фотосетка">
                <ul className="photo-grid">
                    {cards.map(card => (
                        <Card 
                        key={card._id} 
                        card={card} 
                        onCardClick={onCardClick} 
                        onCardLike ={onCardLike} 
                        onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;