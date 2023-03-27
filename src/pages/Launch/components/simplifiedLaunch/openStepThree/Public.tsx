import {Flex, useColorMode, useTheme, Text, Button} from '@chakra-ui/react';
import {useEffect, useState, Dispatch, SetStateAction} from 'react';
import {useFormikContext} from 'formik';
import {Projects,VaultPublic} from '@Launch/types';

const Public = () => {
  const {colorMode} = useColorMode();
  const theme = useTheme();
  const [type, setType] = useState<'Vault' | 'Sale'>('Vault');
  const {values, setFieldValue} = useFormikContext<Projects['CreateSimplifiedProject']>();


  const detailsVault = [
    {name: 'Vault Name', value: 'Vesting'},
    {name: 'Admin', value: 'TON'},
    {name: 'Contract', value: '50,000 TON'},
    {name: 'Token Allocation', value: '50,000 TON'},
    //   {name: 'Token Price', value: '50,000 TON'},
    //   {name: 'Start Time', value: '50,000 TON'},
  ];
  const detailsClaim = [
    {name: '22.01.2022 17:00:00', value: '6,000,000 TON (6.00%)'},
    {name: '22.02.2022 17:00:00', value: '6,000,000 TON (6.00%)'},
    {name: '22.03.2022 17:00:00', value: '6,000,000 TON (6.00%)'},
    {name: '22.04.2022 17:00:00', value: '6,000,000 TON (6.00%)'},
    {name: '22.04.2022 17:00:00', value: '6,000,000 TON (6.00%)'},
  ];

  const tokenDetails = [
    {name: 'Token', value1: '6,000,000 TON', value2: '100.00%'},
    {name: 'Public Round 1', value1: '6,000,000 TON', value2: '6.00%'},
    {name: 'Public Round 2', value1: '6,000,000 TON', value2: '16.00%'},
    {name: 'Token Price', value1: '10 PROJECT TOKEN : 1 TON'},
  ];

  const schedule = [
    {name: 'Whitelist', value: '22.01.2022 17:00:00'},
    {name: 'Public Round 1', value: '22.01.2022 17:00:00'},
    {name: 'Public Round 1', value: '22.01.2022 17:00:00'},
    {name: 'Claim', value: '22.01.2022 17:00:00'},
  ];

  const sTOSList = [
    {tier: 1, requiredTos: 1000, allocationToken: 300000},
    {tier: 2, requiredTos: 2000, allocationToken: 400000},
    {tier: 3, requiredTos: 3000, allocationToken: 600000},
    {tier: 4, requiredTos: 6000, allocationToken: 1000000},
  ];
  const VaultClaim = (props: {}) => {
    return (
      <Flex flexDir={'column'} w="100%" px="20px">
        <Flex flexDir={'column'} w="100%" alignItems={'center'}>
          <Text h="18px" mb="10px" fontSize={'13px'}>
            Vault
          </Text>
          {detailsVault.map((detail: any, index: number) => {
            return (
              <Flex
                key={index}
                w="100%"
                justifyContent={'space-between'}
                h="45px"
                alignItems={'center'}>
                <Text
                  fontSize={'13px'}
                  fontFamily={theme.fonts.roboto}
                  fontWeight={500}
                  color={colorMode === 'dark' ? 'gray.425' : 'gray.400'}>
                  {detail.name}
                </Text>
                <Text
                  fontSize={'13px'}
                  fontFamily={theme.fonts.roboto}
                  fontWeight={500}
                  color={
                    detail.name === 'Admin' || detail.name === 'Contract'
                      ? 'blue.300'
                      : colorMode === 'dark'
                      ? 'white.100'
                      : 'gray.250'
                  }>
                  {detail.value}
                </Text>
              </Flex>
            );
          })}
        </Flex>
        <Flex
          mt="30px"
          flexDir={'column'}
          px="20px"
          w="100%"
          alignItems={'center'}>
          <Text mb="10px" fontSize={'13px'} h="18px">
            Claim
          </Text>
          <Flex w="100%" h="45px" alignItems={'center'}>
            <Text fontSize={'13px'} textAlign={'left'}>
              Claim Rounds ({detailsClaim.length})
            </Text>
          </Flex>

          {detailsClaim.map((detail: any, index: Number) => {
            return (
              <Flex
                w="100%"
                justifyContent={'space-between'}
                h="30px"
                alignItems={'center'}>
                <Text
                  fontSize={'12px'}
                  fontFamily={theme.fonts.roboto}
                  fontWeight={500}
                  color={colorMode === 'dark' ? 'gray.425' : 'gray.400'}>
                  <span style={{color: '#3d495d', marginRight: '3px'}}>
                    0{index}
                  </span>
                  {detail.name}
                </Text>
                <Text
                  fontSize={'12px'}
                  fontFamily={theme.fonts.roboto}
                  fontWeight={500}
                  color={
                    detail.name === 'Admin' || detail.name === 'Contract'
                      ? 'blue.300'
                      : colorMode === 'dark'
                      ? 'white.100'
                      : 'gray.250'
                  }>
                  {detail.value}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    );
  };

  const Sale = (props: {}) => {
    return (
      <Flex flexDir={'column'} w="100%">
        <Flex flexDir={'column'} w="100%" alignItems={'center'}>
          <Text h="18px" mb="10px" fontSize={'13px'}>
            Token
          </Text>
          {tokenDetails.map((detail: any, index: number) => {
            return (
              <Flex
                px="20px"
                key={index}
                w="100%"
                justifyContent={'space-between'}
                h="45px"
                alignItems={'center'}>
                <Text
                  fontSize={'13px'}
                  fontFamily={theme.fonts.roboto}
                  fontWeight={500}
                  color={colorMode === 'dark' ? 'gray.425' : 'gray.400'}>
                  {detail.name}
                </Text>
                <Flex>
                  <Text
                    fontSize={'13px'}
                    fontFamily={theme.fonts.roboto}
                    fontWeight={500}
                    color={
                      detail.name === 'Admin' || detail.name === 'Contract'
                        ? 'blue.300'
                        : colorMode === 'dark'
                        ? 'white.100'
                        : 'gray.250'
                    }>
                    {detail.value1}
                  </Text>
                  {detail.value2 && (
                    <Text
                      ml="3px"
                      color={colorMode === 'dark' ? '#9d9ea5' : '#7e8993'}
                      fontSize={'11px'}>
                      ({detail.value2})
                    </Text>
                  )}
                </Flex>
              </Flex>
            );
          })}
          <Text h="18px" mt="43px" mb="10px" fontSize={'13px'}>
            Schedule
          </Text>
          {schedule.map((detail: any, index: number) => {
            return (
              <Flex
                px="20px"
                key={index}
                w="100%"
                justifyContent={'space-between'}
                h="45px"
                alignItems={'center'}>
                <Text
                  fontSize={'13px'}
                  fontFamily={theme.fonts.roboto}
                  fontWeight={500}
                  color={colorMode === 'dark' ? 'gray.425' : 'gray.400'}>
                  {detail.name}
                </Text>
                <Flex>
                  <Text
                    fontSize={'13px'}
                    fontFamily={theme.fonts.roboto}
                    fontWeight={500}
                    color={
                      detail.name === 'Admin' || detail.name === 'Contract'
                        ? 'blue.300'
                        : colorMode === 'dark'
                        ? 'white.100'
                        : 'gray.250'
                    }>
                    {detail.value}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
          <Text h="18px" mt="43px" mb="10px" fontSize={'13px'}>
            sTOS Tier
          </Text>
          <Flex
            h={'35px'}
            lineHeight={'35px'}
            borderBottom={'1px solid #f4f6f8'}
            fontSize={12}
            textAlign="center">
            <Text
              w={'70px'}
              color={colorMode === 'light' ? 'gray.400' : 'white.100'}>
              Tier
            </Text>
            <Text
              w={'120px'}
              color={colorMode === 'light' ? 'gray.400' : 'white.100'}>
              Required sTOS
            </Text>
            <Text
              w={'160px'}
              color={colorMode === 'light' ? 'gray.400' : 'white.100'}>
              Allocated Token
            </Text>
          </Flex>
          {sTOSList.map(
            (
              stosInfo: {
                tier: number;
                requiredTos: number;
                allocationToken: number;
              },
              index: number,
            ) => {
              return (
                <Flex
                  key={index}
                  borderBottom={'1px solid #f4f6f8'}
                  h={'35px'}
                  lineHeight={'35px'}
                  fontSize={13} textAlign='center'>
                  <Text
                    w={'70px'}
                    color={colorMode === 'light' ? 'gray.250' : 'white.100'}>
                    0{stosInfo.tier}
                  </Text>
                  <Text
                    w={'120px'}
                    color={colorMode === 'light' ? 'gray.250' : 'white.100'}>
                    {stosInfo.requiredTos} TOS
                  </Text>
                  <Text
                    w={'160px'}
                    color={colorMode === 'light' ? 'gray.250' : 'white.100'}>
                    {stosInfo.allocationToken} {values.tokenName}
                  </Text>
                </Flex>
              );
            },
          )}
        </Flex>
      </Flex>
    );
  };
  return (
    <Flex
      mt="30px"
      h="100%"
      w="350px"
      flexDir={'column'}
      borderRadius={'15px'}
      alignItems="center"
      border={colorMode === 'dark' ? '1px solid #363636' : '1px solid #e6eaee'}>
      <Flex
        h="71px"
        w="100%"
        alignItems={'center'}
        justifyContent="center"
        borderBottom={
          colorMode === 'dark' ? '1px solid #363636' : '1px solid #e6eaee'
        }>
        <Text
          lineHeight={1.5}
          fontWeight={'bold'}
          fontFamily={theme.fonts.titil}
          fontSize="20px"
          mt="19px"
          mb="21px"
          color={colorMode === 'dark' ? 'white.100' : 'gray.250'}>
          Public
        </Text>
      </Flex>
      <Flex w="272px" h="26px" fontSize={'12px'} mb="30px" mt="15px">
        <Flex
          w="50%"
          border={
            type === 'Vault'
              ? '1px solid #2a72e5'
              : colorMode === 'dark'
              ? '1px solid #535353'
              : '1px solid #d7d9df'
          }
          cursor="pointer"
          borderLeftRadius="5px"
          borderRight={type !== 'Vault' ? 'none' : ''}
          alignItems={'center'}
          onClick={() => setType('Vault')}
          justifyContent={'center'}>
          <Text
            color={
              type === 'Vault'
                ? 'blue.300'
                : colorMode === 'dark'
                ? 'white.100'
                : 'gray.250'
            }>
            Vault & Claim
          </Text>
        </Flex>
        <Flex
          w="50%"
          border={
            type === 'Sale'
              ? '1px solid #2a72e5'
              : colorMode === 'dark'
              ? '1px solid #535353'
              : '1px solid #d7d9df'
          }
          cursor="pointer"
          onClick={() => setType('Sale')}
          borderLeft={type !== 'Sale' ? 'none' : ''}
          borderRightRadius="5px"
          alignItems={'center'}
          justifyContent={'center'}>
          <Text
            color={
              type === 'Sale'
                ? 'blue.300'
                : colorMode === 'dark'
                ? 'white.100'
                : 'gray.250'
            }>
            Sale
          </Text>
        </Flex>
      </Flex>
      {type === 'Sale' ? <Sale /> : <VaultClaim />}

      <Flex
        mt="24px"
        w="100%"
        h="88px"
        justifyContent={'center'}
        alignItems="center"
        borderTop={
          colorMode === 'dark' ? '1px solid #363636' : '1px solid #e6eaee'
        }>
        <Button
          type="submit"
          w={'150px'}
          h={'38px'}
          bg={'blue.500'}
          fontSize={14}
          color={'white.100'}
          mr={'12px'}
          _hover={{}}
          borderRadius={4}>
          Deploy
        </Button>
      </Flex>
    </Flex>
  );
};

export default Public;
