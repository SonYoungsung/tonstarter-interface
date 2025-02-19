import {Button, Flex, useTheme} from '@chakra-ui/react';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import OpenStepOne from '@Launch/components/OpenStepOne';
import {Formik, Form} from 'formik';
import useValues from '@Launch/hooks/useValues';
import type {StepNumber, VaultCommon} from '@Launch/types';
import ProjectSchema from '@Launch/utils/projectSchema';
import {PageHeader} from 'components/PageHeader';
import Steps from '@Launch/components/Steps';
import OpenStepTwo from '@Launch/components/OpenStepTwo';
import {useRouteMatch, useHistory, Redirect} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {selectLaunch, setHashKey} from '@Launch/launch.reducer';
import OpenStepThree from '@Launch/components/OpenStepThree';
import {useActiveWeb3React} from 'hooks/useWeb3';
import {saveProject, editProject} from '@Launch/utils/saveProject';

const StepComponent = (props: {
  step: StepNumber;
  setDisableForStep2: Dispatch<SetStateAction<boolean>>;
}) => {
  const {step, setDisableForStep2} = props;
  switch (step) {
    case 1:
      return <OpenStepOne></OpenStepOne>;
    case 2:
      return (
        <OpenStepTwo setDisableForStep2={setDisableForStep2}></OpenStepTwo>
      );
    case 3:
      return <OpenStepThree></OpenStepThree>;
    default:
      return <div>no component for this step</div>;
  }
};

const MainScreen = () => {
  const [step, setStep] = useState<StepNumber>(1);
  const [isDisable, setDisable] = useState<boolean>(true);
  const [isDisableForStep2, setDisableForStep2] = useState<boolean>(true);
  const [isDisableForStep3, setDisableForStep3] = useState<boolean>(true);
  const theme = useTheme();
  const {account} = useActiveWeb3React();
  const {initialValues} = useValues(account || '');

  const match = useRouteMatch();
  const {url} = match;
  const isExist = url.split('/')[2];

  const dispatch = useAppDispatch();
  const {
    //@ts-ignore
    params: {id},
  } = match;
  const {
    data: {projects, hashKey, projectStep, tempProjectData},
  } = useAppSelector(selectLaunch);

  let historyObj = useHistory();

  const handleOnCofirm = useCallback(() => {
    historyObj.push('/launch');
  }, [historyObj]);

  useEffect(() => {
    //@ts-ignore
    const unBlock = historyObj.block((loc, action) => {
      if (action === 'POP' || action === 'PUSH') {
        return window.confirm(
          'Are you sure you want to go back?\nClick the Save button to save your progress before you leave.',
        );
      }
    });
    return () => unBlock();
  }, [historyObj]);

  useEffect(() => {
    dispatch(
      setHashKey({
        data:
          hashKey !== undefined
            ? hashKey
            : isExist === 'createproject'
            ? undefined
            : isExist,
      }),
    );
  }, [dispatch, hashKey, isExist]);

  useEffect(() => {
    setStep(projectStep);
  }, []);

  const handleStep = useCallback(
    (isNext: boolean) => {
      const prevStepNum =
        step - 1 > 0 ? ((step - 1) as StepNumber) : (step as StepNumber);
      const nextStepNum =
        step + 1 < 4 ? ((step + 1) as StepNumber) : (step as StepNumber);
      setStep(isNext ? nextStepNum : prevStepNum);
    },
    [step],
  );

  // const {web3Token} = useWeb3Token();

  const [oldData, setOldData] = useState();
  const [saveBtnDisable, setSaveBtnDisable] = useState(false);

  const formikRef = useRef(null);

  if (!account) {
    return <Redirect to={{pathname: '/launch'}}></Redirect>;
  }

  if (
    id !== undefined &&
    projects[id] &&
    projects[id]?.ownerAddress !== account
  ) {
    return <Redirect to={{pathname: '/launch'}}></Redirect>;
  }

  // console.log('tempProjectData',tempProjectData);

  return (
    <Flex
      flexDir={'column'}
      justifyContent={'center'}
      w={'100%'}
      mb={'100px'}
      pos="relative">
      <Flex alignItems={'center'} flexDir="column" mb={'20px'}>
        <PageHeader
          title={'Create Project'}
          subtitle={'You can create and manage projects.'}
        />
        <Flex mt={'50px'} mb={'20px'}>
          <Steps
            stepName={['Project & Token', 'Token Economy', 'Deploy']}
            currentStep={step}></Steps>
        </Flex>
      </Flex>
      <Formik
        innerRef={formikRef}
        initialValues={
          Object.keys(tempProjectData).length !== 0
            ? {...initialValues, ...tempProjectData}
            : id && projects
            ? {...initialValues, ...projects[id]}
            : {...initialValues, ownerAddress: account}
        }
        validationSchema={ProjectSchema}
        validate={(values) => {
          // console.log('--formikvalues--');
          // console.log(values);
          if (step === 3 && oldData !== values) {
            setOldData(values);
            hashKey === undefined
              ? saveProject(values, account as string)
              : editProject(values, account as string, hashKey);
          }
          if (step === 3) {
            const vaults = values.vaults;
            const result = vaults.map((vault: VaultCommon) => {
              return vault.isSet;
            });
            if (!result.includes(false)) {
              setDisableForStep3(false);
            }
          }
        }}
        onSubmit={async (data, {setSubmitting}) => {
          setSubmitting(true);
          setSubmitting(false);
        }}>
        {({values, handleBlur, handleSubmit, isSubmitting, errors}) => {
          if (Object.keys(errors).length !== 0) {
            setDisable(true);
          } else {
            setDisable(false);
          }
          return (
            <Form onSubmit={handleSubmit}>
              <Flex
                flexDir={'column'}
                alignItems="center"
                fontFamily={theme.fonts.roboto}>
                <StepComponent
                  step={step}
                  setDisableForStep2={setDisableForStep2}
                />
                <Flex mt={'50px'} fontSize={14} justifyContent="center">
                  <Button
                    type="submit"
                    isDisabled={isSubmitting}
                    w={'160px'}
                    h={'45px'}
                    borderRadius={4}
                    fontSize={14}
                    _hover={{}}
                    bg={isDisable ? 'gray.25' : '#00c3c4'}
                    color={isDisable ? '#86929d' : 'white.100'}
                    disabled={
                      step === 3 || (step === 1 && isDisable) || saveBtnDisable
                    }
                    mr={step === 1 ? '390px' : '558px'}
                    onClick={() =>
                      account &&
                      isExist === 'createproject' &&
                      hashKey === undefined
                        ? saveProject(values, account, true)
                        : editProject(
                            values,
                            account as string,
                            hashKey || isExist,
                            true,
                          )
                    }>
                    Save
                  </Button>
                  <Flex>
                    {step !== 1 && (
                      <Button
                        type="submit"
                        w={'160px'}
                        h={'45px'}
                        bg={'blue.500'}
                        fontSize={14}
                        color={'white.100'}
                        mr={'12px'}
                        disabled={isSubmitting}
                        _hover={{}}
                        borderRadius={4}
                        onClick={() => handleStep(false)}>
                        Prev
                      </Button>
                    )}
                    {step === 1 && (
                      <Button
                        type="submit"
                        w={'160px'}
                        h={'45px'}
                        fontSize={14}
                        color={isDisable ? '#86929d' : 'white.100'}
                        bg={isDisable ? 'gray.25' : 'blue.500'}
                        disabled={isDisable}
                        _hover={{}}
                        borderRadius={4}
                        onClick={() => {
                          account &&
                          isExist === 'createproject' &&
                          hashKey === undefined
                            ? saveProject(values, account)
                            : editProject(
                                values,
                                account as string,
                                hashKey || isExist,
                              );
                          handleStep(true);
                        }}>
                        Save & Continue
                      </Button>
                    )}
                    {step === 2 && (
                      <Button
                        type="submit"
                        w={'160px'}
                        h={'45px'}
                        fontSize={14}
                        color={isDisableForStep2 ? '#86929d' : 'white.100'}
                        bg={isDisableForStep2 ? 'gray.25' : 'blue.500'}
                        disabled={isDisableForStep2}
                        _hover={{}}
                        borderRadius={4}
                        onClick={() => {
                          account &&
                          isExist === 'createproject' &&
                          hashKey === undefined
                            ? saveProject(values, account)
                            : editProject(
                                values,
                                account as string,
                                hashKey || isExist,
                              );
                          handleStep(true);
                        }}>
                        Save & Continue
                      </Button>
                    )}
                    {step === 3 && (
                      <Button
                        type="submit"
                        w={'160px'}
                        h={'45px'}
                        fontSize={14}
                        color={isDisableForStep3 ? '#86929d' : 'white.100'}
                        bg={isDisableForStep3 ? 'gray.25' : 'blue.500'}
                        disabled={isDisableForStep3}
                        _hover={{}}
                        borderRadius={4}
                        onClick={() => {
                          handleOnCofirm();
                        }}>
                        Confirm
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default MainScreen;
