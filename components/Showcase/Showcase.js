import React from 'react';
import styles from './showcase.module.scss';
import Card from '../Card/Card.js';

const Showcase = ({ cars }) => {
  return (
    <section className={styles.container}>
      <section className={styles.wrap}>
        {cars.map((item) => (
          <Card key={item._id} data={item} />
        ))}
      </section>
    </section>
  );
};

export default Showcase;
