/* eslint no-console: "error" */

'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AdDetails.module.scss';
import Loader from '../Loader/Loader';
import ButtonLike from '../ButtonLike/ButtonLike';
import Carousel from '../Carousel/Carousel';

const AdDetails = ({ adId }) => {
    const [likedCards, setLikedCards] = useState(() => JSON.parse(localStorage.getItem("likedCards") ?? "[]"));
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchAds = async () => {
            try {
                setLoading(true);

                const adsPromise = axios.get(`/api/ads/${adId}`);
                const response = await toast.promise(
                    adsPromise,
                    {
                        error: 'Error 🤯'
                    }
                );


                setData(response.data);
            } catch (error) {
                toast.error('Error fetching ads');
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [adId]);

    const toggleLike = (id) => {
        setLikedCards((prevLikedCards) => {
            if (prevLikedCards.includes(id)) {
                return prevLikedCards.filter((cardId) => cardId !== id);
            }
            return [...prevLikedCards, id];
        });
    };

    useEffect(() => {
        localStorage.setItem('likedCards', JSON.stringify(likedCards));
    }, [likedCards]);


    return (
        <>
            {loading ?
                (
                    <div className='container-body'>
                        <Loader />
                    </div>
                ) :
                (<div className={styles.container}>

                    <div className={styles.container_carousel}>
                        <Carousel images={data.images} />
                    </div>

                    <div className={styles.container_content}>
                        <div className={styles.container_content_header}>
                            <h1 className='header-title'>{data.title}</h1>
                            <ButtonLike
                                toggleLike={() => toggleLike(+adId)}
                                isLiked={likedCards.includes(+adId)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <p className={`${styles.container_content_city} description`}>{`${data.city_name}, ${data.district_name}`}</p>
                            <p className={`${styles.container_content_price} description`}>{`${data.price} ฿`}</p>
                        </div>
                        <div className='description'>
                            {/*  eslint-disable react/no-danger */}
                            <div dangerouslySetInnerHTML={{ __html: data.description }} />
                        </div>
                    </div>

                </div>)
            }


            < ToastContainer />
        </>
    )
}

export default AdDetails;
