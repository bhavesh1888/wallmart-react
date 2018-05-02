import * as types from './constants';

export function getData(locationId, sku){
  console.log("hello from action", locationId,sku);
  return {
    type: types.REQUEST_WALLMART_DATA,
    locationId,
    sku,
  };
}
