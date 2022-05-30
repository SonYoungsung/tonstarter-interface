import {Box, Flex, useColorMode, useTheme, Image} from '@chakra-ui/react';
import arrowLeft from 'assets/svgs/arrow_left_normal_icon.svg';
import arrowLeftDark from 'assets/launch/arrow-left-normal-icon.svg';
import arrowHoverLeft from 'assets/launch/arrow-left-hover-icon.svg';
import arrowRight from 'assets/svgs/arrow_right_normal_icon.svg';
import arrowRightDark from 'assets/launch/arrow-right-normal-icon.svg';
import arrowHoverRight from 'assets/launch/arrow-right-hover-icon.svg';
import VaultCard from '../common/VaultCard';
import {useFormikContext} from 'formik';
import {useState} from 'react';
import {Projects, Vault} from '@Launch/types';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {changeVault, selectLaunch} from '@Launch/launch.reducer';
import {motion} from 'framer-motion';
import AddVaultCard from '@Launch/components/common/AddVaultCard';
import HoverImage from 'components/HoverImage';

const Vaults = () => {
  const theme = useTheme();
  const {colorMode} = useColorMode();
  const {values} = useFormikContext<Projects['CreateProject']>();
  const vaultsList = values.vaults;
  const dispatch = useAppDispatch();
  const [transX, setTransX] = useState<number>(0);
  const [flowIndex, setFlowIndex] = useState<number>(6);
  const [leftIndex, setLeftIndex] = useState<number>(0);
  const {
    data: {selectedVaultIndex},
  } = useAppSelector(selectLaunch);

  return (
    <Flex
      w={'100%'}
      bg={colorMode === 'light' ? 'white.100' : 'none'}
      flexDir="column">
      <Box d="flex" h={'220px'} px={'15px'} justifyContent="space-between">
        <HoverImage
          img={colorMode === 'light' ? arrowLeft : arrowLeftDark}
          hoverImg={arrowHoverLeft}
          action={() => {
            if (leftIndex !== 0) {
              setTransX(transX + 165);
              setFlowIndex(flowIndex - 1);
              setLeftIndex(leftIndex - 1);
            }
            // setTransX(transX + 165);
            // setFlowIndex(flowIndex - 1);
          }}></HoverImage>
        <Flex
          w={'100%'}
          alignItems="center"
          mx={'10px'}
          px={'5px'}
          overflow={'hidden'}>
          <motion.div
            animate={{x: transX}}
            style={{display: 'flex', width: '100%'}}>
            {vaultsList?.map((vault: Vault, index: number) => {
              const {
                vaultName,
                vaultTokenAllocation,
                isMandatory,
                adminAddress,
                vaultType,
                index: vaultIndex,
              } = vault;
              const strVaultTokenAllocation =
                vaultTokenAllocation?.toString() || '0';
              return (
                <Box
                  // mr={(index + 1) % 3 !== 0 ? '20px' : 0}
                  mr={'18px'}
                  onClick={() =>
                    dispatch(
                      changeVault({
                        data: vaultName,
                        vaultType,
                        vaultIndex,
                      }),
                    )
                  }>
                  <VaultCard
                    key={`${vaultName}_${vaultTokenAllocation}`}
                    status={vaultName === 'Public' ? 'public' : 'notPublic'}
                    name={
                      vaultType === 'Liquidity Incentive' &&
                      isMandatory === true
                        ? `${values.tokenName}-TOS LP Reward *`
                        : isMandatory === true
                        ? `${vaultName} *`
                        : vaultName
                    }
                    tokenAllocation={strVaultTokenAllocation}
                    isMandatory={isMandatory}
                    adminAddress={adminAddress}
                    vaultIndex={vaultIndex}></VaultCard>
                </Box>
              );
            })}
            <Box
            // onClick={() => dispatch(changeVault({ data: vaultName }))}
            >
              <AddVaultCard></AddVaultCard>
            </Box>
          </motion.div>
        </Flex>
        <HoverImage
          img={colorMode === 'light' ? arrowRight : arrowRightDark}
          hoverImg={arrowHoverRight}
          action={() => {
            if (flowIndex <= vaultsList.length) {
              setTransX(transX - 165);
              setFlowIndex(flowIndex + 1);
              setLeftIndex(leftIndex + 1);
            }
            // setTransX(transX - 165);
            // setFlowIndex(flowIndex + 1);
          }}></HoverImage>
        {/* <Image
          cursor={'pointer'}
          src={arrowRight}
          w={'24px'}
          h={'48px'}
          alignSelf="center"
          onClick={() => setTransX(transX - 165)}
        /> */}
      </Box>
      <Box
        d="flex"
        alignItems={'center'}
        justifyContent="center"
        mt={'25px'}
        mb={'4px'}>
        {vaultsList?.map((vault: Vault, index: number) => {
          const {
            vaultName,

            vaultType,
            index: vaultIndex,
          } = vault;
          return (
            <Box
              w={'8px'}
              h={'8px'}
              borderRadius={25}
              bg={selectedVaultIndex === index ? 'blue.100' : '#dfe4ee'}
              mr={'8px'}
              _hover={{cursor: 'pointer'}}
              onClick={() => {
                console.log(transX);
                
                // setTransX(transX - 165);
                dispatch(
                  changeVault({
                    data: vaultName,
                    vaultType,
                    vaultIndex,
                  }),
                );
              }}></Box>
          );
        })}
      </Box>
    </Flex>
  );
};

export default Vaults;
