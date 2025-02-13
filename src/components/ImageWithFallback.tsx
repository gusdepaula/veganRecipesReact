import { useState, useEffect } from 'react';
import { ImageWithFallbackProps } from '../types/types';

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className, fallbackSrc }) => {
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackSrc;
  };

  return <img src={imageSrc} alt={alt} className={className} onError={handleImageError} />;
};

export default ImageWithFallback;
