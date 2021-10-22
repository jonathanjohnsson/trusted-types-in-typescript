// In some file with code related to customers

export type Id = string & { readonly __brand: unique symbol };

export function getCustomerId(customerId: Id): Id {
  return customerId;
}
