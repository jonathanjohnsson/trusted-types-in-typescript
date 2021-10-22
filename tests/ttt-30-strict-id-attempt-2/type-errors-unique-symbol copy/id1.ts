// In some file with code related to customers

class IdBrand { private readonly brand = 'Id'; }
export type Id = string & IdBrand;

export function getCustomerId(customerId: Id): Id {
  return customerId;
}
