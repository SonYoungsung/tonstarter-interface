import { getSigner } from 'utils/contract';
import {Contract} from '@ethersproject/contracts';
import store from 'store';
import {setTxPending} from 'store/tx.reducer';
import {DEPLOYED} from 'constants/index';
import {toastWithReceipt} from 'utils';
import {openToast} from 'store/app/toast.reducer';
import * as StakeUniswapABI from 'services/abis/StakeUniswapV3.json';

type Unstake = {
  tokenId: string;
  userAddress: string | null | undefined;
  contractAddress: string | null | undefined;
  library: any;
  handleCloseModal: any;
}
const {NPM_Address, UniswapStaking_Address} = DEPLOYED;

export const unstake = async (args: Unstake) => {
  const { userAddress, contractAddress, tokenId, library } = args;
  if (userAddress === null || userAddress === undefined) {
    return;
  }
  const StakeUniswap = new Contract(UniswapStaking_Address, StakeUniswapABI.abi, library);
  const signer = getSigner(library, userAddress);
  console.log(StakeUniswap);
  try {
    const receipt = await StakeUniswap.connect(signer)?.withdraw(tokenId)
    store.dispatch(setTxPending({tx: true}));
    if (receipt) {
      toastWithReceipt(receipt, setTxPending);
    }
  } catch (err) {
    console.log(err);
    store.dispatch(setTxPending({tx: false}));
    store.dispatch(
      //@ts-ignore
      openToast({
        payload: {
          status: 'error',
          title: 'Tx fail to send',
          description: `something went wrong`,
          duration: 5000,
          isClosable: true,
        },
      }),
    );
  }
}