import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './reducers';

export type ModalType =
  | 'stake'
  | 'unstake'
  | 'claim'
  | 'manage'
  | 'stakeL2'
  | 'unstakeL2'
  | 'withdraw'
  | 'swap';

export type Modal = {
  modal?: ModalType;
  data?: any;
};

interface IModal {
  data: Modal;
}

type ModalPayload = {
  type: ModalType;
  data?: any;
};

const initialState = {
  data: {
    modal: undefined,
    data: {},
  },
} as IModal;

export const modalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, {payload}: PayloadAction<ModalPayload>) => {
      state.data.modal = payload.type;
      state.data.data = payload.data;
    },
    closeModal: state => {
      state.data.modal = undefined;
      state.data.data = {};
    },
  },
});

export const selectModalType = (state: RootState) => state.modal;
export const {openModal, closeModal} = modalReducer.actions;
