import {Currency, Price, Token} from '@uniswap/sdk-core';
import StepCounter from '../InputStepCounter/InputStepCounter';
// import { AutoColumn } from 'components/Column'
import {Bound} from 'store/mint/v3/actions';
import {Flex, Text} from '@chakra-ui/react';

// currencyA is the base token
export default function RangeSelector({
  priceLower,
  priceUpper,
  onLeftRangeInput,
  onRightRangeInput,
  getDecrementLower,
  getIncrementLower,
  getDecrementUpper,
  getIncrementUpper,
  currencyA,
  currencyB,
  feeAmount,
  ticksAtLimit,
}: {
  priceLower?: Price<Token, Token>;
  priceUpper?: Price<Token, Token>;
  getDecrementLower: () => string;
  getIncrementLower: () => string;
  getDecrementUpper: () => string;
  getIncrementUpper: () => string;
  onLeftRangeInput: (typedValue: string) => void;
  onRightRangeInput: (typedValue: string) => void;
  currencyA?: Currency | null;
  currencyB?: Currency | null;
  feeAmount?: number;
  ticksAtLimit: {[bound in Bound]?: boolean | undefined};
}) {
  const tokenA = (currencyA ?? undefined)?.wrapped;
  const tokenB = (currencyB ?? undefined)?.wrapped;
  const isSorted = tokenA && tokenB && tokenA.sortsBefore(tokenB);

  const leftPrice = isSorted ? priceLower : priceUpper?.invert();
  const rightPrice = isSorted ? priceUpper : priceLower?.invert();

  return (
    <Flex flexDir="column" ml={'20px'} pt={'3px'} gap="md">
      <StepCounter
        value={
          ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER]
            ? '0'
            : leftPrice?.toSignificant(5) ?? ''
        }
        onUserInput={onLeftRangeInput}
        width="48%"
        decrement={isSorted ? getDecrementLower : getIncrementUpper}
        increment={isSorted ? getIncrementLower : getDecrementUpper}
        decrementDisabled={ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER]}
        incrementDisabled={ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER]}
        feeAmount={feeAmount}
        label={leftPrice ? `${currencyB?.symbol}` : '-'}
        title={
          <Text color={'#808992'} fontWeight={'500'} fontFamily={'Roboto'}>
            Min Price
          </Text>
        }
        tokenA={currencyA?.symbol}
        tokenB={currencyB?.symbol}
      />
      <StepCounter
        value={
          ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER]
            ? '∞'
            : rightPrice?.toSignificant(5) ?? ''
        }
        onUserInput={onRightRangeInput}
        width="48%"
        decrement={isSorted ? getDecrementUpper : getIncrementLower}
        increment={isSorted ? getIncrementUpper : getDecrementLower}
        incrementDisabled={ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER]}
        decrementDisabled={ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER]}
        feeAmount={feeAmount}
        label={rightPrice ? `${currencyB?.symbol}` : '-'}
        tokenA={currencyA?.symbol}
        tokenB={currencyB?.symbol}
        title={
          <Text color={'#808992'} fontWeight={'500'} fontFamily={'Roboto'}>
            Max Price
          </Text>
        }
      />
    </Flex>
  );
}
