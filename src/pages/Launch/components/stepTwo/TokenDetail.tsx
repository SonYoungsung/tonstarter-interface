import {Flex, Grid, GridItem, Text, useColorMode} from '@chakra-ui/react';
import {useTheme} from '@emotion/react';
import useTokenDetail from '@Launch/hooks/useTokenDetail';
import {saveTempVaultData, selectLaunch} from '@Launch/launch.reducer';
import {
  Projects,
  PublicTokenColData,
  VaultCommon,
  VaultLiquidityIncentive,
  VaultPublic,
} from '@Launch/types';
import {useFormikContext} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {useEffect, useMemo, useState} from 'react';
import InputField from './InputField';
import useVaultSelector from '@Launch/hooks/useVaultSelector';
import commafy from 'utils/commafy';
import {shortenAddress} from 'utils';
import DoubleCalendarPop from '../common/DoubleCalendarPop';
import SingleCalendarPop from '../common/SingleCalendarPop';
import {useContract} from 'hooks/useContract';
import {DEPLOYED} from 'constants/index';
import InitialLiquidityComputeAbi from 'services/abis/Vault_InitialLiquidityCompute.json';
import {convertTimeStamp} from 'utils/convertTIme';
import {values} from 'lodash';

export const MainTitle = (props: {leftTitle: string; rightTitle: string}) => {
  const {leftTitle, rightTitle} = props;
  return (
    <Flex
      pl={'25px'}
      pr={'20px'}
      h={'60px'}
      alignItems="center"
      justifyContent={'space-between'}
      borderBottom={'solid 1px #e6eaee'}
      fontWeight={600}>
      <Text fontSize={14}>{leftTitle}</Text>
      <Text>{rightTitle}</Text>
    </Flex>
  );
};

const SubTitle = (props: {
  leftTitle: string;
  rightTitle: string | undefined;
  isLast?: boolean;
  percent?: number | undefined;
  isEdit: boolean;
  isSecondColData?: boolean;
  formikName: string;
}) => {
  const {
    leftTitle,
    rightTitle,
    isLast,
    percent,
    isEdit,
    isSecondColData,
    formikName,
  } = props;
  const [inputVal, setInputVal] = useState<number | string>(
    //@ts-ignore
    rightTitle,
  );
  const {values, setFieldValue} = useFormikContext<Projects['CreateProject']>();
  const {vaults} = values;
  const publicVault = vaults[0] as VaultPublic;
  // useEffect(() => {
  //   setInputVal(String(rightTitle)?.replaceAll(' TON', '') as string);
  // }, [isEdit, rightTitle]);

  function getTimeStamp() {
    switch (
      leftTitle as
        | 'Snapshot'
        | 'Whitelist'
        | 'Public Round 1'
        | 'Public Round 2'
    ) {
      case 'Snapshot': {
        return publicVault.snapshot;
      }
      case 'Whitelist': {
        return [publicVault.whitelist, publicVault.whitelistEnd];
      }
      case 'Public Round 1': {
        return [publicVault.publicRound1, publicVault.publicRound1End];
      }
      case 'Public Round 2': {
        return [publicVault.publicRound2, publicVault.publicRound2End];
      }
      default:
        return 0;
    }
  }

  const [dateRange, setDateRange] = useState<number | undefined[]>(
    getTimeStamp() as number | undefined[],
  );
  const [claimDate, setClaimDate] = useState<number | undefined>(
    getTimeStamp() as number | undefined,
  );

  const dispatch = useAppDispatch();
  const {
    data: {tempVaultData},
  } = useAppSelector(selectLaunch);

  //@ts-ignore
  useEffect(() => {
    //Put timestamp
    switch (
      leftTitle as
        | 'Snapshot'
        | 'Whitelist'
        | 'Public Round 1'
        | 'Public Round 2'
    ) {
      case 'Snapshot': {
        return dispatch(
          saveTempVaultData({
            data: {
              ...tempVaultData,
              snapshot: claimDate,
            },
          }),
        );
      }
      case 'Whitelist': {
        return dispatch(
          saveTempVaultData({
            data: {
              ...tempVaultData,
              //@ts-ignore
              whitelist: dateRange[0],
              //@ts-ignore
              whitelistEnd: dateRange[1],
            },
          }),
        );
      }
      case 'Public Round 1': {
        return dispatch(
          saveTempVaultData({
            data: {
              ...tempVaultData,
              //@ts-ignore
              publicRound1: dateRange[0],
              //@ts-ignore
              publicRound1End: dateRange[1],
            },
          }),
        );
      }
      case 'Public Round 2': {
        return dispatch(
          saveTempVaultData({
            data: {
              ...tempVaultData,
              //@ts-ignore
              publicRound2: dateRange[0],
              //@ts-ignore
              publicRound2End: dateRange[1],
            },
          }),
        );
      }
      default:
        break;
    }
    /*eslint-disable*/
  }, [dateRange, claimDate, leftTitle]);

  let tempValueKey = () => {
    switch (leftTitle) {
      case 'Snapshot':
        return {key0: 'snapshot'};
      case 'Whitelist':
        return {
          key0: 'whitelist',
          key1: 'whitelistEnd',
        };
      case 'Public Round 1':
        return {
          key0: 'publicRound1',
          key1: 'publicRound1End',
        };
      case 'Public Round 2':
        return {
          key0: 'publicRound2',
          key1: 'publicRound2End',
        };
        defaut: break;
    }
  };

  return (
    <Flex
      pl={'25px'}
      pr={'20px'}
      h={'60px'}
      alignItems="center"
      justifyContent={'space-between'}
      borderBottom={isLast ? '' : 'solid 1px #e6eaee'}
      fontWeight={600}>
      <Text color={'#7e8993'} w={'101px'}>
        {leftTitle}
      </Text>
      {isEdit ? (
        isSecondColData ? (
          <Flex>
            <Flex flexDir={'column'} textAlign={'right'} mr={'8px'}>
              <Text>
                {
                  //@ts-ignore
                  tempVaultData[tempValueKey()?.key0]
                    ? convertTimeStamp(
                        //@ts-ignore
                        tempVaultData[tempValueKey()?.key0],
                        'YYYY.MM.DD HH:mm:ss',
                      )
                    : rightTitle?.split('~')[0] || '-'
                }
              </Text>

              {leftTitle !== 'Snapshot' && (
                <Text>
                  {
                    //@ts-ignore
                    tempVaultData[tempValueKey()?.key1]
                      ? `~ ${convertTimeStamp(
                          //@ts-ignore
                          tempVaultData[tempValueKey()?.key1],
                          'MM.DD HH:mm:ss',
                        )}`
                      : `~ ${rightTitle?.split('~')[1]}` || '-'
                  }
                </Text>
              )}
            </Flex>
            {leftTitle !== 'Snapshot' ? (
              <DoubleCalendarPop setDate={setDateRange}></DoubleCalendarPop>
            ) : (
              <SingleCalendarPop setDate={setClaimDate}></SingleCalendarPop>
            )}
          </Flex>
        ) : (
          <InputField
            w={120}
            h={32}
            fontSize={13}
            value={inputVal}
            setValue={setInputVal}
            formikName={formikName}
            // numberOnly={
            //   leftTitle !== 'Address for receiving funds' &&
            //   !leftTitle.includes('Pool Address')
            // }
          ></InputField>
        )
      ) : String(rightTitle)?.includes('~') ? (
        <Flex flexDir={'column'} textAlign={'right'}>
          <Text>{String(rightTitle).split('~')[0]}</Text>
          <Text>~ {String(rightTitle).split('~')[1]}</Text>
        </Flex>
      ) : (
        <Flex>
          <Text textAlign={'right'}>
            {String(rightTitle)?.includes('undefined')
              ? '-'
              : rightTitle && rightTitle.length > 20
              ? shortenAddress(rightTitle as string)
              : String(leftTitle).includes('Pair') ||
                String(leftTitle).includes('fee')
              ? '-'
              : `${commafy(rightTitle)} ${
                  leftTitle !== 'Hard Cap' ? values.tokenName : 'TON'
                }` || '-'}
          </Text>
          {percent !== undefined && (
            <Text ml={'5px'} color={'#7e8993'} textAlign={'right'}>
              {`(${percent.toFixed(3).replace(/\.(\d\d)\d?$/, '.$1') || '-'}%)`}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};

const STOSTier = (props: {
  tier: string;
  requiredTos: number | undefined;
  allocatedToken: number | undefined;
  isLast?: boolean;
  isEdit: boolean;
}) => {
  const {tier, requiredTos, allocatedToken, isLast, isEdit} = props;
  const [inputVal, setInputVal] = useState(requiredTos);
  const [inputVal2, setInputVal2] = useState(allocatedToken);

  // useEffect(() => {
  //   setInputVal(inputVal);
  // }, [isEdit, props]);

  return (
    <Flex
      h={'60px'}
      alignItems="center"
      textAlign={'center'}
      borderBottom={isLast ? '' : 'solid 1px #e6eaee'}
      fontWeight={600}>
      <Text color={'#7e8993'} w={'80px'}>
        {tier}
      </Text>
      {isEdit ? (
        <>
          <Flex w={'125px'} justifyContent="center">
            <InputField
              w={85}
              h={32}
              fontSize={13}
              value={inputVal}
              setValue={setInputVal}
              isStosTier={true}
              formikName={'requiredStos'}
              stosTierLevel={Number(tier) as 1 | 2 | 3 | 4}></InputField>
          </Flex>
          <Flex w={'137px'} justifyContent="center">
            <InputField
              w={85}
              h={32}
              fontSize={13}
              value={inputVal2}
              setValue={setInputVal2}
              isStosTier={true}
              stosTierLevel={Number(tier) as 1 | 2 | 3 | 4}
              formikName={'allocatedToken'}></InputField>
          </Flex>
        </>
      ) : (
        <>
          <Text w={'125px'}>{commafy(requiredTos) || '-'}</Text>
          <Text w={'137px'}>{commafy(allocatedToken) || '-'}</Text>
        </>
      )}
    </Flex>
  );
};

const PublicTokenDetail = (props: {
  firstColData:
    | PublicTokenColData['firstColData']
    | PublicTokenColData['liquidityColData']
    | null;
  secondColData: PublicTokenColData['secondColData'] | null;
  thirdColData: PublicTokenColData['thirdColData'] | null;
  isEdit: boolean;
}) => {
  const theme = useTheme();
  //@ts-ignore
  const {OpenCampaginDesign} = theme;
  const {colorMode} = useColorMode();
  const {firstColData, secondColData, thirdColData, isEdit} = props;
  const {values} = useFormikContext<Projects['CreateProject']>();
  // const publicVaultValue = vaults.filter((vault: VaultCommon) => {
  //   return vault.vaultName === 'Public';
  // });
  const {selectedVaultDetail} = useVaultSelector();
  const vaults = values.vaults;

  return (
    <Grid
      {...OpenCampaginDesign.border({colorMode})}
      w={'100%'}
      templateColumns="repeat(3, 1fr)"
      fontSize={13}>
      <GridItem>
        <MainTitle
          leftTitle="Token"
          rightTitle={`${commafy(selectedVaultDetail?.vaultTokenAllocation)} ${
            values.tokenName
          }`}></MainTitle>
        {firstColData?.map(
          (
            data: {
              title: string;
              content: string | undefined;
              percent?: number | undefined;
              formikName: string;
            },
            index: number,
          ) => {
            const {title, content, percent, formikName} = data;
            return (
              <SubTitle
                key={title}
                leftTitle={title}
                rightTitle={content}
                isLast={index + 1 === firstColData.length}
                percent={percent}
                isEdit={isEdit}
                formikName={formikName}></SubTitle>
            );
          },
        )}
        {firstColData === null && (
          <Flex
            alignItems={'center'}
            justifyContent="center"
            h={'60px'}
            fontSize={13}
            color={'#808992'}
            fontWeight={600}>
            <Text>There is no Token value.</Text>
          </Flex>
        )}
      </GridItem>
      <GridItem borderX={'solid 1px #e6eaee'}>
        <MainTitle leftTitle="Schedule" rightTitle="KST"></MainTitle>
        {secondColData?.map(
          (data: {title: string; content: string; formikName: string}) => {
            const {title, content, formikName} = data;
            return (
              <SubTitle
                key={title}
                leftTitle={title}
                rightTitle={content}
                isEdit={isEdit}
                isSecondColData={true}
                formikName={formikName}></SubTitle>
            );
          },
        )}
        {secondColData === null && (
          <Flex
            alignItems={'center'}
            justifyContent="center"
            h={
              firstColData?.length !== undefined
                ? `${firstColData.length * 60}px`
                : '60px'
            }
            fontSize={13}
            color={'#808992'}
            fontWeight={600}>
            <Text>There is no Schedule value.</Text>
          </Flex>
        )}
      </GridItem>
      <GridItem>
        <MainTitle leftTitle="sTOS Tier" rightTitle=""></MainTitle>
        {thirdColData && (
          <Flex
            h={'60px'}
            alignItems="center"
            textAlign={'center'}
            borderBottom={'solid 1px #e6eaee'}
            fontWeight={600}
            color={'#7e8993'}
            fontSize={13}>
            <Text w={'80px'}>Tier</Text>
            <Text w={'125px'}>Required TOS</Text>
            <Text w={'137px'}>Allocated Token</Text>
          </Flex>
        )}
        {thirdColData?.map((data: any, index: number) => {
          const {tier, requiredTos, allocatedToken} = data;
          return (
            <STOSTier
              key={tier}
              tier={tier}
              requiredTos={requiredTos}
              allocatedToken={allocatedToken}
              isLast={index + 1 === thirdColData.length}
              isEdit={isEdit}></STOSTier>
          );
        })}
        {thirdColData === null && (
          <Flex
            alignItems={'center'}
            justifyContent="center"
            h={
              firstColData?.length !== undefined
                ? `${firstColData.length * 60}px`
                : '60px'
            }
            fontSize={13}
            color={'#808992'}
            fontWeight={600}>
            <Text>There is no sTOS Tier value.</Text>
          </Flex>
        )}
      </GridItem>
    </Grid>
  );
};

const TokenDetail = (props: {isEdit: boolean}) => {
  const {isEdit} = props;
  const {
    data: {selectedVaultType, selectedVault},
  } = useAppSelector(selectLaunch);
  const {InitialLiquidityVault} = DEPLOYED;
  const InitialLiquidity_CONTRACT = useContract(
    InitialLiquidityVault,
    InitialLiquidityComputeAbi.abi,
  );
  const {TOS_ADDRESS} = DEPLOYED;
  const {values} = useFormikContext<Projects['CreateProject']>();
  const [poolAddress, setPoolAddress] = useState<string>('');

  // useEffect(() => {
  //   async function getPoolAddress() {
  //     const poolAddress = await InitialLiquidity_CONTRACT?.computePoolAddress(
  //       TOS_ADDRESS,
  //       values.tokenAddress,
  //       3000,
  //     );
  //     setPoolAddress(poolAddress);
  //   }
  //   if (values.tokenAddress) {
  //     getPoolAddress();
  //   }
  // }, [values.tokenAddress, TOS_ADDRESS]);

  const {publicTokenColData} = useTokenDetail();
  const VaultTokenDetail = useMemo(() => {
    switch (selectedVaultType) {
      case 'Public':
        if (publicTokenColData) {
          return (
            <PublicTokenDetail
              firstColData={publicTokenColData.firstColData}
              secondColData={publicTokenColData.secondColData}
              thirdColData={publicTokenColData.thirdColData}
              isEdit={isEdit}></PublicTokenDetail>
          );
        }
        return null;
      case 'Initial Liquidity': {
        const thisVault: VaultLiquidityIncentive = values.vaults.filter(
          //@ts-ignore
          (vault: VaultLiquidityIncentive) => vault.vaultName === selectedVault,
        )[0] as VaultLiquidityIncentive;
        return (
          <PublicTokenDetail
            firstColData={[
              {
                title: 'Select Pair',
                content: thisVault.tokenPair,
                formikName: 'tokenPair',
              },
              {
                title: 'Pool Address\n(0.3% fee)',
                content: thisVault.poolAddress,
                formikName: 'poolAddress',
              },
            ]}
            secondColData={null}
            thirdColData={null}
            isEdit={isEdit}></PublicTokenDetail>
        );
      }
      case 'TON Staker':
        return (
          <PublicTokenDetail
            firstColData={null}
            secondColData={null}
            thirdColData={null}
            isEdit={isEdit}></PublicTokenDetail>
        );
      case 'TOS Staker':
        return (
          <PublicTokenDetail
            firstColData={null}
            secondColData={null}
            thirdColData={null}
            isEdit={isEdit}></PublicTokenDetail>
        );
      case 'WTON-TOS LP Reward':
        return (
          <PublicTokenDetail
            firstColData={null}
            secondColData={null}
            thirdColData={null}
            isEdit={isEdit}></PublicTokenDetail>
        );
      case 'C':
        return (
          <PublicTokenDetail
            firstColData={null}
            secondColData={null}
            thirdColData={null}
            isEdit={isEdit}></PublicTokenDetail>
        );
      case 'DAO':
        return (
          <PublicTokenDetail
            firstColData={null}
            secondColData={null}
            thirdColData={null}
            isEdit={isEdit}></PublicTokenDetail>
        );
      case 'Liquidity Incentive':
        const thisVault: VaultLiquidityIncentive = values.vaults.filter(
          //@ts-ignore
          (vault: VaultLiquidityIncentive) => vault.vaultName === selectedVault,
        )[0] as VaultLiquidityIncentive;
        return (
          <PublicTokenDetail
            firstColData={[
              {
                title: 'Select Pair',
                content: thisVault?.tokenPair,
                formikName: 'tokenPair',
              },
              {
                title: 'Pool Address\n(0.3% fee)',
                content: thisVault?.poolAddress,
                formikName: 'poolAddress',
              },
            ]}
            secondColData={null}
            thirdColData={null}
            isEdit={isEdit}></PublicTokenDetail>
        );
      default:
        return <>no container for this vault :(</>;
    }
  }, [selectedVaultType, isEdit, publicTokenColData]);

  return VaultTokenDetail;

  //   return <>{isEdit ? VaultTokenDetailEdit : VaultTokenDetail}</>;
};

export default TokenDetail;
