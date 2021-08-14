export const getValue = (field: any): string => {
  if (field && field.length !== 0) {
    return field[0]._;
  }
  else return '';
};

export const getMapValue = (field: any): Record<string, any> => {
  if (field && field.length !== 0) {
    return field[0];
  }
  else return {};
};
