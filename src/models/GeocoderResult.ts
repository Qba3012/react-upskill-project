interface GeocoderResult {
  address_components: [
    {
      short_name: string;
      long_name: string;
      types: string[];
    }
  ],
  formatted_address: string;
}

export default GeocoderResult;
