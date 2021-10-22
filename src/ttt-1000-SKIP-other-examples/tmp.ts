export class Id {
  private readonly type: string = 'Id';
  public readonly value: string;
  constructor(unvalidatedId: unknown) {
    // validate unvalidatedId and set it to this.value if valid
  }
}


class IdBrand {
  private readonly brand = 'Id';
}

export type Id = string & IdBrand; // length 8, no spaces

// Consider using `unvalidatedId: string` instead.
export function createIdOrThrow(unvalidatedId: unknown): Id {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable  @typescript-eslint/no-unsafe-call */
  const idAny = unvalidatedId as any;
  if ((idAny?.length !== 8 || idAny?.includes(' '))) {
    throw new Error(`Failed to create Id. Bad value: ${unvalidatedId}`);
  }
  return idAny as Id;
}
