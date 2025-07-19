
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Truck } from "lucide-react";

export default function DeliveryCheck() {
    const [pinCode, setPinCode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'available' | 'unavailable'>('idle');
    const { toast } = useToast();

    const checkDelivery = () => {
        if (pinCode.length === 6 && /^\d+$/.test(pinCode)) {
          // Mock logic: available for pincodes starting with '1', '2', '3'
          if (['1', '2', '3'].includes(pinCode.charAt(0))) {
            setDeliveryStatus('available');
          } else {
            setDeliveryStatus('unavailable');
          }
        } else {
          toast({
            title: "Invalid PIN Code",
            description: "Please enter a valid 6-digit PIN code.",
            variant: 'destructive'
          });
        }
    };

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-headline font-semibold text-lg">Check Delivery Availability</h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter 6-digit PIN Code" 
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  maxLength={6}
                />
                <Button onClick={checkDelivery}>Check</Button>
              </div>
              {deliveryStatus === 'available' && <p className="text-green-600 flex items-center gap-2"><Truck className="h-4 w-4"/> Yay! Delivery is available to your location.</p>}
              {deliveryStatus === 'unavailable' && <p className="text-red-600 flex items-center gap-2"><Truck className="h-4 w-4"/> Sorry, delivery is not available to this PIN code yet.</p>}
            </CardContent>
        </Card>
    )
}
