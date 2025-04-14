import { useEffect, useRef, useState } from 'react';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

interface Props {
  file: File;
  // onCrop: (file: File) => void;
  setCroppedImage?: (file: File) => void;
  setCropping?: (cropping: boolean) => void;
}

const ImageCropper: React.FC<Props> = ({ file, /*onCrop*/ setCroppedImage, setCropping }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const cropperRef = useRef<CropperRef>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);

  const handleCrop = async () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File([blob], file.name, { type: blob.type });
            if (setCroppedImage) {
              setCroppedImage(croppedFile);
              if (setCropping) {
                setCropping(false);
              }
            }
          }
        }, file.type);
      }
    }
  };

  return (
    <div>
      {imageSrc && (
        <>
          <Cropper
            ref={cropperRef}
            src={imageSrc}
            stencilProps={{}}
            style={{ height: 400, width: '100%' }}
          />
          <button type="button" onClick={handleCrop}>Crop & Upload</button>
        </>
      )}
    </div>
  );
};

export default ImageCropper;
