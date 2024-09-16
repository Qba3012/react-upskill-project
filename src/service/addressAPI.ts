import axios from "axios";
import Address from "../models/Address";
import AddressApiResponse from "../models/AddressApiResponse";

export const saveAddress = async (address: Address) => {
  const response = await axios.post(`${process.env.REACT_APP_ADDRESS_API_URL}`, new AddressApiResponse(address));

  try {
    return Address.fromAddressApiResponse(response.data);
  } catch (error) {
    throw new Error("Wrong server response");
  }
};

export const fetchAddresses = async () => {
  const response = await axios.get(`${process.env.REACT_APP_ADDRESS_API_URL}`);

  try {
    return response.data
      .map((data: AddressApiResponse) => {
        return Address.fromAddressApiResponse(data);
      })
      .reverse();
  } catch (error) {
    throw new Error("Wrong server response");
  }
};
