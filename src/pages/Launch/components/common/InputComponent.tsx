import {Box, Flex, Input, Select, Text, useColorMode} from '@chakra-ui/react';
import {Projects} from '@Launch/types';
import {ErrorMessage, Field, useFormikContext} from 'formik';
import {useState} from 'react';
import './input.css';

type InputComponentProps = {
  name: string;
  placeHolder: string;
  nameDisplay?: boolean;
  inputStyle?: {};
  requirement?: boolean;
  disabled: boolean;
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
      return 'https://medium.com/tokamak-network';
    case 'Telegram ':
      return 'https://t.me/tokamak_network';
    case 'Twitter ':
      return 'https://twitter.com/tokamak_network';
    case 'Discord ':
      return 'https://dsc.gg/dragonsmidgard';
    case 'Token Symbol Image ':
      return 'URL';
    default:
      return `Input ${name}`;
  }
};

const InputComponent: React.FC<InputComponentProps> = (props) => {
  const {name, nameDisplay, inputStyle, requirement, disabled} = props;
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
  const [hover, setHover] = useState(false);

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
              {title[0] === 'Owner ' ? 'Account Address' : title}
            </Text>
          </Flex>
          {name === 'projectName' && (
            <Text
              color={colorMode === 'dark' ? '#949494' : '#86929d'}
              fontSize={10}>
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
              setFieldValue(
                'sector',
                e.target.value === 'Custom' ? '' : e.target.value,
              );
            };
            const isCustom =
              selectList.indexOf(values.sector) === -1 ||
              values.sector === 'Custom';

            return (
              <Flex justifyContent={'space-between'}>
                <Select
                  isDisabled={disabled}
                  style={{
                    height: '32px',
                    border:
                      colorMode === 'light'
                        ? '1px solid #dfe4ee'
                        : 'solid 1px #424242',
                    borderRadius: '4px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                  _disabled={{
                    bg: colorMode === 'dark' ? 'transparent' : '#e9edf1',
                    color: colorMode === 'light' ? '#8f96a1' : '#484848',
                    cursor: 'not-allowed',
                    border:
                      colorMode === 'light'
                        ? '1px solid #dfe4ee'
                        : '1px solid #323232',
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
                    isDisabled={disabled}
                    _disabled={{
                      bg: colorMode === 'dark' ? 'transparent' : '#e9edf1',
                      color: colorMode === 'light' ? '#8f96a1' : '#484848',
                      cursor: 'not-allowed',
                      border:
                        colorMode === 'light'
                          ? '1px solid #dfe4ee'
                          : '1px solid #323232',
                    }}
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

          //selectBox feedback
          if (name === 'tokenType') {
            const selectList = ['Type A', 'Type B', 'Type C'];
            const selectBoxOnChange = (e: any) => {
              setFieldValue('tokenType', e.target.value);
            };

            return (
              <Flex justifyContent={'space-between'}>
                <Select
                  isDisabled={disabled}
                  _disabled={{
                    bg: colorMode === 'dark' ? 'transparent' : '#e9edf1',
                    color: colorMode === 'light' ? '#8f96a1' : '#484848',
                    cursor: 'not-allowed',
                    border:
                      colorMode === 'light'
                        ? '1px solid #dfe4ee'
                        : '1px solid #323232',
                  }}
                  style={{
                    height: '32px',
                    border:
                      colorMode === 'light'
                        ? '1px solid #dfe4ee'
                        : 'solid 1px #424242',
                    borderRadius: '4px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                  w={'327px'}
                  fontSize={13}
                  color={'#86929d'}
                  name={'sector'}
                  defaultValue={values.tokenType}
                  onChange={selectBoxOnChange}>
                  <option disabled selected style={{display: 'none'}}>
                    Select
                  </option>
                  <option
                    value={'A'}
                    onMouseEnter={() => {
                      setHover(true);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                    }}
                    style={{
                      color: colorMode === 'light' ? '#3e495c' : '#f3f4f1',
                      backgroundColor: 'none',
                      fontWeight: 'bold',
                    }}>
                    Type A
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - BURNABLE
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - APPROVEANDCALL
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - SNAPSHOT
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - PERMIT
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - NON MINTABLE
                  </option>
                  <option value={'A'} style={{height: '14px'}} disabled>
                    {''}
                  </option>
                  <option
                    value={'B'}
                    onMouseEnter={() => {
                      setHover(true);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                    }}
                    style={{
                      color: colorMode === 'light' ? '#3e495c' : '#f3f4f1',
                      backgroundColor: 'none',
                      fontWeight: 'bold',
                      marginTop: '14px',
                    }}>
                    Type B
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - BURNABLE
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - SNAPSHOT
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - MINTABLE
                  </option>
                  <option
                    value={'A'}
                    style={{height: '14px', color: '#808992'}}
                    disabled>
                    {''}
                  </option>
                  <option
                    value={'C'}
                    onMouseEnter={() => {
                      setHover(true);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                    }}
                    style={{
                      color: colorMode === 'light' ? '#3e495c' : '#f3f4f1',
                      backgroundColor: 'none',
                      fontWeight: 'bold',
                      marginTop: '14px',
                    }}>
                    Type C
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - BURNABLE
                  </option>
                  <option
                    value={'A'}
                    style={{fontSize: '11px', color: '#808992'}}
                    disabled>
                    - MINTABLE
                  </option>
                </Select>
              </Flex>
            );
          }

          return (
            <Input
              isDisabled={disabled}
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
              _disabled={{
                bg: colorMode === 'dark' ? 'transparent' : '#e9edf1',
                color: colorMode === 'light' ? '#8f96a1' : '#484848',
                cursor: 'not-allowed',
                border:
                  colorMode === 'light'
                    ? '1px solid #dfe4ee'
                    : '1px solid #323232',
              }}
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
        w={'55%'}
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
