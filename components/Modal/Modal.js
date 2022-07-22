import React, { useRef, useEffect } from 'react';
import styles from './modal.module.scss';

const Modal = ({ data, onModalClose, isModalShow }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const onClick = (e) =>
      modalRef.current.contains(e.target) || (!isModalShow ? onModalClose() : false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <section ref={modalRef} className={styles.wrap}>
      <div className={styles.modalHeaderRow}>
        <h2 className={styles.caption}>Пакеты опций</h2>
        <button onClick={onModalClose} className={styles.closeButton} />
      </div>
      <ul className={styles.list}>
        {data.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Modal;
