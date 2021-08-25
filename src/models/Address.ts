import GeocoderResult from "./GeocoderResult";

class Address {
    number: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;

    constructor(geo: GeocoderResult) {
        this.number = getValue(geo, "street_number", "-");
        this.street = getValue(geo, "route", "-");
        this.city = getValue(geo, "locality", "-");
        this.postalCode = getValue(geo, "postal_code", "-");
        this.country = getValue(geo, "country", "-");
    }

}

const getValue = (geo: GeocoderResult, fieldName: string, placeholder: string) => {
    const geoData = geo.address_components.find(component => component.types.includes(fieldName));
    return geoData ? geoData.long_name : placeholder;
};

export default Address;