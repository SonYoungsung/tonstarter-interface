import {
  Box,
  Flex,
  Text,
  Container,
  Image,
  useColorMode,
  useTheme,
  Link,
} from '@chakra-ui/react';
import resources_icon from 'assets/svgs/resources_icon.svg';
import {STOS} from './components/STOS';
import {DAOStatistics} from './components/DAOStatistics';
import {
  DaoStakeModal,
  DaoUnstakeModal,
  DaoManageModal,
  DaoClaim,
} from './components/Modals';
import {Utility} from './components/Utility';
import {DistributeModal} from 'pages/Admin/components/DistributeModal';

const Notice = () => {
  const theme = useTheme();
  return (
    <Flex flexDir={'column'} mt={'39px'}>
      <Flex fontSize={20} fontWeight={'bold'}>
        <Text color={'#2a72e5'}>[Notice]</Text>
        <Text ml={'3px'}>
          Updated planned service maintenance & smart contract upgrade
          announcement
        </Text>
      </Flex>
      <Flex
        fontSize={15}
        flexDir={'column'}
        mt={'15px'}
        fontFamily={theme.fonts.fld}>
        <Text>
          TONStarter DAO page’s “Manage”, “Unstake”, “Stake” functionality will
          not work from November 15th 11:00 ~ 17th 12:00 to upgrade the TOSv2
          staking contract.
        </Text>
        <Text>
          On November 17th around 12:00 (KST), TONStarter’s DAO page will be
          deprecated and moved under the new TOSv2’s DAO page.
        </Text>
        <Flex>
          <Text>Check our medium article [</Text>
          <Link
            color={'#2a72e5'}
            isExternal={true}
            href="https://medium.com/onther-tech/tosv2-phase-1-release-a0b46e54f69f">
            EN
          </Link>
          ,
          <Link
            color={'#2a72e5'}
            isExternal={true}
            href="https://medium.com/onther-tech/tosv2-1%EB%8B%A8%EA%B3%84-%EA%B3%B5%EA%B0%9C-1e9465db6985">
            KR
          </Link>
          <Text>] for more details.</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const DAO = () => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const themeDesign = {
    fontColor: {
      light: 'gray.250',
      dark: 'white.100',
    },
    bg: {
      light: 'white.100',
      dark: 'black.200',
    },
    border: {
      light: 'solid 1px #d7d9df',
      dark: 'solid 1px #535353',
    },
  };

  return (
    <Flex mb={'105px'}>
      <Flex
        mt={theme.headerMargin.mt}
        w="100%"
        flexDir="column"
        justifyContent={'center'}
        alignItems={'center'}>
        <Flex flexDir={'column'}>
          <Notice></Notice>
          <Flex>
            <Flex w={572} mr={158} mt={'60px'} flexDir="column">
              <Box mb={'45px'}>
                <Text
                  color={themeDesign.fontColor[colorMode]}
                  fontSize={'2.375em'}
                  fontWeight={'bold'}
                  mb="10px">
                  DAO
                </Text>
                <Text color={'gray.400'} fontSize={'1.000em'}>
                  Stake TOS and get sTOS. sTOS token is required to obtain the
                  rights for decision-making or sharing additional profit made
                  from the TONStarter platform.
                </Text>
              </Box>
              <Flex>
                <Container p={0} m={0} display="flex">
                  <Box mb="30px">
                    <Text
                      fontSize={'1.250em'}
                      color={themeDesign.fontColor[colorMode]}
                      mb={'10px'}
                      fontWeight={600}>
                      Governance
                    </Text>
                    <Text fontSize={'1em'} color={'gray.400'}>
                      Go vote and and be an owner of TONStarter
                    </Text>
                  </Box>
                  <Box
                    w={160}
                    h="38px"
                    ml={'40px'}
                    mt={'31px'}
                    bg={themeDesign.bg[colorMode]}
                    color={themeDesign.fontColor[colorMode]}
                    borderRadius={4}
                    border={themeDesign.border[colorMode]}
                    fontSize="0.813em"
                    fontWeight={600}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={15}
                    cursor={'pointer'}
                    _hover={{color: '#2a72e5', borderColor: '#2a72e5'}}>
                    <Text
                      onClick={(e: any) => {
                        window.open(`https://snapshot.org/#/tonstarter.eth`);
                      }}>
                      Go to governance
                    </Text>
                    <Image src={resources_icon}></Image>
                  </Box>
                </Container>
              </Flex>
              <Flex flexDir="column" w={636}>
                <DAOStatistics></DAOStatistics>
                <Utility></Utility>
              </Flex>
            </Flex>
            <Flex mt={'57px'}>
              <STOS></STOS>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <DaoStakeModal></DaoStakeModal>
      <DaoUnstakeModal></DaoUnstakeModal>
      <DaoManageModal></DaoManageModal>
      <DaoClaim></DaoClaim>
      <DistributeModal></DistributeModal>
    </Flex>
  );
};
