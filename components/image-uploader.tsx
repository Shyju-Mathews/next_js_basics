import { useEffect, useState } from 'react';
import ImageCropper from './image-cropper';

interface Props {
  // onUpload: (file: File) => void;
  selectedFile?: File | null;
  setSelectedFile?: (file: File | null) => void;
}

const ImageUploader: React.FC<Props> = ({ selectedFile, setSelectedFile /* onUpload */ }) => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [cropping, setCropping] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, 'file');
    if (file) {
      if (setSelectedFile) {
        setSelectedFile(file);
        setCropping(true);
      }
    }
  };

  // const handleCropped = (croppedFile: File) => {
  //   onUpload(croppedFile);
  //   setCropping(false);
  // };
  const handleUpload = (croppedFile: File) => {
    // setCroppedImage(croppedFile);
    // setCropping(false);
    console.log(croppedFile, 'croppedFile');
  };

  useEffect(() => {
    if (croppedImage) {
      handleUpload(croppedImage);
    }
  }, [croppedImage])

  return (
    <div>
      {!cropping ? (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </>
      ) : (
        selectedFile && <ImageCropper file={selectedFile} setCroppedImage={setCroppedImage} setCropping={setCropping} /* onCrop={handleCropped} */ />
      )}

      {croppedImage && <img src={croppedImage? URL.createObjectURL(croppedImage): ""} alt="Preview" style={{ width: 200 }} />}
    </div>
  );
};

export default ImageUploader;
