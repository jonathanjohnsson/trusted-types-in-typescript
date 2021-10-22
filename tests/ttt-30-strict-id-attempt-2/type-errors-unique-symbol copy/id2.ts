// In some file with code related to markets

class IdBrand { private readonly brand = 'Id'; }
export type Id = string & IdBrand;

export function getMarketId(marketId: Id): Id {
  return marketId;
}
