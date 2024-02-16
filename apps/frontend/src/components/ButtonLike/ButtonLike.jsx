import React from 'react';
import './ButtonLike.css';
import LikeIcon from './LikeIcon';
import DislikeIcon from './DislikeIcon';

const ButtonLike = ({ onClick, toggleLike, isLiked }) => (
    <div
        className='btn'

        onClick={(e) => {
            e.preventDefault();
            toggleLike();
            if (onClick) {
                onClick(e);
            }
        }}
        onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                toggleLike();
            }
        }}

        role="button"
        tabIndex={0}
    >
        {isLiked ? <LikeIcon /> : <DislikeIcon />}
    </div>
)

export default ButtonLike;
