'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/global.css';
import styles from './AdsList.module.scss';
import Loader from '../Loader/Loader';
import ModalFilters from '../ModalFilters/ModalFilters';
import Card from '../Card/Card';

const AdsList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const likedCard = JSON.parse(localStorage.getItem("likedCards") ?? "[]");
    const [likedCards, setLikedCards] = useState(likedCard);

    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        city: '',
        district: '',
        search: '',
    });


    useEffect(() => {
        const fetchAds = async () => {
            try {
                setLoading(true);

                const adsPromise = axios.get('/api/ads');
                const dataFetch = await toast.promise(
                    adsPromise,
                    {
                        error: 'Error 🤯'
                    }
                );

                setData(dataFetch.data.results);
            } catch (error) {
                toast.error('Error fetching ads');
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    const handleOpenFilter = () => {
        setIsOpenFilter(!isOpenFilter);
    }

    const toggleLike = (id) => {
        setLikedCards(prevLikedCards => {
            if (prevLikedCards.includes(id)) {
                return prevLikedCards.filter(cardId => cardId !== id);
            }
            return [...prevLikedCards, id];
        });
    }


    const handleFilterSearch = async (e) => {
        e.preventDefault();

        const filterParams = {
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            city: filters.city,
            district: filters.district,
            search: filters.search,
        };


        const nonEmptyParams = Object.fromEntries(
            Object.entries(filterParams).filter(([, value]) => value !== '')
        );

        try {
            const response = await axios.get('/api/ads', {
                params: nonEmptyParams,
            });

            toast.success('Filter applied successfully!');
            setData(response.data.results);

            setIsOpenFilter(false);
            return response.data.results;
        } catch (error) {
            toast.error('Error applying filter. Please try again.');
            return null;
        }
    }


    useEffect(() => {
        localStorage.setItem('likedCards', JSON.stringify(likedCards));
    }, [likedCards]);

    return (
        <div className='container-body'>
            {loading ? <Loader /> : (
                <div className={styles.container}>
                    <ToastContainer />
                    <div className={styles.container_header}>
                        <h1>List of ads</h1>
                        <button
                            type='button'
                            onClick={handleOpenFilter}
                            className='button-custom'
                        >
                            Filters
                        </button>

                        {isOpenFilter && <ModalFilters
                            handleOpenFilter={handleOpenFilter}
                            handleFilterSearch={handleFilterSearch}

                            filters={filters}
                            setFilters={setFilters}
                        />}

                    </div>

                    <div className={styles.container_list}>
                        {data.map(card => (
                            <Card
                                id={card.id}
                                link={`/ads/${card.id}`}
                                thumbnail={card.images[0].thumbnail}
                                title={card.title}
                                city={card.city_name}
                                price={card.price}
                                key={card.id}
                                likedCards={likedCards}
                                toggleLike={toggleLike}
                            />
                        ))}

                    </div>
                </div>
            )}
        </div>)
}

export default AdsList;