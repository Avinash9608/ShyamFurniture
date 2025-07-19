
import dbConnect from '@/lib/dbConnect';
import Offer from '@/models/Offer';
import Product from '@/models/Product';
import HomePageContent from '@/components/HomePageContent';
import { Product as ProductType } from '@/lib/types';
import { Offer as OfferType } from '@/lib/types';


async function getHomePageData() {
  await dbConnect();
  
  // Fetch popular products
  const products: ProductType[] = await Product.find({}).sort({ reviewsCount: -1, rating: -1 }).limit(3).lean();
  
  // Fetch the most recent, active, unexpired offer
  const latestOffer: OfferType | null = await Offer.findOne({
    isActive: true,
    endDate: { $gt: new Date() }
  }).sort({ createdAt: -1 }).lean();

  return {
    popularProducts: JSON.parse(JSON.stringify(products)),
    latestOffer: latestOffer ? JSON.parse(JSON.stringify(latestOffer)) : null,
  };
}


export default async function Home() {
  const { popularProducts, latestOffer } = await getHomePageData();
  
  return <HomePageContent popularProducts={popularProducts} latestOffer={latestOffer} />;
}
