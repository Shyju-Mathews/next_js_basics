// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import { Input } from '@/components/ui/input'; // From ShadCN
// import { Loader } from '@googlemaps/js-api-loader';

// interface AddressAutocompleteProps {
//   onPlaceSelected: (address: string, place: google.maps.places.PlaceResult) => void;
// }

// export default function GooglePlacesAutocomplete({ onPlaceSelected }: AddressAutocompleteProps) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
//       libraries: ['places'],
//     });

//     loader.load().then((google: any) => {
//         const maps = google.maps;
//       if (inputRef.current) {
//         const auto = new maps.places.Autocomplete(inputRef.current, {
//           types: ['geocode'],
//           fields: ['formatted_address', 'geometry', 'name'],
//         });
//         auto.addListener('place_changed', () => {
//           const place = auto.getPlace();
//           if (place.formatted_address) {
//             onPlaceSelected(place.formatted_address, place);
//           }
//         });
//         setAutocomplete(auto);
//       }
//     });
//   }, []);

//   return (
//     <Input
//       ref={inputRef}
//       type="text"
//       placeholder="Enter your address"
//       className="w-full"
//     />
//   );
// }

// 'use client';

// import { useEffect, useRef } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';
// import { Input } from '@/components/ui/input';

// interface AddressAutocompleteProps {
//   onPlaceSelected: (
//     address: string,
//     place: google.maps.places.PlaceResult
//   ) => void;
//   placeholder?: string;
// }
// export default function GooglePlacesAutocomplete({
//   onPlaceSelected,
//   placeholder = 'Enter your address',
// }: AddressAutocompleteProps) {
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     let autocomplete: google.maps.places.Autocomplete | undefined;

//     const initAutocomplete = async () => {
//       const loader = new Loader({
//         apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
//         version: 'weekly',       
//         language: 'en',
//         region: 'IN',
//       });

//       // 2. Dynamically import only the Places library
//       const { Autocomplete } = (await loader.importLibrary(
//         'places'
//       )) as google.maps.PlacesLibrary;

//       // 3. Attach Autocomplete to the input element
//       if (inputRef.current) {
//         autocomplete = new Autocomplete(inputRef.current, {
//           types: ['geocode'],
//           fields: ['formatted_address', 'geometry', 'name', 'place_id'],
//         });

//         autocomplete.addListener('place_changed', () => {
//           const place = autocomplete!.getPlace();
//           if (place.formatted_address) {
//             onPlaceSelected(place.formatted_address, place);
//           }
//         });
//       }
//     };

//     initAutocomplete();

//     // 4. Clean-up function (runs when component unmounts)
//     return () => {
//       if (autocomplete) {
//         google.maps.event.clearInstanceListeners(autocomplete);
//       }
//     };
//   }, [onPlaceSelected]); // re-create only if callback identity changes

//   return (
//     <Input
//       ref={inputRef}
//       type="text"
//       placeholder={placeholder}
//       className="w-full"
//       autoComplete="off"   // stops the browser’s own suggestions overlay
//     />
//   );
// }

'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';

interface AddressAutocompleteProps {
  onPlaceSelected: (
    address: string,
    placeId: string,
    place: google.maps.places.PlaceResult
  ) => void;
  placeholder?: string;
}

export default function GooglePlacesAutocomplete({
  onPlaceSelected,
  placeholder = 'Enter your address',
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const listenerRef = useRef<google.maps.MapsEventListener | null>(null);

  useEffect(() => {
    const init = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
        version: 'weekly',
        libraries: ['places'],
      });

      const google = await loader.load();

      // Set up Google services
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
      placesServiceRef.current = new google.maps.places.PlacesService(document.createElement('div'));
      geocoderRef.current = new google.maps.Geocoder();

      // Set up Autocomplete if input exists
      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'],
          fields: ['formatted_address', 'place_id', 'geometry', 'name'],
        });

        listenerRef.current = autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address && place.place_id) {
            onPlaceSelected(place.formatted_address, place.place_id, place);
          }
        });
      }
    };

    init();

    return () => {
      if (listenerRef.current) {
        google.maps.event.removeListener(listenerRef.current);
      }
    };
  }, [onPlaceSelected]);

  const handlePaste = async () => {
    setTimeout(async () => {
      const query = inputRef.current?.value?.trim();
      if (!query || !autocompleteServiceRef.current || !placesServiceRef.current) return;

      autocompleteServiceRef.current.getPlacePredictions(
        { input: query },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions &&
            predictions.length > 0
          ) {
            const firstPrediction = predictions[0];

            // Get full PlaceResult using PlacesService
            placesServiceRef.current!.getDetails(
              {
                placeId: firstPrediction.place_id,
                fields: ['formatted_address', 'place_id', 'geometry', 'name'],
              },
              (place, detailsStatus) => {
                if (
                  detailsStatus === google.maps.places.PlacesServiceStatus.OK &&
                  place &&
                  place.formatted_address &&
                  place.place_id
                ) {
                  onPlaceSelected(place.formatted_address, place.place_id, place);
                }
              }
            );
          } else {
            // Fallback: use Geocoder for full pasted text
            geocoderRef.current?.geocode({ address: query }, (results, geoStatus) => {
              if (
                geoStatus === google.maps.GeocoderStatus.OK &&
                results &&
                results.length > 0
              ) {
                const result = results[0];
                onPlaceSelected(result.formatted_address, result.place_id!, result);
              }
            });
          }
        }
      );
    }, 100); // Wait for pasted value to appear in input
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className="w-full"
      autoComplete="off"
      onPaste={handlePaste}
    />
  );
}


