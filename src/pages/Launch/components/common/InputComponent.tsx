import {Box, Flex, Input, Select, Text, useColorMode} from '@chakra-ui/react';
import {Projects} from '@Launch/types';
import {ErrorMessage, Field, useFormikContext} from 'formik';
import './input.css';

type InputComponentProps = {
  name: string;
  placeHolder: string;
  nameDisplay?: boolean;
  inputStyle?: {};
  requirement?: boolean;
};

const InputComponentStyle = {
  color: {
    light: '#2d3136',
    dark: '#f3f4f1',
  },
};

const getMaxLength = (name: string) => {
  switch (name) {
    case 'projectName':
      return 20;
    case 'tokenSymbol':
      return 8;
    case 'tokenName':
      return 8;
    default:
      return 'none';
  }
};

const getPlaceHolder = (name: string) => {
  switch (name) {
    case 'Website ':
      return 'https://tonstarter.tokamak.network';
    case 'Medium ':
      return 'https://medium.com/onther-tech';
    case 'Telegram ':
      return 'https://t.me/tokamak_network';
    case 'Twitter ':
      return 'https://twitter.com/tokamak_network';
    case 'Discord ':
      return 'https://dsc.gg/dragonsmidgard';
    default:
      return `Input ${name}`;
  }
};

const InputComponent: React.FC<InputComponentProps> = (props) => {
  const {name, nameDisplay, inputStyle, requirement} = props;
  const {errors, values, setFieldValue} =
    useFormikContext<Projects['CreateProject']>();
  const {colorMode} = useColorMode();
  const title = name
    .split(/(?=[A-Z])/)
    .map((e) => `${e.charAt(0).toUpperCase() + e.slice(1)} `);

  const getTitleTried = () => {
    const titleTrimed = title.toString().replaceAll(',', '');
    switch (titleTrimed) {
      case 'Owner ':
        return 'Account Address';
      default:
        return titleTrimed;
    }
  };

  // //@ts-ignore
  // console.log(errors[name]);

  const titleTrimed = getTitleTried();

  return (
    <Flex flexDir={'column'} fontSize={13} pos={'relative'}>
      {nameDisplay === false ? (
        <></>
      ) : (
        <Flex justifyContent={'space-between'}>
          <Flex>
            {requirement && (
              <Text mr={'5px'} color={'#FF3B3B'}>
                *
              </Text>
            )}
            <Text h={18} mb={2.5} color={InputComponentStyle.color[colorMode]}>
              {title}
            </Text>
          </Flex>
          {name === 'projectName' && (
            <Text color={'#86929d'} fontSize={10}>
              {(values.projectName && 20 - values.projectName?.length) || 20}{' '}
              characters remaining
            </Text>
          )}
        </Flex>
      )}
      <Field name={name}>
        {(
          //@ts-ignore
          {field, meta: {touched, error}},
        ) => {
          //@ts-ignore
          const isError = errors[name] === undefined ? false : true;

          //selectBox feedback
          if (name === 'sector') {
            const selectList = [
              'Defi',
              'Exchange',
              'P2E',
              'M2E',
              'Stable',
              'Social',
              'Collectible',
              'Market place',
              'Custom',
            ];
            const selectBoxOnChange = (e: any) => {
              setFieldValue('sector', e.target.value);
            };
            const isCustom =
              selectList.indexOf(values.sector) === -1 ||
              values.sector === 'Custom';

            return (
              <Flex justifyContent={'space-between'}>
                <Select
                  style={{
                    height: '32px',
                    border: '1px solid #dfe4ee',
                    borderRadius: '4px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                  w={isCustom ? '127px' : '100%'}
                  fontSize={13}
                  color={'#86929d'}
                  name={'sector'}
                  defaultValue={isCustom ? 'Custom' : values.sector}
                  onChange={selectBoxOnChange}>
                  <option disabled selected>
                    select
                  </option>
                  {selectList.map((value: string) => {
                    return <option value={value}>{value}</option>;
                  })}
                </Select>
                {isCustom && (
                  <Input
                    className={
                      isError
                        ? 'input-err'
                        : colorMode === 'light'
                        ? 'input-light'
                        : 'input-dark'
                    }
                    w={'190px'}
                    borderRadius={4}
                    maxLength={getMaxLength(name)}
                    fontSize={13}
                    {...field}
                    id={name}
                    h={'32px'}
                    _focus={{}}
                    placeholder={`${getPlaceHolder(titleTrimed)}`}
                    {...inputStyle}></Input>
                )}
              </Flex>
            );
          }

          return (
            <Input
              className={
                isError
                  ? 'input-err'
                  : colorMode === 'light'
                  ? 'input-light'
                  : 'input-dark'
              }
              borderRadius={4}
              maxLength={getMaxLength(name)}
              fontSize={13}
              {...field}
              id={name}
              h={'32px'}
              _focus={{}}
              placeholder={`${getPlaceHolder(titleTrimed)}`}
              {...inputStyle}></Input>
          );
        }}
      </Field>
      <Box
        pos={'absolute'}
        right={0}
        w={'50%'}
        bg={colorMode === 'light' ? 'white.100' : '#222222'}
        textAlign={'right'}>
        <ErrorMessage
          name={name}
          render={(msg) => (
            <Text color={'red.100'}>{`Invalid ${titleTrimed}`}</Text>
          )}></ErrorMessage>
      </Box>
    </Flex>
  );
};

export default InputComponent;
