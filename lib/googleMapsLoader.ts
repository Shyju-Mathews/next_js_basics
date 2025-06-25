// lib/googleMapsLoader.ts
import { Loader } from '@googlemaps/js-api-loader';

let loaderPromise: Promise<typeof google> | null = null;

export const loadGoogleMaps = (): Promise<typeof google> => {
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries: ['places'],
    language: 'en',
    region: 'IN',
  }).load();

  return loaderPromise;
};
