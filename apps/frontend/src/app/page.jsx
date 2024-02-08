'use client'

import axios from 'axios';
import React, { useEffect } from 'react';
import styles from './index.module.scss';

const fetchAds = async () => {
  const { data } = await axios.get('/api/ads?minPrice=1000000');
  console.log(data);
  return data;
}

const Index = () => {
  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className={styles.container}>
      <h1>And here it starts...</h1>
    </div>
  );
}

export default Index;
