import { useState, useEffect } from 'react';
import { ImageWithFallbackProps } from '../types';

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className, fallbackSrc }) => {
  const [imageSrc, setImageSrc] = useState<string>(src || fallbackSrc);

  useEffect(() => {
    if (src) {
      setImageSrc(src);
    } else {
      setImageSrc(fallbackSrc);
    }
  }, [src, fallbackSrc]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackSrc;
  };

  return <img src={imageSrc} alt={alt} className={className} onError={handleImageError} />;
};

export default ImageWithFallback;
