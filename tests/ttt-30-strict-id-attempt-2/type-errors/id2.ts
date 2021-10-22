// In some file with code related to markets

export type Id = string & { readonly __brand: unique symbol };


export function getMarketId(marketId: Id): Id {
  return marketId;
}
