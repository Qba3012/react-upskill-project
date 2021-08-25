import PlaceType from "../models/PlaceType";

const SCRIPT = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`;

export const loadLibrary = () => {
  if (typeof window !== "undefined" && !document.querySelector("#google-maps")) {
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", "google-maps");
    script.src = SCRIPT;
    document.querySelector("head")!.appendChild(script);
  }
};

const autocompleteService = { current: null };
const geocoderService = { current: null };

export const fetchLocationDetails = (placeId: string, callback: (results?: any) => void) => {
  if ((window as any).google && !geocoderService.current) {
    geocoderService.current = new (window as any).google.maps.Geocoder();
  }
  (geocoderService.current as any).geocode({ placeId: placeId }, callback);
};

export const fetchLocations = (input: string, callback: (results?: PlaceType[]) => void) => {
  if ((window as any).google) {
    if (!autocompleteService.current) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    (autocompleteService.current as any).getPlacePredictions({ input: input }, callback);
  } else {
    throw new Error("Serwis lokalizacyjny niedostępny");
  }
};
