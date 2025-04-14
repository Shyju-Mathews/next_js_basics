'use client'
import ImageUploader from '@/components/image-uploader';
import { useState } from 'react';
// import ImageUploader from '';

const BlogForm = () => {
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const handleImageUpload = (file: File) => {
  //   const previewUrl = URL.createObjectURL(file);
  //   setImagePreview(previewUrl);
  // };

  return (
    <form>
      <ImageUploader selectedFile={selectedFile} setSelectedFile={setSelectedFile} /* onUpload={handleImageUpload} */ />
      {/* {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: 200 }} />} */}
      {/* Other form fields */}
    </form>
  );
};

export default BlogForm;
