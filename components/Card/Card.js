import React, { useState, useEffect } from 'react';
import styles from './card.module.scss';
import Image from 'next/image';
import CarImage from '../../assets/images/car.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UAParser from 'ua-parser-js';
import moment from 'moment';
import Modal from '../Modal/Modal';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 83,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 83,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 66,
  },
};

const Card = ({ data }) => {
  const parser = new UAParser();
  let userAgent = [];
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || 'desktop';

  const [isCarouselHover, setCarouselHover] = useState(false);
  const [isModalShow, setModalShow] = useState(false);

  useEffect(() => {
    userAgent = navigator.userAgent;
  }, []);

  const onPacketButtonClick = () => {
    setModalShow((prev) => !prev);
  };

  const onModalClose = () => {
    setModalShow(false);
  };

  return (
    <article
      className={styles.container}
      onMouseEnter={() => setCarouselHover(true)}
      onMouseLeave={() => setCarouselHover(false)}>
      <h1 className={styles.title}>
        {data.feedData.modelName}
        <sup>{moment(Date.parse(data.feedData.productionDate)).format('YYYY')}</sup>
      </h1>
      <p className={styles.vendorCode}>{data.feedData.vin}</p>
      <Carousel
        ssr
        arrows={isCarouselHover}
        infinite={false}
        responsive={responsive}
        deviceType={deviceType}
        partialVisible
        removeArrowOnDeviceType={['mobile']}
        focusOnSelect={true}
        containerClass={styles.imagesCarousel}
        itemClass={styles.imagesCarouselItem}>
        <Image src={CarImage} alt="car" width={264} height={198} />
        <Image src={CarImage} alt="car" width={264} height={198} />
      </Carousel>

      <div className={styles.descriptionList}>
        {data.feedData.engineCapacity && data.feedData.enginePower && data.feedData.engineType && (
          <div className={styles.descriptionItem}>
            <p className={styles.descriptionTitle}>Двигатель</p>
            <p className={styles.descriptionValue}>
              {`${Math.round(data.feedData.engineCapacity / 1000)} л / 
              ${data.feedData.enginePower} лс /
              ${data.feedData.engineType}`}
            </p>
          </div>
        )}
        {data.feedData.transmission && (
          <div className={styles.descriptionItem}>
            <p className={styles.descriptionTitle}>КПП</p>
            <p className={styles.descriptionValue}>{data.feedData.transmission}</p>
          </div>
        )}

        <div className={styles.descriptionItem}>
          <p className={styles.descriptionTitle}>Пробег</p>
          <p className={styles.descriptionValue}>{data.feedData.autoProbeg.toLocaleString()} км</p>
        </div>
        {data.feedData.color && (
          <div className={styles.descriptionItem}>
            <p className={styles.descriptionTitle}>Цвет</p>
            <p className={styles.descriptionValue}>
              {data.feedData.color[0]?.toUpperCase() + data.feedData.color.slice(1).toLowerCase()}
            </p>
          </div>
        )}

        {data.feedData.standartEquipment && (
          <div className={styles.descriptionItem}>
            <p className={styles.descriptionTitle}>Пакеты</p>
            <p className={styles.descriptionValue}>
              <span>{data.feedData.standartEquipment?.eqipment[0].name}</span>
              <button onClick={onPacketButtonClick}>{`(+ ещё ${
                data.feedData.standartEquipment?.eqipment.length - 1
              } пакета)`}</button>
            </p>
          </div>
        )}
      </div>
      <div className={styles.footerRow}>
        <div className={styles.priceWrap}>
          <p className={styles.price}>
            <span>{data.feedData.autoPrice.toLocaleString()}</span>₽
          </p>
          <p className={styles.additionalPrice}>
            Доп. опции на <span>999 999</span> ₽
          </p>
        </div>
        <div className={styles.footerRowButtons}>
          <span className={styles.heart}></span>
          <button className={styles.buyButton}>Купить</button>
        </div>
      </div>
      {isModalShow && (
        <Modal
          data={data.feedData.standartEquipment?.eqipment}
          onModalClose={onModalClose}
          isModalShow={isModalShow}
        />
      )}
    </article>
  );
};

export default Card;
