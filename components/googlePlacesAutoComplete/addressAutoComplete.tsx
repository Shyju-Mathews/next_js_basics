'use client';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps } from '@/lib/googleMapsLoader';

type Prediction = google.maps.places.AutocompletePrediction;
type Place = google.maps.places.PlaceResult;

export interface AddressResult {
  placeId: string;
  raw: string;
  place: Place | null;
}

interface Props {
  value: AddressResult | null;
  onChange: (v: AddressResult | null) => void;
  placeholder?: string;
  className?: string;
}

export const AddressAutocomplete: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Start typing your address…',
  className,
}) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState(value?.raw ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesRef = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    loadGoogleMaps().then((g) => {
      serviceRef.current = new g.maps.places.AutocompleteService();
      placesRef.current = new g.maps.places.PlacesService(document.createElement('div'));
    });
  }, []);

  

  /* ───────────────────── PREDICT ───────────────────── */
  const fetchPredictions = (str: string) => {
    const svc = serviceRef.current;
    if (!svc) return;

    if (!str) {
      setPredictions([]);
      return;
    }

    svc.getPlacePredictions(
      { input: str, componentRestrictions: { country: ['in'] } },
      (preds) => setPredictions(preds ?? []),
    );
  };

  /* ───────────────────── HANDLERS ───────────────────── */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    fetchPredictions(val);
    setOpen(true);
    if (value) onChange(null); // user started editing again
  };

  // Special case: instantly call fetch on paste so dropdown appears
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const txt = e.clipboardData.getData('text');
    setTimeout(() => fetchPredictions(txt), 0);
  };

  const pickPrediction = (p: Prediction) => {
    const placeId = p.place_id;
    const raw = p.description;

    placesRef.current?.getDetails({ placeId }, (pl: Place | null) => {
      onChange({ placeId, raw, place: pl });
    });

    setInputVal(raw);
    setPredictions([]);
    setOpen(false);
  };

  const reset = () => {
    setInputVal('');
    setPredictions([]);
    setOpen(false);
    onChange(null);
    inputRef.current?.focus();
  };

  /* ESC closes */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        ref={inputRef}
        value={inputVal}
        onChange={handleInput}
        placeholder={placeholder}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      />
      {open && predictions.length > 0 && (
        <Command className="absolute z-30 mt-1 w-full rounded-lg border bg-popover text-popover-foreground shadow-lg">
          <CommandGroup>
            {predictions.map((p) => (
              <CommandItem
                key={p.place_id}
                onSelect={() => pickPrediction(p)}
              >
                {p.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      )}
      {inputVal && !open && (
        <button
          type="button"
          className="absolute right-2.5 top-1.5 text-sm text-muted-foreground"
          onClick={reset}
        >
          ✕
        </button>
      )}
    </div>
  );
};
