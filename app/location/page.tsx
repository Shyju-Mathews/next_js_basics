"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GooglePlacesAutocomplete from "@/components/googlePlacesAutoComplete/googlePlacesAutoComplete";

type PlaceDetailsProps = {
  placeId: string;
  details: {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
  };
};

export default function AddressFormPage() {
  const [address, setAddress] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.PlaceResult | null>(null);

  const handlePlaceSelected = (
    formattedAddress: string,
    placeId: string,
    place: google.maps.places.PlaceResult
  ) => {
    setAddress(formattedAddress);
    setAutocomplete(place);
    setPlaceId(placeId);
    console.log("Place details:", place);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Address submitted: ${address}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <div>
        <Label htmlFor="address">Address</Label>
        <GooglePlacesAutocomplete onPlaceSelected={handlePlaceSelected} />
      </div>
      <Button type="submit">Submit</Button>

      <div>
        {placeId && autocomplete && (
          <PlaceDetails placeId={placeId} details={autocomplete as never} />
        )}
      </div>
    </form>
  );
}


function PlaceDetails({ placeId, details }: PlaceDetailsProps) {
  const getComponent = (type: string) =>
    details?.address_components?.find((c) => c?.types?.includes(type))?.long_name ?? 'N/A';

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          📍 Location Details
        </h2>

        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          <p><strong>Formatted Address:</strong> {details.formatted_address}</p>
          <p><strong>Place ID:</strong> {placeId}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
          <div><strong>Street Number:</strong> {getComponent('street_number')}</div>
          <div><strong>Route:</strong> {getComponent('route')}</div>
          <div><strong>Sub-locality:</strong> {getComponent('sublocality')}</div>
          <div><strong>City:</strong> {getComponent('locality')}</div>
          <div><strong>District:</strong> {getComponent('administrative_area_level_3')}</div>
          <div><strong>State:</strong> {getComponent('administrative_area_level_1')}</div>
          <div><strong>Country:</strong> {getComponent('country')}</div>
          <div><strong>Pincode:</strong> {getComponent('postal_code')}</div>
        </div>

        <div>
          <h3 className="mt-4 font-medium text-zinc-800 dark:text-zinc-100">Coordinates:</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Latitude: {details.geometry.location.lat}, Longitude: {details.geometry.location.lng}
          </p>
        </div>

        {/* Optional Map Embed (Google Maps) */}
        <iframe
          title="Location Map"
          className="w-full h-64 mt-4 rounded-xl border"
          src={`https://maps.google.com/maps?q=${details.geometry.location.lat},${details.geometry.location.lng}&hl=es;&output=embed`}
          loading="lazy"
        />
      </div>
    </div>
  );
}
