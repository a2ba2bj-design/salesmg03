
// Make an object serializable to JSON.
//
// Useful to convert an object which may contain non-serializeable data such as

import { Decimal } from "@prisma/client/runtime/library";

// Dates to an object that doesn't
export function makeSerializable<T extends any> (o: T): T {
    return JSON.parse(JSON.stringify(o))
}
export type CatProps = {
    catID: number;
    catName: string;
   
  }

export const BASE_URL="http://localhost:3000/api"
 export  function separate(Number) 
  {
  Number+= '';
  Number= Number.replace(',', '');
  const x = Number.split('.');
  let y = x[0];
  const z= x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y))
  y= y.replace(rgx, '$1' + ',' + '$2');
  return y+ z;
  }
  