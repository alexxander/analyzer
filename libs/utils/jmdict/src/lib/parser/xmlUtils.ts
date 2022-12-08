export const getContent = (data: any): string | undefined => {
  return data.$ ? data._ : data;
};

export const getAttribute = (data: any, attr: string): string | undefined => {
  return data.$?.[attr];
};
