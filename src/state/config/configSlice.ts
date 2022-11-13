import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  ipfsGatewayPrefix: string;
  ipfsGatewaySuffix: string;
}

const initialState: ConfigState = {
  ipfsGatewayPrefix: "https://ipfs.io/ipfs/",
  ipfsGatewaySuffix: "",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setIpfsGatewayPrefix: (state, action: PayloadAction<string>) => {
      state.ipfsGatewayPrefix = action.payload;
    },
    setIpfsGatewaySuffix: (state, action: PayloadAction<string>) => {
      state.ipfsGatewaySuffix = action.payload;
    },
  },
});

export const { setIpfsGatewayPrefix, setIpfsGatewaySuffix } =
  configSlice.actions;

export default configSlice.reducer;
