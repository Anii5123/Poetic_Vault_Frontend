import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url, size = 180 }) => {
  if (!url) return null;

  return (
    <div className="flex justify-center my-4" aria-label="QR code">
      <QRCode
        value={url}
        size={size}
        bgColor="#ffffff"
        fgColor="#6b46c1"
        level="M"
        includeMargin
      />
    </div>
  );
};

QRCodeGenerator.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default QRCodeGenerator;
