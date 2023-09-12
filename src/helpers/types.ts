export type TestCase = {
  name: string;
  description: string;
  hash?: string;
  //TODO: make better type for 'snippet'
  snippet?: any;
};
