import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'store/reducers';
import {VaultName, VaultType} from '@Launch/types';

interface LaunchState {
  data: {
    selectedVault: VaultName;
    selectedVaultType: VaultType;
    projects: any;
    tempVaultData: {};
    err: {
      tokenDetail: {
        name: boolean;
      };
    };
  };
  loading: 'idle' | 'pending';
  error: any;
  currentRequestId?: string;
}

const initialState = {
  data: {
    selectedVault: 'Public',
    selectedVaultType: 'Public',
    projects: [],
    tempVaultData: {},
    err: {
      tokenDetail: {},
    },
  },
  loading: 'idle',
  error: null,
  currentRequestId: undefined,
} as LaunchState;

type VaultPayload = {
  data: VaultName;
  vaultType: VaultType;
};

type ProjectPayload = {
  data: any;
};

export const selectVault = createAsyncThunk(
  'launch/selectVault',
  ({vaultName}: {vaultName: VaultName}, {requestId, getState}) => {
    const {currentRequestId, loading} = (getState as any)().dao;

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    return {selectedVault: vaultName};
  },
);

export const launchReducer = createSlice({
  name: 'launch',
  initialState,
  reducers: {
    changeVault: (state, {payload}: PayloadAction<VaultPayload>) => {
      state.data.selectedVault = payload.data;
      state.data.selectedVaultType = payload.vaultType;
    },
    fetchProjects: (state, {payload}: PayloadAction<ProjectPayload>) => {
      state.data.projects = payload.data;
    },
    saveTempVaultData: (state, {payload}: PayloadAction<ProjectPayload>) => {
      state.data.tempVaultData = payload.data;
    },
    setErr: (state, {payload}: PayloadAction<ProjectPayload>) => {
      state.data.err = payload.data;
    },
  },
  extraReducers: {
    [selectVault.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [selectVault.fulfilled.type]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.data = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [selectVault.rejected.type]: (state, action) => {
      const {requestId} = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});
// @ts-ignore
export const selectLaunch = (state: RootState) => state.launch;
export const {changeVault, fetchProjects, saveTempVaultData, setErr} =
  launchReducer.actions;
