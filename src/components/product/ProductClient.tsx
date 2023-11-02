'use client'
import { Product, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { categories } from '../categories/Categories';
import dynamic from 'next/dynamic';
import Container from '../Container';
import Button from '../Button';
import ProductInfo from './ProductInfo';
import ProductHead from './ProductHead';

interface ProductClientProps {
  product: Product & {
    user: User;
  };
  currentUser?: User | null;
}
const ProductClient = ({
  product, currentUser
}: ProductClientProps) => {

  const router = useRouter();
  const category = categories.find((items) =>
    items.path === product.category);

  const KakaMap = dynamic(() => import('../KakaoMap'), {
    ssr: false
  });

  return (
    <Container>
      <div
        className="max-w-screen-lg mx-auto"
      >
        <div className="flex flex-col gap-6">
          <ProductHead
            title={product.title}
            imageSrc={product.imageSrc}
            id={product.id}
            currentUser={currentUser}
          />
          <div
            className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10"
          >
            <ProductInfo
              user={product.user}
              category={category}
              createdAt={product.createdAt}
              description={product.description}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <KakaMap detailPage latitude={product.latitude} longitude={product.longitude} />
            </div>
          </div>

          {
            currentUser?.id !== product?.user?.id &&
            <div>
              <Button
                onClick={() => router.push(`/chat?id=${product?.user?.id}&name=${product?.user?.name}&image=${product?.user?.image}`)}
                label='이 유저와 채팅하기'
              />
            </div>
          }
        </div>
      </div>
    </Container>
  )
}
export default ProductClient