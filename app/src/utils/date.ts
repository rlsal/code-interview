export const serializeDate = (date: unknown): Date => {
  if (Number.isInteger(date)) return new Date(date as number);

  return new Date(date as string);
};

export const validateDate = (date: unknown): boolean => {
  if (Number.isInteger(date))
    return Number.isNaN(new Date(date as number).getTime());

  return Number.isNaN(new Date(date as string).getTime());
};
