import { PLACES_ANYPLACE_ID } from "@/constants";
import { Place } from "@/lib/definitions";

export const sortPlaces = (places: Place[]) => {
  places.sort((a, b) => {
    if (a.id === PLACES_ANYPLACE_ID) return -1;
    if (b.id === PLACES_ANYPLACE_ID) return 1;
    return 0;
  });
  return places;
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
