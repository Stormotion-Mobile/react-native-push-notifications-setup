const errorHandler = (message: string, error?: unknown) =>
  __DEV__ && console.error(message, error);

export default errorHandler;
