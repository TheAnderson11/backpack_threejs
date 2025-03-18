'use client'
import { useState } from 'react';
import ARButton from './components/ARButton';
import Backpack from './components/Backpack.jsx';
import QRCodePopup from './components/QRCodePopup';
import styles from './page.module.css';

export default function Home() {
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Конфігуратор рюкзака</h1>

      <Backpack />

      <ARButton />

      <button 
        onClick={() => setShowQRCode(!showQRCode)}
        className={styles.qrButton}
      >
        {showQRCode ? 'Скрыть QR' : 'Показать QR'}
      </button>

      {showQRCode && (
        <div className={styles.qrPopup}>
          <QRCodePopup url="https://t.me/ShtefanIgor33" />
          <p className={styles.qrText}>Моя соц. сеть</p>
        </div>
      )}
    </div>
  );
}
