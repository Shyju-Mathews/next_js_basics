'use client';

// app/places/page.tsx
import React, { useState } from 'react';
import { PlaceDetailsCard } from '@/components/googlePlacesAutoComplete/placeDetailsCard';
import { AddressAutocomplete, AddressResult } from '@/components/googlePlacesAutoComplete/addressAutoComplete';

export default function PlacesPage() {
  const [address, setAddress] = useState<AddressResult | null>(null);

  return (
    <main className="container py-10">
      <h1 className="mb-6 text-2xl font-semibold">Google Places – Demo</h1>

      <AddressAutocomplete value={address} onChange={setAddress} />

      {address?.place && (
        <PlaceDetailsCard
          original={address.raw}
          place={address.place}
        />
      )}
    </main>
  );
}
