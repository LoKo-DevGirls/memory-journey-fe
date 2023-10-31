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
      <div className={`${styles.container} ${styles.bgBlack}`}>
        <div className={styles.gridContainer}>
          <div className={`${styles.colSt1} ${styles.colE5} ${styles.rowSt1} ${styles.rowE2} ${styles.flexCol}`}>
            <Picture image={imageAssets[25]} />
            <Picture image={imageAssets[5]} />
          </div>
          <Picture image={imageAssets[2]} className={`${styles.colSt6} ${styles.colE13}`} />
          
          <Picture image={imageAssets[3]} className={`${styles.rowSt2} ${styles.rowE3} ${styles.colSt1} ${styles.colE7}`} />
          <Picture image={imageAssets[8]} className={`${styles.rowSt2} ${styles.rowE3} ${styles.colSt8} ${styles.colE13}`} />

          <Picture image={imageAssets[1]} className={`${styles.rowSt3} ${styles.rowE4} ${styles.colSt1} ${styles.colE13}`} />

          <div className={`${styles.rowSt4} ${styles.rowE5} ${styles.colSt1} ${styles.colE13} ${styles.flexCenter}`}>
            <LazyImage image={imageAssets[13]} className={``} />
            <LazyImage image={imageAssets[7]} className={``} />
            <LazyImage image={imageAssets[11]} className={``} />
          </div>

          <div className={`${styles.rowSt6} ${styles.rowE7} ${styles.colSt1} ${styles.colE13} ${styles.gridContainer}`}>
            <LazyImage image={imageAssets[4]} className={`${styles.colSt1} ${styles.colE8}`} />
            <LazyImage image={imageAssets[18]} className={`${styles.colSt9} ${styles.colE13}`} />
          </div>

          <div className={`${styles.rowSt7} ${styles.rowE8} ${styles.colSt1} ${styles.colE13} ${styles.gridContainer}`}>
            <LazyImage image={imageAssets[17]} className={`${styles.colSt1} ${styles.colE5}`} />
            <LazyImage image={imageAssets[12]} className={`${styles.colSt6} ${styles.colE13}`} />
          </div>

          <div className={`${styles.rowSt8} ${styles.rowE9} ${styles.colSt1} ${styles.colE13} ${styles.flexCenter}`}>
            <LazyImage image={imageAssets[15]} className={``} />
            <LazyImage image={imageAssets[14]} className={``} />
            <LazyImage image={imageAssets[16]} className={``} />
          </div>

          <LazyImage image={imageAssets[22]} className={`${styles.rowSt9} ${styles.rowE10} ${styles.colSt1} ${styles.colE7}`} />
          <div className={`${styles.rowSt9} ${styles.rowE10} ${styles.colSt8} ${styles.colE13} ${styles.flexCol}`}>
            <LazyImage image={imageAssets[10]} className={`${styles.colSt1} ${styles.colE5}`} />
            <LazyImage image={imageAssets[9]} className={`${styles.colSt1} ${styles.colE5}`} />
            <LazyImage image={imageAssets[6]} className={`${styles.colSt1} ${styles.colE5}`} />
          </div>

          <div className={`${styles.rowSt10} ${styles.rowE11} ${styles.colSt1} ${styles.colE6} ${styles.flexCol}`}>
            <LazyImage image={imageAssets[24]} className={`${styles.colSt1} ${styles.colE5}`} />
            <LazyImage image={imageAssets[23]} className={`${styles.colSt1} ${styles.colE5}`} />
          </div>
          <LazyImage image={imageAssets[19]} className={`${styles.rowSt10} ${styles.rowE11} ${styles.colSt7} ${styles.colE13}`} />

          <LazyImage image={imageAssets[0]} className={`${styles.rowSt11} ${styles.rowE12} ${styles.colSt1} ${styles.colE13}`} />

          <div className={`${styles.rowSt12} ${styles.rowE13} ${styles.colSt1} ${styles.colE13} ${styles.gridContainer}`}>
            <LazyImage image={imageAssets[21]} className={`${styles.colSt1} ${styles.colE6}`} />
            <LazyImage image={imageAssets[26]} className={`${styles.colSt7} ${styles.colE13}`} />
          </div>
        </div>
      </div>
    </>   
  )
}

export default Research