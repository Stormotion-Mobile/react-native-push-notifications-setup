const devLog = (message: string, value?: unknown) =>
  __DEV__ && console.log(message, value);

export default devLog;
