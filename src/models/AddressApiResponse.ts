import Address from "./Address";

class AddressApiResponse {
  firstName: string;
  lastName: string;
  address: {
    number: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };

  constructor(address: Address) {
    this.firstName = address.firstName;
    this.lastName = address.lastName;
    this.address = {
      number: address.number,
      street: address.street,
      postalCode: address.postalCode,
      city: address.city,
      country: address.country,
    };
  }
}

export default AddressApiResponse;
