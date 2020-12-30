import addressFormatter from '@fragaria/address-formatter';

import { getAddress } from '../../../lib/nominatim';

/**
 * Sammelt Informationen zu einer gegebenen Adresse.
 * @param {String} address Eine Adresse.
 */
export const geoCodeHandler = async (address) => {
  const metaData = await getAddress(address);

  const properties = metaData[0];

  return {
    address: {
      street: properties.address.road,
      number: properties.address.house_number,
      city: properties.address.city,
      state: properties.address.state,
      postCode: properties.address.postcode,
      country: properties.address.country,
      countryCode: properties.address.country_code,
      formatted: addressFormatter
        .format(properties.address, {
          output: 'array'
        })
        .join(', ')
    },
    position: {
      lat: parseFloat(properties.lat),
      lon: parseFloat(properties.lon)
    }
  };
};
