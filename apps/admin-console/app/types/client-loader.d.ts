type LoaderData = {
  error?: {
    type: 'role' | 'auth' | 'token';
    message: string;
  };
};
