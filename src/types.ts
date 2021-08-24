export type DeviceTokenState = {
  newToken: string;
  actualToken?: string;
  actualTokenId?: string | number;
};

export type DeviceTokenCallbacks = {
  onTokenSave: (token: string) => Promise<{id: string | number}>;
  onTokenDelete?: (id: string | number) => Promise<any>;
};
