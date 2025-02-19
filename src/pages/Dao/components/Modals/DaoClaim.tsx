import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  useTheme,
  useColorMode,
  WrapItem,
  Checkbox,
  CheckboxGroup,
  Tooltip,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import {useAppSelector} from 'hooks/useRedux';
import {selectModalType} from 'store/modal.reducer';
import {useModal} from 'hooks/useModal';
import {useEffect, useState} from 'react';
import {Scrollbars} from 'react-custom-scrollbars-2';
import {useActiveWeb3React} from 'hooks/useWeb3';
import {CloseButton} from 'components/Modal';
import {ClaimList} from '@Dao/types';
import {DEPLOYED} from 'constants/index';
import * as LockTOSDividend from 'services/abis/LockTOSDividend.json';
import {useContract} from 'hooks/useContract';
import tooltipIcon from 'assets/svgs/input_question_icon.svg';

const ClaimRecord = ({
  name,
  amount,
  tokenName,
  tokenAddress,
  index,
}: {
  name: string;
  amount: string;
  tokenName: string;
  tokenAddress: string;
  index: number;
}) => {
  const {colorMode} = useColorMode();
  return (
    <WrapItem w="100%" h="37px" key={`${index}_${name}`}>
      <Flex w="100%" pl="1.875em" pr="1.875em">
        <Checkbox value={tokenAddress} mr={'10px'}></Checkbox>
        {/* <Text
            color={colorMode === 'light' ? 'gray.400' : 'gray.425'}
            fontSize={'13px'}>
            {`#${index + 1}`}
          </Text> */}
        <Text
          color={colorMode === 'light' ? 'gray.250' : 'white.200'}
          fontSize={'15px'}
          fontWeight={600}>
          {amount} {tokenName}
        </Text>
      </Flex>
    </WrapItem>
  );
};

export const DaoClaim = (props: any) => {
  const {data} = useAppSelector(selectModalType);
  const {balance, claimList} = data.data;
  const {colorMode} = useColorMode();
  const theme = useTheme();
  const {handleCloseModal} = useModal();
  const {account} = useActiveWeb3React();

  const [unstakeList, setUnstakeList] = useState<ClaimList[] | []>([]);
  const [unstakeBalance, setUnstakeBalance] = useState('-');
  const [tokenList, setTokenList] = useState<string[] | []>([]);

  const {LockTOSDividend_ADDRESS} = DEPLOYED;
  const DIVIDEND_CONTRACT = useContract(
    LockTOSDividend_ADDRESS,
    LockTOSDividend.abi,
  );

  useEffect(() => {
    if (balance) {
      setUnstakeBalance(balance);
    }
    if (claimList) {
      setUnstakeList(claimList);
    }
    /*eslint-disable*/
  }, [data, balance, claimList]);

  const [tooltipOpen, setTooltipOpen] = useState(true);

  useEffect(() => {
    if (tooltipOpen === true) {
      setTimeout(() => {
        setTooltipOpen(false);
      }, 3000);
    }
  }, [tooltipOpen]);

  return (
    <Modal
      isOpen={data.modal === 'dao_claim' ? true : false}
      isCentered
      onClose={() => {
        setTooltipOpen(true);
        handleCloseModal();
      }}>
      <ModalOverlay />
      <ModalContent
        fontFamily={theme.fonts.roboto}
        bg={colorMode === 'light' ? 'white.100' : 'black.200'}
        w="350px"
        pt="25px"
        pb="25px">
        <CloseButton closeFunc={handleCloseModal}></CloseButton>
        <ModalBody p={0}>
          <Box
            pb={'1.250em'}
            borderBottom={
              colorMode === 'light' ? '1px solid #f4f6f8' : '1px solid #373737'
            }>
            <Heading
              fontSize={'1.250em'}
              fontWeight={'bold'}
              fontFamily={theme.fonts.titil}
              color={colorMode === 'light' ? 'gray.250' : 'white.100'}
              textAlign={'center'}>
              Claim
            </Heading>
            <Text color="gray.175" fontSize={'0.750em'} textAlign={'center'}>
              You can claim
            </Text>
          </Box>

          <Stack
            as={Flex}
            justifyContent={'center'}
            alignItems={'center'}
            borderBottom={
              colorMode === 'light' ? '1px solid #f4f6f8' : '1px solid #373737'
            }
            mb={'25px'}>
            <Box textAlign={'center'} pt="20px" pb="20px">
              <Text
                fontSize={'26px'}
                fontWeight={600}
                color={colorMode === 'light' ? 'gray.250' : 'white.100'}>
                $ {unstakeBalance}
              </Text>
            </Box>
            <Flex justifyContent={'center'} h={'18px'}>
              <Text
                style={{marginTop: '0'}}
                fontSize="0.750em"
                color="gray.400"
                mr={'10px'}>
                Detail
              </Text>
              <Flex>
                <Tooltip
                  isOpen={tooltipOpen}
                  defaultIsOpen
                  pos="relative"
                  // style={{
                  //   display: 'flex',
                  //   alignItems: 'center',
                  //   justifyContent: 'center',
                  //   paddingBottom: '2px',
                  // }}
                  left={'-4px'}
                  hasArrow
                  placement="top"
                  maxW={'200px'}
                  label={
                    <Flex
                      pos="absolute"
                      left={'-80px'}
                      top={'-45px'}
                      w={'180px'}
                      h={'50px'}
                      bg={'#353c48'}
                      color={''}
                      flexDir="column"
                      fontSize="12px"
                      pt="6px"
                      pl="5px"
                      pr="5px"
                      py="6px">
                      If you select more tokens, you would pay more gas fee.
                      {/* {msg.map((text: string) => (
                        <Text textAlign="center" fontSize="12px">
                          {text}
                        </Text>
                      ))} */}
                    </Flex>
                  }
                  color={theme.colors.white[100]}
                  bg={theme.colors.gray[375]}>
                  <Image
                    src={tooltipIcon}
                    style={{paddingBottom: '2px'}}
                    alt={
                      'If you select more tokens, you would pay more gas fee.'
                    }
                    onMouseEnter={() => setTooltipOpen(true)}
                    onMouseLeave={() => setTooltipOpen(false)}
                  />
                </Tooltip>
              </Flex>
            </Flex>
            {unstakeList !== undefined && unstakeList.length > 0 && (
              <Scrollbars
                style={{
                  width: '100%',
                  height: '135px',
                  display: 'flex',
                  position: 'relative',
                  marginTop: '10px',
                }}
                thumbSize={70}
                renderThumbVertical={() => (
                  <div
                    style={{
                      background: colorMode === 'light' ? '#007aff' : '#ffffff',
                      position: 'relative',
                      right: '-2px',
                      borderRadius: '3px',
                    }}></div>
                )}
                renderThumbHorizontal={() => (
                  <div style={{background: 'black'}}></div>
                )}>
                <Flex
                  style={{marginTop: '0', marginBottom: '20px'}}
                  justifyContent="center"
                  flexDir="column">
                  <CheckboxGroup
                    onChange={(tokenList: string[]) => setTokenList(tokenList)}
                    // defaultValue={[
                    //   Object.values(unstakeList[0])[4].toString(),
                    // ]}
                  >
                    {unstakeList.map((data: ClaimList, index: number) => {
                      if (data.claimAmount === '0.00') {
                        return;
                      }
                      return (
                        <ClaimRecord
                          index={index}
                          name={data.name}
                          amount={data.claimAmount}
                          tokenName={data.tokenName}
                          tokenAddress={data.tokenAddress}
                        />
                      );
                    })}
                  </CheckboxGroup>
                </Flex>
              </Scrollbars>
            )}
          </Stack>

          <Box as={Flex} justifyContent={'center'}>
            <Button
              w={'150px'}
              bg={'blue.500'}
              color="white.100"
              fontSize="14px"
              _hover={{...theme.btnHover}}
              onClick={async () => {
                if (tokenList.length === 0) {
                  return alert('You need to choose token(s)');
                }
                if (account && tokenList.length > 0) {
                  try {
                    DIVIDEND_CONTRACT?.claimBatch(tokenList);
                    handleCloseModal();
                  } catch (e) {
                    console.log(e);
                  } finally {
                  }
                }
              }}>
              Claim
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};