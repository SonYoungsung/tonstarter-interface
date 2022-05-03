import {FC} from 'react';
import {
  Flex,
  Text,
  Grid,
  GridItem,
  useTheme,
  useColorMode,
  Button,
} from '@chakra-ui/react';

import {shortenAddress} from 'utils/address';

type WtonTosLpReward = {vault: any; project: any};

export const WtonTosLpReward: FC<WtonTosLpReward> = ({vault, project}) => {
  const {colorMode} = useColorMode();
  const theme = useTheme();

  const themeDesign = {
    border: {
      light: 'solid 1px #e7edf3',
      dark: 'solid 1px #535353',
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

  return (
    <Grid templateColumns="repeat(2, 1fr)" w={'100%'}>
      <Flex flexDirection={'column'}>
        <GridItem className={'chart-cell'} fontSize={'16px'}>
          <Text>Token</Text>
          {/* Need to make TON changeable. */}
          <Text>
            {vault.vaultTokenAllocation} {project.tokenSymbol}
          </Text>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>Price Range</Text>
          {/* Need to make Full Range changeable. */}
          <Text>Full Range</Text>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>Selected Pair</Text>
          {/* Need to make Token Symbol - TOS changeable. */}
          <Text> {project.tokenSymbol} - TOS</Text>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>Pool Address</Text>
          {/* Need a valid poolAddress */}
          <Text>
            {vault.vaultAddress ? shortenAddress(vault.vaultAddress) : 'N/A'}
          </Text>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>Vault Admin</Text>
          <Text>
            {vault.vaultAddress ? shortenAddress(vault.adminAddress) : 'N/A'}
          </Text>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>Vault Contract Address</Text>
          <Text>
            {vault.vaultAddress ? shortenAddress(vault.vaultAddress) : 'N/A'}
          </Text>{' '}
        </GridItem>
      </Flex>
      <Flex flexDirection={'column'}>
        <GridItem className={'chart-cell'} fontSize={'16px'}>
          <Text>LP Token</Text>
          <Text>ID #562734</Text>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>LP Token</Text>
          <Text>Project Token</Text>
          <Text>TOS</Text>
          <Text>Action</Text>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>Increase Liquidity</Text>
          <Text>10,000,000</Text>
          <Text>10,000,000</Text>
          <Button>Increase</Button>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>Unclaimed Fees</Text>
          <Text>10,000,000</Text>
          <Text>10,000,000</Text>
          <Button>Collect</Button>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>{''}</Text>
        </GridItem>
        <GridItem className={'chart-cell'}>
          <Text>{''}</Text>
        </GridItem>
      </Flex>
    </Grid>
  );
};
