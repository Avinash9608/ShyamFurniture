"use client";

import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Wand2, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { virtualFurniturePlacement } from '@/ai/flows/virtual-furniture-placement';
import type { Product } from '@/lib/types';

interface VirtualTryOnProps {
    product: Product;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ product }) => {
    const [roomPhoto, setRoomPhoto] = useState<File | null>(null);
    const [roomPhotoPreview, setRoomPhotoPreview] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setRoomPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setRoomPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!roomPhotoPreview) {
            setError('Please upload a photo of your room first.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const result = await virtualFurniturePlacement({
                roomPhotoDataUri: roomPhotoPreview,
                furniturePhotoDataUri: product.images[0], // Using the first product image
                description: `Place the ${product.name} in the room. Product description: ${product.description}`,
            });
            setGeneratedImage(result.placedFurniturePhotoDataUri);
        } catch (err) {
            setError('Failed to generate image. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                    <Wand2 /> Virtual Furniture Placement
                </CardTitle>
                <CardDescription>See how this {product.name} looks in your own space!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">1. Upload Your Room</h3>
                        <Card className="aspect-video flex items-center justify-center border-2 border-dashed">
                            {roomPhotoPreview ? (
                                <div className="relative w-full h-full">
                                    <Image src={roomPhotoPreview} alt="Room preview" fill className="object-contain" />
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground p-4">
                                    <Upload className="mx-auto h-12 w-12 mb-2" />
                                    <p>Click button to upload a photo</p>
                                </div>
                            )}
                        </Card>
                        <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef}/>
                        <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                            <Upload className="mr-2 h-4 w-4" /> Upload Room Photo
                        </Button>

                        <h3 className="font-semibold text-lg pt-4">2. Generate!</h3>
                        <Button onClick={handleGenerate} disabled={!roomPhoto || isLoading} className="w-full gradient-cta">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" /> Place Furniture
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Result</h3>
                        <Card className="aspect-video flex items-center justify-center border-2 border-dashed bg-muted/50">
                            {isLoading && (
                                <div className="text-center text-muted-foreground p-4 animate-pulse">
                                    <Loader2 className="mx-auto h-12 w-12 animate-spin mb-2" />
                                    <p>Our AI is working its magic...</p>
                                </div>
                            )}
                            {error && !isLoading && (
                                <div className="text-center text-destructive p-4">
                                    <AlertTriangle className="mx-auto h-12 w-12 mb-2" />
                                    <p>{error}</p>
                                </div>
                            )}
                            {generatedImage && !isLoading && (
                                <div className="relative w-full h-full">
                                    <Image src={generatedImage} alt="Generated image with furniture" fill className="object-contain" />
                                </div>
                            )}
                             {!isLoading && !error && !generatedImage && (
                                <div className="text-center text-muted-foreground p-4">
                                    <p>Your generated image will appear here.</p>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default VirtualTryOn;
