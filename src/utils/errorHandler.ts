const errorHandler = (message: string, error?: any) => {
  if (__DEV__) {
    return console.error(message, error);
  }

  if (error) {
    throw error;
  }
};

export default errorHandler;
