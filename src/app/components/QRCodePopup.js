import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodePopup({ url }) {
  return (
    <div>
      <QRCodeCanvas value={url} size={128} />
    </div>
  );
}
