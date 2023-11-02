'use client';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import { categories } from '@/components/categories/Categories';
import CategoryInput from '@/components/categories/CategoryInput';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: '',
      price: 1
    }
  });

  const imageSrc = watch('imageSrc');
  const category = watch('category');

  const KakaoMap = dynamic(() => import('../../../components/KakaoMap'), {
    ssr: false
  });
  const latitude = watch('latitude');
  const longitude = watch('longitude');


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/products', data)
      .then(res => {
        router.push(`/products/${res.data.id}`);
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        setIsLoading(false);
      });
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  }

  return (
    <Container>
      <div className='max-w-screen-lg max-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
          <Heading
            title='Product Upload'
            subtitle='upload your product'
          />

          <ImageUpload
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
          />

          <Input
            id='title'
            label='Title'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />

          <Input
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />

          <Input
            id='price'
            label='Price'
            formatPrice
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />

          <div className='grid gird-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
            {
              categories.map((item) => (
                <div key={item.label} className='col-span-1'>
                  <CategoryInput
                    onClick={(category) => setCustomValue('category', category)}
                    selected={category === item.path}
                    label={item.label}
                    icon={item.icon}
                    path={item.path}
                  />
                </div>
              ))
            }
          </div>
          <hr />

          <KakaoMap
            setCustomValue={setCustomValue}
            latitude={latitude}
            longitude={longitude}
          />

          <Button label='상품 생성하기' />
        </form>
      </div>
    </Container>
  )
}