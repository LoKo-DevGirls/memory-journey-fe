import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from '../styles/Research.module.scss';

const imageAssets = [
  {
    title: '1',
    width: 2000,
    height: 1333,
  },
  {
    title: '2',
    width: 2000,
    height: 1333,
  },
  {
    title: '3',
    width: 2000,
    height: 1555,
  },
  {
    title: '4',
    width: 2000,
    height: 1333,
  },
  {
    title: '5',
    width: 2000,
    height: 1600,
  },
  {
    title: '6',
    width: 2000,
    height: 1333,
  },
  {
    title: '7',
    width: 2000,
    height: 1429,
  },
  {
    title: '8',
    width: 2000,
    height: 1333,
  },
  {
    title: '9',
    width: 2000,
    height: 1566,
  },
  {
    title: '10',
    width: 2000,
    height: 1353,
  },
  {
    title: '11',
    width: 2000,
    height: 1333,
  },
  {
    title: '12',
    width: 2000,
    height: 1603,
  },
  {
    title: '13',
    width: 1564,
    height: 2000,
  },
  {
    title: '14',
    width: 2000,
    height: 1353,
  },
  {
    title: '15',
    width: 1333,
    height: 2000,
  },
  {
    title: '16',
    width: 1333,
    height: 2000,
  },
  {
    title: '17',
    width: 1333,
    height: 2000,
  },
  {
    title: '18',
    width: 2000,
    height: 1264,
  },
  {
    title: '19',
    width: 2000,
    height: 1333,
  },
  {
    title: '20',
    width: 1333,
    height: 2000,
  },
  {
    title: '21',
    width: 2000,
    height: 1534,
  },
  {
    title: '22',
    width: 2000,
    height: 1304,
  },
  {
    title: '23',
    width: 1333,
    height: 2000,
  },{
    title: '24',
    width: 2000,
    height: 1868,
  },
  {
    title: '25',
    width: 2000,
    height: 1333,
  },
  {
    title: '26',
    width: 2000,
    height: 1333,
  },
  {
    title: '27',
    width: 2000,
    height: 1601,
  }
]
const LazyImage = ({ image, className } : any) => (
  <div className={`${styles.picture} ${className ? className : ''}`}>
    <picture>
      <source srcSet={`/images/${image.title}.webp`} type="image/webp" />
      <LazyLoadImage
        src={`/images/${image.title}.jpg`}
        alt={image.title}
        height={image.height}
        width={image.width}
      />
    </picture>
  </div>
);

const Picture = ({ image, className }: any) => (
  <div className={`${styles.picture} ${className ? className : ''}`}>
    <picture>
      <source srcSet={`/images/${image.title}.webp`} type="image/webp" />
      <source srcSet={`/images/${image.title}.jpg`} type="image/jpeg"/>
      <img
        src={`/images/${image.title}.jpg`}
        alt={image.title}
        height={image.height}
        width={image.width}
       />
    </picture>
  </div>
)

function Research() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          <div className={`${styles.colSt1} ${styles.colE5} ${styles.rowSt1} ${styles.rowE2} ${styles.flexCol}`}>
            <LazyImage image={imageAssets[25]} />
            <LazyImage image={imageAssets[5]} />
          </div>
          <LazyImage image={imageAssets[2]} className={`${styles.colSt6} ${styles.colE13}`} />
          
          <div className={`${styles.rowSt2} ${styles.rowE3}`}>
            <LazyImage image={imageAssets[3]} className={styles.gridLarge} />
            <LazyImage image={imageAssets[3]} className={styles.gridMid} />
          </div>
        </div>
      </div>
    </>   
  )
}

export default Research