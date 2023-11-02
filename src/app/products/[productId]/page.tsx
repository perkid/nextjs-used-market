import getCurrentUser from '@/app/actions/getCurrentUser';
import getProductById from '@/app/actions/getProductById';
import EmptyState from '@/components/EmptyState';
import ProductClient from '@/components/product/ProductClient';

interface Params {
  productId?: string;
}
export default async function Page({ params }: { params: Params }) {
  const product = await getProductById(params);
  const currentUser = await getCurrentUser();

  if (!product) {
    return (
      <EmptyState />
    )
  }

  return (
    <ProductClient
      product={product}
      currentUser={currentUser}
    />
  )
}