import * as E from "fp-ts/Either";

const notEmpty = (s: string) => s !== "";
const notNegative = (n: number) => n >= 0;

export const validateNonEmpty = E.fromPredicate(
  notEmpty,
  () => `Balance not set. Set it with \`./run.sh balance <amount>\``
);

export const validateNonNegative = E.fromPredicate(
  notNegative,
  () => "Balance must be positive"
);