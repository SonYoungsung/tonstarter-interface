import {Contract} from '@ethersproject/contracts';
import * as StakeTON from 'services/abis/StakeTON.json';
import {getContract} from 'utils/contract';
import store from 'store';
import {convertNumber} from 'utils/number';
import {BASE_PROVIDER, DEPLOYED} from 'constants/index';
import * as ERC20 from 'services/abis/ERC20.json';
import * as TOSABI from 'services/abis/TOS.json';
import * as LockTOSABI from 'services/abis/LockTOS.json';
import {BigNumber} from 'ethers';

const {TON_ADDRESS, TOS_ADDRESS} = DEPLOYED;

export const getUserBalance = async (contractAddress: any) => {
  const user = store.getState().user.data;
  const {address: account, library} = user;
  if (account === undefined || null) {
    return;
  }
  const {userStaked, myClaimed, userRewardTOS} = await fetchUserData(
    library,
    account,
    contractAddress,
  );
  const result = {
    rewardTosBalance: convertNumber({amount: userRewardTOS}),
    rewardTonBalance: undefined,
    totalStakedBalance: convertNumber({amount: userStaked}),
    claimedBalance: convertNumber({amount: myClaimed}),
  };
  return result;
};

export const getUserTonBalance = async ({account, library}: any) => {
  const contract = getContract(TON_ADDRESS, ERC20.abi, library);
  const contractIserBalance = await contract.balanceOf(account);
  const balance = convertNumber({amount: String(contractIserBalance)});
  return balance;
};

export const getUserTOSStaked = async ({account, library}: any) => {
  const {LockTOS_ADDRESS} = DEPLOYED;
  const LockTOSContract = new Contract(
    LockTOS_ADDRESS,
    LockTOSABI.abi,
    library,
  );
  const tosStakeList = await LockTOSContract.locksOf(account);
  if (tosStakeList.length === 0) {
    return '0.00';
  }
  const result = tosStakeList.reduce((acc: any, cur: any) => {
    console.log(acc);
    console.log(convertNumber({amount: acc}));
    console.log(convertNumber({amount: cur}));
    return acc + convertNumber({amount: cur});
  });

  return '-';
};

export const getUserSTOSBalance = async ({account, library}: any) => {
  const {LockTOS_ADDRESS} = DEPLOYED;
  const LockTOSContract = new Contract(
    LockTOS_ADDRESS,
    LockTOSABI.abi,
    library,
  );
  console.log(LockTOSContract);
  const res = await LockTOSContract.balanceOf(account);
  return convertNumber({amount: res});
};

const fetchUserData = async (
  library: any,
  account: string,
  contractAddress: string,
) => {
  const res = await getUserInfo(library, account, contractAddress);
  const {userStaked, myClaimed, userRewardTOS} = res;
  return {
    userStaked,
    myClaimed,
    userRewardTOS,
  };
};

export const getUserTosBalance = async (account: string, library: any) => {
  const contract = getContract(TOS_ADDRESS, TOSABI.abi, library);
  const userTosBalance = await contract.balanceOf(account);
  const balance = convertNumber({amount: String(userTosBalance)});
  return balance;
};

const getUserInfo = async (
  library: any,
  account: string,
  contractAddress: string,
) => {
  const StakeTONContract = new Contract(contractAddress, StakeTON.abi, library);
  const currentBlock = await BASE_PROVIDER.getBlockNumber();
  return Promise.all([
    StakeTONContract.userStaked(account),
    StakeTONContract.canRewardAmount(account, currentBlock),
  ]).then((result) => {
    return {
      userStaked: result[0].amount,
      myClaimed: result[0].claimedAmount,
      userRewardTOS: result[1],
    };
  });
};

export const getTotalStakers = async (
  contractAddress: string,
  library: any,
) => {
  const StakeTONContract = new Contract(contractAddress, StakeTON.abi, library);
  const result = await StakeTONContract.totalStakers();
  return String(BigNumber.from(result).toNumber());
};
