import { ChangeEvent, Dispatch, SetStateAction } from 'react'

const previewImage = (e: ChangeEvent<HTMLInputElement>, setImagePreview: Dispatch<SetStateAction<string | null>>, setImage: Dispatch<SetStateAction<File | null>>) => {
  const file = e.target.files && e.target.files[0];
  setImage(file);
  const reader = new FileReader();
  file && reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImagePreview(reader.result as string);
  };
};

export default previewImage