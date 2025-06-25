'use client';
import React, { Fragment } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Place = google.maps.places.PlaceResult;
interface Props {
  original: string;
  place: Place;
}

const pick = (place: Place, type: string) =>
  place.address_components?.find((c) => c.types.includes(type))?.long_name ?? null;

export const PlaceDetailsCard: React.FC<Props> = ({ original, place }) => {
  const fields = [
    ['street_number', 'Street #'],
    ['route', 'Street / Road'],
    ['sublocality', 'Sub-locality'],
    ['locality', 'City'],
    ['administrative_area_level_3', 'District'],
    ['administrative_area_level_1', 'State'],
    ['country', 'Country'],
    ['postal_code', 'Pincode'],
  ] as const;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Place Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm">
          <p><strong>Original:</strong> {original}</p>
          <p><strong>Google Match:</strong> {place.formatted_address}</p>
          <p><strong>Place ID:</strong> {place.place_id}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {fields.map(([type, label]) => {
            const val = pick(place, type);
            const missing = !val;
            return (
              <Fragment key={type}>
                <span className="font-medium">{label}</span>
                <span>
                  {val ?? (
                    <span className="text-destructive">
                      ⚠️ Missing
                    </span>
                  )}
                </span>
              </Fragment>
            );
          })}
        </div>

        <iframe
          title="map"
          className="h-56 w-full rounded-lg border"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${place.geometry?.location?.lat()},${place.geometry?.location?.lng()}&output=embed`}
        />
      </CardContent>
    </Card>
  );
};
