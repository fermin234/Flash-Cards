export const pluralize = ({ text, quantity }) =>
  `${quantity || "No"} ${text}${quantity === 1 ? "" : "s"}`;
