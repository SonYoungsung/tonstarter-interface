import React, {FC, HTMLAttributes, useEffect, useState} from 'react';
import {WalletModal} from 'components/Wallet';
import {useDisclosure} from '@chakra-ui/react';
import {useWeb3React} from '@web3-react/core';
import {Header} from 'components/Header';
import {Footer} from 'components/Footer';
import {FLDstarter} from './FLDstarter';
import {Pools} from './Pools';
import {Staking} from './Staking';
import {Switch, Route} from 'react-router-dom';
import {useAppDispatch} from 'hooks/useRedux';
import {fetchAppConfig} from 'store/app/app.reducer';
import {fetchUserInfo} from 'store/app/user.reducer';
import {fetchStakes} from './Staking/staking.reducer';
import {useContract} from 'hooks/useContract';
import {REACT_APP_STAKE1_PROXY} from 'constants/index';
import * as StakeLogic from 'services/abis/Stake1Logic.json';
import {useWindowDimensions} from 'hooks/useWindowDimentions';

export interface RouterProps extends HTMLAttributes<HTMLDivElement> {}

export const Router: FC<RouterProps> = () => {
  const dispatch = useAppDispatch();
  // const toast = useToast();
  // const {data, loading, error} = useSelector(selectStakes);
  const [walletState, setWalletState] = useState<string>('');
  const {onOpen, isOpen: isModalOpen, onClose} = useDisclosure();
  const {account, chainId, library} = useWeb3React();
  const stakeRegistryContract = useContract(
    REACT_APP_STAKE1_PROXY,
    StakeLogic.abi,
  );
  useEffect(() => {
    if (account && chainId) {
      // @ts-ignore
      dispatch(fetchAppConfig({chainId}));
      // @ts-ignore
      dispatch(fetchUserInfo({address: account, library}));
    }
  }, [chainId, account, library, dispatch]);

  useEffect(() => {
    dispatch(
      fetchStakes({
        contract: stakeRegistryContract,
        library,
        account,
        chainId,
      }) as any,
    );
  }, [stakeRegistryContract, dispatch, library, account, chainId]);
  const handleWalletModalOpen = (state: string) => {
    setWalletState(state);
    onOpen();
  };

  // if (error) {
  //   toast({
  //     description: data.
  //   })
  // }

  const {width} = useWindowDimensions();
  console.log(width);

  if (width < 400) {
    return <div>gogo</div>;
  }

  return (
    <>
      <Header
        account={account}
        walletopen={() => handleWalletModalOpen('wallet')}
      />
      <Switch>
        <Route exact path="/" component={FLDstarter} />
        <Route exact path="/pools" component={Pools} />
        <Route exact path="/staking" component={Staking} />
        {/* <Route exact path="/starter" component={Starter} /> */}
        {/* <Route exact path="/dao" component={DAO} /> */}
      </Switch>
      <Footer />
      <WalletModal state={walletState} isOpen={isModalOpen} onClose={onClose} />
    </>
  );
};
