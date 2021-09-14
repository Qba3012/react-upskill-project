import AddressApiResponse from "./AddressApiResponse";
import GeocoderResult from "./GeocoderResult";

class Address {
  firstName: string;
  lastName: string;
  number: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;

  static fromGeocoderResult(geo: GeocoderResult) {
    const number = getValue(geo, "street_number", "-");
    const street = getValue(geo, "route", "-");
    const city = getValue(geo, "locality", "-");
    const postalCode = getValue(geo, "postal_code", "-");
    const country = getValue(geo, "country", "-");
    return new this("", "", number, street, city, postalCode, country);
  }

  static fromAddressApiResponse(response: AddressApiResponse) {
    return new this(
      response.firstName,
      response.lastName,
      response.address.number,
      response.address.street,
      response.address.city,
      response.address.postalCode,
      response.address.country
    );
  }

  private constructor(
    firstName: string,
    lastName: string,
    number: string,
    street: string,
    city: string,
    postalCode: string,
    country: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
  }
}

const getValue = (geo: GeocoderResult, fieldName: string, placeholder: string) => {
  const geoData = geo.address_components.find((component) => component.types.includes(fieldName));
  return geoData ? geoData.long_name : placeholder;
};

export default Address;
