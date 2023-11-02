'use client'
import { createUser } from '@/app/actions/actions';
import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  // 기존 api/route.tx 방식
  const onSubmit:SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/register', body);
      router.push('/auth/login');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // react-hook-form, use server를 사용한 방식
  // const onSubmit: SubmitHandler<FieldValues> = async (body) => {
  //   const { email, name, password } = body;
  //   setIsLoading(true);
  //   try {
  //     const user = await createUser({email, name, password});
  //     router.push('/auth/login');
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // use server, action을 활용한 방법
  // const onSubmit = async (formData:FormData) => {
  //   setIsLoading(true);
  //   try {
  //     const userData = {
  //       email: formData.get('email') as string,
  //       name: formData.get('name') as string,
  //       password: formData.get('password') as string
  //     }
  //     const user = await createUser(userData);
  //     router.push('/auth/login');
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <section className='grid h-[calc(100vh_-_56px)] place-items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // action={onSubmit}
        className='flex flex-col justify-center gap-4 min-w-[350px]'
      >
        <h1 className='text-2xl'>Register</h1>
        <Input
          id='email'
          label='Email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='name'
          label='Name'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='password'
          label='Password'
          type='password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button
          label='Register'
          disabled={isLoading}
        />
        <div className='text-center'>
          <p className='text-gray-400'>
            Already a member?{' '}
            <Link href="/auth/login" className='text-black hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}