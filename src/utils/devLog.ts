const devLog = (message: string, value?: any) =>
  __DEV__ && console.log(message, value);

export default devLog;
