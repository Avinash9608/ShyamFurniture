"use client";

import { useState, useMemo } from 'react';
import { products, allMaterials, allColors } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const hasMaterial = selectedMaterials.length === 0 || selectedMaterials.some(m => product.materials.includes(m));
      const hasColor = selectedColors.length === 0 || selectedColors.some(c => product.colors.includes(c));
      return inPriceRange && hasMaterial && hasColor;
    });
  }, [priceRange, selectedMaterials, selectedColors]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Our Collection</h1>
        <p className="text-muted-foreground mt-2">Find the perfect pieces to complete your home.</p>
      </header>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">Price Range</Label>
                <Slider
                  defaultValue={priceRange}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setPriceRange(value)}
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">Material</Label>
                <div className="space-y-2">
                  {allMaterials.map(material => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`material-${material}`}
                        onCheckedChange={() => handleMaterialChange(material)}
                      />
                      <label htmlFor={`material-${material}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">Color</Label>
                 <div className="space-y-2">
                  {allColors.map(color => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        onCheckedChange={() => handleColorChange(color)}
                      />
                      <label htmlFor={`color-${color}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="w-full lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
                 <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
                 <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
