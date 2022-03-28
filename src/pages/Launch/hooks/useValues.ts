import {useState} from 'react';
import type {Projects, VaultC} from '@Launch/types';
import moment from 'moment';

const nowTimeStamp = moment().unix();

const defaultParams = [
  {claimRound: 1, claimTime: nowTimeStamp, claimTokenAllocation: 0},
];

const initialObj: Projects['CreateProject'] = {
  projectName: '',
  description: '',
  tokenName: '',
  tokenSymbol: '',
  totalSupply: undefined,
  ownerAddress: '',
  owner: '',
  isTokenDeployed: false,
  isTokenDeployedErr: false,
  isAllDeployed: false,
  tokenAddress: '',
  projectTokenPrice: 0,
  totalTokenAllocation: 0,
  vaults: [
    {
      vaultName: 'Public',
      vaultType: 'Public',
      vaultTokenAllocation: 0,
      adminAddress: '',
      isMandatory: true,
      claim: defaultParams,
      vaultAddress: undefined,
      tokenAllocationForLiquidity: undefined,
      hardCap: undefined,
      addressForReceiving: '',
      stosTier: {
        oneTier: {
          requiredStos: undefined,
          allocatedToken: undefined,
        },
        twoTier: {
          requiredStos: undefined,
          allocatedToken: undefined,
        },
        threeTier: {
          requiredStos: undefined,
          allocatedToken: undefined,
        },
        fourTier: {
          requiredStos: undefined,
          allocatedToken: undefined,
        },
      },
      snapshot: undefined,
      whitelist: undefined,
      whitelistEnd: undefined,
      publicRound1: undefined,
      publicRound1End: undefined,
      publicRound2: undefined,
      publicRound2End: undefined,
      publicRound1Allocation: undefined,
      publicRound2Allocation: undefined,
      claimStart: undefined,
      index: 0,
    },
    {
      vaultName: 'LP',
      vaultType: 'LP',
      vaultTokenAllocation: 0,
      adminAddress: '',
      isMandatory: true,
      claim: defaultParams,
      vaultAddress: undefined,
      index: 1,
    },
    {
      vaultName: 'TON Staker',
      vaultType: 'TON Staker',
      vaultTokenAllocation: 0,
      adminAddress: '',
      isMandatory: true,
      claim: defaultParams,
      vaultAddress: undefined,
      index: 2,
    },
    {
      vaultName: 'TOS Staker',
      vaultType: 'TOS Staker',
      vaultTokenAllocation: 0,
      adminAddress: '',
      isMandatory: true,
      claim: defaultParams,
      vaultAddress: undefined,
      index: 3,
    },
    {
      vaultName: 'WTON-TOS LP Reward',
      vaultType: 'WTON-TOS LP Reward',
      vaultTokenAllocation: 0,
      adminAddress: '',
      isMandatory: true,
      claim: defaultParams,
      vaultAddress: undefined,
      index: 4,
    },
  ],
};

const initialVaultValue: VaultC = {
  adminAddress: '',
  isMandatory: false,
  claim: defaultParams,
  vaultName: '',
  vaultTokenAllocation: 0,
  vaultAddress: undefined,
  vaultType: 'C',
  index: 5,
};

const useValues = () => {
  const [initialValues, setInitialValues] =
    useState<Projects['CreateProject']>(initialObj);

  return {initialValues, setInitialValues, defaultParams, initialVaultValue};
};

export default useValues;
