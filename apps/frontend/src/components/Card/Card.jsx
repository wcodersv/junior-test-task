import React from 'react';
import styles from './Card.module.scss';
import ButtonLike from '../ButtonLike/ButtonLike';

const Card = ({
    id,
    link,
    thumbnail,
    title,
    city,
    price,
    likedCards,
    toggleLike,
}) => (

    <a href={link} className={styles.container} target='_blank' rel="noreferrer">
        {/* <img
                src={thumbnail}
                alt={thumbnail}
                className={styles.container_img}
                width='250px'
                height='250px'
            /> */}
        <picture className={styles.container_img}>
            <source srcSet={thumbnail} type="image/avif" />
            <source srcSet={thumbnail} type="image/webp" />
            <img
                src={thumbnail}
                alt={title}
                width={250}
                height={250}
            />
        </picture>

        <div className={styles.container_content}>
            <div className={styles.container_content_box}>
                <h2 className='description' >{title}</h2>
                <ButtonLike
                    toggleLike={() => toggleLike(id)}
                    isLiked={likedCards.includes(id)}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            <div className={styles.container_content_box}>
                <p className='description'>{city}</p>
                <p className='description'>{price}</p>
            </div>
        </div>
    </a>

)
export default Card;