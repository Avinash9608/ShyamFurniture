
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { ProductGrid } from '@/components/ProductGrid';

async function getProducts() {
  await dbConnect();
  const products = await Product.find({});
  // Mongoose returns a document, not a plain object. We need to convert it.
  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
  const products = await getProducts();

  // We need to get all possible materials and colors from the fetched products
  const allMaterials = [...new Set(products.flatMap((p: any) => p.features || []))];
  const allColors = [...new Set(products.flatMap((p: any) => p.colors || []))];


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Our Collection</h1>
        <p className="text-muted-foreground mt-2">Find the perfect pieces to complete your home.</p>
      </header>
      <ProductGrid products={products} allMaterials={allMaterials} allColors={allColors} />
    </div>
  );
}
