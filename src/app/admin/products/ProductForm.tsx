"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash, UploadCloud, Loader2, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  category: z.string().min(2, "Category is required."),
  price: z.coerce.number().positive("Price must be a positive number."),
  discountPrice: z.coerce.number().optional(),
  images: z.array(z.string()).min(1, "At least one image is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  features: z.array(z.object({ value: z.string() })).optional(),
  dimensions: z.object({
    length: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
  }),
  availability: z.boolean().default(true),
  customizable: z.boolean().default(false),
  deliveryInfo: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: ProductFormValues & { _id: string };
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const defaultValues = initialData
    ? {
        ...initialData,
        features: initialData.features?.map(f => ({ value: f as unknown as string })) || []
      }
    : {
        name: "",
        category: "",
        price: 0,
        discountPrice: undefined,
        images: [],
        description: "",
        features: [],
        dimensions: { length: "", width: "", height: "" },
        availability: true,
        customizable: false,
        deliveryInfo: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    const formData = new FormData();
    acceptedFiles.forEach(file => {
        formData.append("files", file);
    });

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { urls } = await response.json();
      urls.forEach((url: string) => {
        form.setValue("images", [...form.getValues("images"), url]);
      });

    } catch (error) {
      toast({ variant: "destructive", title: "Upload Error", description: "Could not upload images." });
    } finally {
      setIsUploading(false);
    }
  }, [form, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] }
  });

  async function onSubmit(data: ProductFormValues) {
    setIsSubmitting(true);
    const api = initialData ? `/api/admin/products/${initialData._id}` : '/api/admin/products';
    const method = initialData ? 'PUT' : 'POST';

    try {
      const response = await fetch(api, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...data,
            features: data.features?.map(f => f.value)
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${initialData ? 'update' : 'create'} product.`);
      }
      
      toast({ title: `Product ${initialData ? 'updated' : 'created'} successfully!` });
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      toast({ variant: "destructive", title: "Submission Error", description: (error as Error).message });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const removeImage = (index: number) => {
    const updatedImages = [...form.getValues('images')];
    updatedImages.splice(index, 1);
    form.setValue('images', updatedImages);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Royal 3-Seater Sofa" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe the product..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader><CardTitle>Images</CardTitle></CardHeader>
              <CardContent>
                <FormField control={form.control} name="images" render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-primary bg-primary/10' : ''}`}>
                            <input {...getInputProps()} />
                            {isUploading ? (
                                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-8 w-8 animate-spin" />
                                    <span>Uploading...</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <UploadCloud className="h-8 w-8" />
                                    <span>Drag & drop images here, or click to select files</span>
                                </div>
                            )}
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
                )} />
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {form.watch('images').map((image, index) => (
                        <div key={index} className="relative group aspect-square">
                            <Image src={image} alt={`Product image ${index+1}`} fill className="object-cover rounded-md" />
                            <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeImage(index)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {form.watch('images').length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center text-muted-foreground bg-slate-100 dark:bg-slate-800/50 rounded-lg p-8">
                            <ImageIcon className="h-10 w-10 mb-2"/>
                            <p>Your uploaded images will appear here</p>
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Features</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <FormField control={form.control} name={`features.${index}.value`} render={({ field }) => (
                      <Input {...field} placeholder={`Feature ${index + 1}`} />
                    )} />
                    <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                 <Button type="button" variant="outline" onClick={() => append({ value: "" })}>
                    Add Feature
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Dimensions</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="dimensions.length" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length</FormLabel>
                    <FormControl><Input placeholder="e.g., 78 inches" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="dimensions.width" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl><Input placeholder="e.g., 30 inches" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="dimensions.height" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl><Input placeholder="e.g., 34 inches" {...field} /></FormControl>
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader><CardTitle>Pricing & Category</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input type="number" placeholder="12500" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="discountPrice" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Price (Optional)</FormLabel>
                    <FormControl><Input type="number" placeholder="10999" {...field} /></FormControl>
                  </FormItem>
                )} />
                 <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl><Input placeholder="e.g., Sofa" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Status & Options</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="availability" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>In Stock</FormLabel>
                      <FormDescription>Is this product available for purchase?</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="customizable" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Customizable</FormLabel>
                      <FormDescription>Can this product be customized?</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
                 <FormField control={form.control} name="deliveryInfo" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Info</FormLabel>
                    <FormControl><Input placeholder="e.g., Delivered within 3-5 days" {...field} /></FormControl>
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                {initialData ? 'Update Product' : 'Create Product'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
