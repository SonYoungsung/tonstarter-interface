import {
  Box,
  Button,
  Flex,
  useTheme,
  Text,
  ButtonGroup,
  useColorMode,
} from '@chakra-ui/react';
import {useState, Dispatch, useEffect} from 'react';
import {PageHeader} from 'components/PageHeader';
import {useRouteMatch} from 'react-router-dom';
import AllProjects from '@Launch/components/AllProjects';
import MyProjects from '@Launch/components/MyProjects';
import LaunchPageBackground from '../../assets/banner/LaunchPageBackground.png';
import {useModal} from 'hooks/useModal';
import ConfirmTermsModal from './components/modals/ConfirmTerms';
import {useActiveWeb3React} from 'hooks/useWeb3';
import {injected} from 'connectors';
import WarningModal from './components/simplifiedLaunch/openStepOne/WarningModal';
import {
  setMode,
  setProjectStep,
  saveTempProjectData,
  setHashKey,
} from '@Launch/launch.reducer';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {DEFAULT_NETWORK} from 'constants/index';

type LaunchProps = {
  numPairs: Number;
};

const themeDesign = {
  border: {
    light: 'solid 1px #e6eaee',
    dark: 'solid 1px #373737',
  },
  font: {
    light: 'black.300',
    dark: 'gray.475',
  },
  tosFont: {
    light: 'gray.250',
    dark: 'black.100',
  },
  borderDashed: {
    light: 'dashed 1px #dfe4ee',
    dark: 'dashed 1px #535353',
  },
  buttonColorActive: {
    light: 'gray.225',
    dark: 'gray.0',
  },
  buttonColorInactive: {
    light: '#c9d1d8',
    dark: '#777777',
  },
};

const LaunchPage: React.FC<LaunchProps> = ({numPairs}) => {
  const [showAllProjects, setShowAllProjects] = useState<boolean>(true);
  const theme = useTheme();
  const {colorMode} = useColorMode();
  const dispatch = useAppDispatch();
  const {active, activate} = useActiveWeb3React();
  const {account, chainId} = useActiveWeb3React();

  //sets the create project mode to simplified at the initial load
  //initializes all the states
  useEffect(() => {
    dispatch(
      setMode({
        data: 'simplified',
      }),
    );
    dispatch(saveTempProjectData({data: {}}));
    dispatch(setProjectStep({data: 1}));
    dispatch(setHashKey({data: undefined}));
  }, [dispatch]);

  const {openAnyModal} = useModal();

  return (
    <Flex
      flexDir={'column'}
      justifyContent={'center'}
      w={'100%'}
      mb={'100px'}
      overflowX={'hidden'}>
      <Flex
        pos="relative"
        w={'100%'}
        // bgImage={bannerImg1X}
        // backgroundRepeat="no-repeat"
        // backgroundPosition="center"
        style={{height: '510px'}}
        alignItems="center"
        justifyContent="center">
        <img
          alt={'banner-img'}
          src={LaunchPageBackground}
          style={{height: '520px'}}
        />
        <Flex
          position={'absolute'}
          alignItems={'space-between'}
          flexDirection={'column'}
          height={'200px'}
          left={'50%'}
          transform={'translateX(-50%)'}>
          <Flex alignItems={'center'} flexDir="column" mb={'20px'}>
            <Text
              color={'#fff'}
              fontSize={'72px'}
              fontWeight={'bold'}
              fontFamily={theme.fonts.poppins}>
              Launch
            </Text>
            <Text
              color={'#fff'}
              fontFamily={theme.fonts.roboto}
              fontSize={'22px'}
              opacity={0.8}>
              Make Your Own Token and Create a Token Economy.
            </Text>
          </Flex>
          <Flex justifyContent={'center'} w={'100%'}>
            {/* <Link to={`${url}/createproject`}> */}
            {/* links to the create project page when clicked. the initial create project mode will be simplified mode */}
            <Button
              _hover={{bg: '#2a72e5'}}
              bg={'#257eee'}
              _active={{bg: '#2a72e5'}}
              _focus={{bg: '#2a72e5'}}
              mt={'10px'}
              color="white.100"
              fontFamily={theme.fonts.roboto}
              letterSpacing={'.35px'}
              fontSize={'14px'}
              borderRadius={'4px'}
              width={'150px'}
              height={'38px'}
              padding={'12px 28px 10px'}
              onClick={() => {
                if (!window.web3) {
                  return window.open('https://metamask.io/download/');
                }
                if (!active) {
                  return activate(injected);
                }
                if (
                  chainId !== Number(DEFAULT_NETWORK) ||
                  chainId === undefined ||
                  !account
                ) {
                  const netType =
                    DEFAULT_NETWORK === 1 ? 'Mainnet' : 'Goerli Test Network';
                  return alert(`Please use ${netType}`);
                }
                openAnyModal('Launch_Warning', {
                  from: 'advance-launch',
                });
              }}>
              Create Project
            </Button>
          </Flex>
          <Flex
            justifyContent={'space-between'}
            // mb={'100px'}
            position={'absolute'}
            top="140%"
            // bottom={'-21%'}
            background={'rgba(7, 7, 10, .7)'}
            paddingX={'400px'}
            paddingY={'10px'}
            left={'50%'}
            transform={'translateX(-50%)'}>
            <Flex
              alignItems={'center'}
              flexDir="column"
              width={'400px'}
              fontFamily={theme.fonts.fld}>
              <Text color={'yellow'}>Raised Capital</Text>
              <Text color={'#fff'} fontSize={'24px'}>
                $2,646,790.91
              </Text>
            </Flex>
            <Flex
              alignItems={'center'}
              flexDir="column"
              width={'400px'}
              fontFamily={theme.fonts.fld}>
              <Text color={'yellow'}>TOS pairs (in Uniswap)</Text>
              <Text color={'#fff'} fontSize={'24px'}>
                {numPairs}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        mt={'60px'}>
        <Flex alignItems={'center'} flexDir="column">
          <Text
            fontSize={'32px'}
            color={colorMode === 'light' ? '#3d495d' : '#fff'}
            fontFamily={theme.fonts.titil}
            fontWeight={'bold'}>
            {' '}
            Projects
          </Text>
        </Flex>
        <Flex mt={'40px'} mb={'30px'}>
          <Button
            w={'160px'}
            h={'38px'}
            bg={'transparent'}
            border={themeDesign.border[colorMode]}
            borderRadius={'3px 0px 0px 3px'}
            fontSize={'14px'}
            fontFamily={theme.fonts.fld}
            color={themeDesign.tosFont[colorMode]}
            _hover={{
              background: 'transparent',
              border: 'solid 1px #2a72e5',
              color: themeDesign.tosFont[colorMode],
              cursor: 'pointer',
            }}
            _active={{
              background: '#2a72e5',
              border: 'solid 1px #2a72e5',
              color: '#fff',
            }}
            onClick={() => {
              setShowAllProjects(true);
            }}
            isActive={showAllProjects}>
            All
          </Button>
          <Button
            w={'160px'}
            h={'38px'}
            bg={'transparent'}
            border={themeDesign.border[colorMode]}
            borderRadius={'0px 3px 3px 0px'}
            fontSize={'14px'}
            fontFamily={theme.fonts.fld}
            color={themeDesign.tosFont[colorMode]}
            _hover={{
              background: 'transparent',
              border: 'solid 1px #2a72e5',
              color: themeDesign.tosFont[colorMode],
              cursor: 'pointer',
            }}
            _active={{
              background: '#2a72e5',
              border: 'solid 1px #2a72e5',
              color: '#fff',
            }}
            onClick={() => {
              setShowAllProjects(false);
            }}
            isActive={!showAllProjects}>
            My
          </Button>
        </Flex>
      </Box>
      {/* displays the appropriate projects depending on the selected tab */}
      {showAllProjects ? <AllProjects /> : <MyProjects />}
      <ConfirmTermsModal></ConfirmTermsModal>
      <WarningModal />
    </Flex>
  );
};

export default LaunchPage;
