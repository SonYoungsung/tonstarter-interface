import {FC, useState, useMemo, useEffect, useRef} from 'react';
import {
  Text,
  Flex,
  Select,
  Box,
  useColorMode,
  useTheme,
  Grid,
  IconButton,
  Tooltip,
  Center,
} from '@chakra-ui/react';
import {useAppSelector} from 'hooks/useRedux';
import {getPoolName} from '../../utils/token';
import {CreateReward} from './components/CreateReward';
import {RewardProgramCardManage} from './components/RewardProgramCardManage';
import {ChevronRightIcon, ChevronLeftIcon} from '@chakra-ui/icons';

import {
  chakra,
  // useTheme
} from '@chakra-ui/react';
type Pool = {
  id: string;
  liquidity: string;
  poolDayData: [];
  tick: string;
  token0: Token;
  token1: Token;
};
type Token = {
  id: string;
  symbol: string;
};
type ManageContainerProps = {
  rewards: any[];
  position?: string;
  pool: Pool;
};

export const ManageContainer: FC<ManageContainerProps> = ({
  rewards,
  pool,
  position,
}) => {

  const [pageOptions, setPageOptions] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(6);
  useEffect(() => {
    const pagenumber = parseInt(
      ((rewards.length - 1) / pageLimit + 1).toString(),
    );
    setPageOptions(pagenumber);
    //  rewards.map((reward: any) => {
    //    if (reward.poolAddress === pool.id) {
    //      reward.token0 = pool.token0;
    //      reward.token1 = pool.token1;
    //    }
    //  })
  }, [rewards, pageLimit]);

  const getPaginatedData = () => {
    const startIndex = pageIndex * pageLimit - pageLimit;
    const endIndex = startIndex + pageLimit;
    return rewards.slice(startIndex, endIndex);
  };

  const goToNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const gotToPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };

  const {colorMode} = useColorMode();
  const theme = useTheme();

  return (
    <Flex justifyContent={'space-between'}>
      <Flex flexWrap={'wrap'}>
        <Grid templateColumns="repeat(2, 1fr)" gap={30}>
          {getPaginatedData().map((reward: any, index) => {
            let token0;
            let token1;
            if (reward.poolAddress === pool.id) {
              token0 = pool.token0.id;
              token1 = pool.token1.id;
            } else {
              token0 = '0x0000000000000000000000000000000000000000';
              token1 = '0x73a54e5C054aA64C1AE7373C2B5474d8AFEa08bd';
            }

            const rewardProps = {
              chainId: reward.chainId,
              poolName: reward.poolName,
              token0Address: token0,
              token1Address: token1,
              poolAddress: reward.poolAddress,
              rewardToken: reward.rewardToken,
              incentiveKey: reward.incentiveKey,
              startTime: reward.startTime,
              endTime: reward.endTime,
              allocatedReward: reward.allocatedReward,
              numStakers: reward.numStakers,
              status: reward.status,
            };
            return (
              <RewardProgramCardManage
                key={index}
                reward={rewardProps}
                selectedToken={Number(position)}
              />
            );
          })}
        </Grid>
        <Flex mt={'22px'} position={'relative'}>
          <Flex flexDirection={'row'} h={'25px'} alignItems={'center'}>
            <Flex>
              <Tooltip label="Previous Page">
                <IconButton
                  minW={'24px'}
                  h={'24px'}
                  bg={colorMode === 'light' ? 'white.100' : 'none'}
                  border={
                    colorMode === 'light'
                      ? 'solid 1px #e6eaee'
                      : 'solid 1px #424242'
                  }
                  color={colorMode === 'light' ? '#e6eaee' : '#424242'}
                  borderRadius={4}
                  aria-label={'Previous Page'}
                  onClick={gotToPreviousPage}
                  isDisabled={pageIndex === 1}
                  size={'sm'}
                  mr={4}
                  _hover={{borderColor: '#2a72e5', color: '#2a72e5'}}
                  icon={<ChevronLeftIcon h={6} w={6} />}
                />
              </Tooltip>
            </Flex>
            <Flex
              alignItems="center"
              p={0}
              fontSize={'13px'}
              fontFamily={theme.fonts.roboto}
              color={colorMode === 'light' ? '#3a495f' : '#949494'}>
              <Text flexShrink={0}>
                Page{' '}
                <Text fontWeight="bold" as="span" color={'blue.300'}>
                  {pageIndex}
                </Text>{' '}
                of{' '}
                <Text fontWeight="bold" as="span">
                  {pageOptions}
                </Text>
              </Text>
            </Flex>
            <Flex>
              <Tooltip label="Next Page">
                <Center>
                  <IconButton
                    minW={'24px'}
                    h={'24px'}
                    border={
                      colorMode === 'light'
                        ? 'solid 1px #e6eaee'
                        : 'solid 1px #424242'
                    }
                    color={colorMode === 'light' ? '#e6eaee' : '#424242'}
                    bg={colorMode === 'light' ? 'white.100' : 'none'}
                    borderRadius={4}
                    aria-label={'Next Page'}
                    onClick={goToNextPage}
                    isDisabled={pageIndex === pageOptions}
                    size={'sm'}
                    ml={4}
                    mr={'1.5625em'}
                    _hover={{borderColor: '#2a72e5', color: '#2a72e5'}}
                    icon={<ChevronRightIcon h={6} w={6} />}
                  />
                </Center>
              </Tooltip>
              <Select
                w={'117px'}
                h={'32px'}
                mr={1}
                color={colorMode === 'light' ? ' #3e495c' : '#f3f4f1'}
                bg={colorMode === 'light' ? 'white.100' : 'none'}
                boxShadow={
                  colorMode === 'light'
                    ? '0 1px 1px 0 rgba(96, 97, 112, 0.14)'
                    : ''
                }
                border={colorMode === 'light' ? '' : 'solid 1px #424242'}
                borderRadius={4}
                size={'sm'}
                value={pageLimit}
                fontFamily={theme.fonts.roboto}
                onChange={(e) => {
                  setPageLimit(Number(e.target.value));
                }}>
                {[2, 4, 6, 8, 10, 12].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
