
import { notFound } from 'next/navigation';
import { OfferForm } from '../../OfferForm';
import dbConnect from '@/lib/dbConnect';
import Offer from '@/models/Offer';

async function getOffer(id: string) {
    await dbConnect();
    try {
        const offer = await Offer.findById(id);
        if (!offer) {
            return null;
        }
        return JSON.parse(JSON.stringify(offer));
    } catch (error) {
        return null;
    }
}

export default async function EditOfferPage({ params }: { params: { id: string } }) {
    const offer = await getOffer(params.id);

    if (!offer) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit Offer</h1>
            <OfferForm initialData={offer} />
        </div>
    );
}
