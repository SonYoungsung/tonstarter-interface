type VaultName =
  | 'Public'
  | 'Initial Liquidity'
  | 'TON Staker'
  | 'TOS Staker'
  | 'WTON-TOS LP Reward'
  | 'Liquidity Incentive'
  | string;

type VaultType =
  | 'Public'
  | 'Initial Liquidity'
  | 'TON Staker'
  | 'TOS Staker'
  | 'WTON-TOS LP Reward'
  | 'Liquidity Incentive'
  | 'DAO'
  | 'C';

interface Vault {
  vaultName: VaultName;
  vaultType: VaultType;
  vaultTokenAllocation: number;
  adminAddress: string;
  isMandatory: boolean;
  vaultAddress: string | undefined;
  index: number;
  isDeployed: boolean;
  isSet: boolean;
  isDeployedErr: boolean;
}

interface VaultSchedule {
  claimRound: number | undefined;
  claimTime: number | undefined;
  claimTokenAllocation: number | undefined;
}

type VaultCommon = Vault & {claim: VaultSchedule[]};

type VaultDao = VaultCommon & {};

type VaultLiquidity = VaultCommon & {};

type VaultTON = VaultCommon & {};

type VaultTOS = VaultCommon & {};

type VaultPublic = VaultCommon & {
  stosTier: {
    oneTier: {
      requiredStos: number | undefined;
      allocatedToken: number | undefined;
    };
    twoTier: {
      requiredStos: number | undefined;
      allocatedToken: number | undefined;
    };
    threeTier: {
      requiredStos: number | undefined;
      allocatedToken: number | undefined;
    };
    fourTier: {
      requiredStos: number | undefined;
      allocatedToken: number | undefined;
    };
  };
  snapshot: number | undefined;
  whitelist: number | undefined;
  whitelistEnd: number | undefined;
  publicRound1: number | undefined;
  publicRound1End: number | undefined;
  publicRound2: number | undefined;
  publicRound2End: number | undefined;
  publicRound1Allocation: number | undefined;
  publicRound2Allocation: number | undefined;
  claimStart: number | undefined;
  tokenAllocationForLiquidity: number | undefined;
  hardCap: number | undefined;
  addressForReceiving: string | undefined;
};

type VaultC = VaultCommon & {};
type VaultLiquidityIncentive = VaultCommon & {
  poolAddress: string | undefined;
  tokenPair: string | undefined;
};

type VaultAny = VaultPublic | VaultDao | VaultC | VaultLiquidityIncentive;

type TokenType = 'A' | 'B' | 'C';

interface ProjectStep1 {
  projectName: string | undefined;
  description: string | undefined;
  tokenName: string | undefined;
  tokenSymbol: string | undefined;
  totalSupply: number | undefined;
  tokenType: TokenType | undefined;
  ownerAddress: string;
  owner: string | undefined;
  sector: string;
  tokenSymbolImage: string;
  website: string;
  medium: string;
  telegram: string;
  twitter: string;
  discord: string;
}
interface ProjectStep2 {
  vaults: VaultAny[];
  tosPrice: number;
  projectTokenPrice: number;
  totalTokenAllocation: number;
  salePrice: number;
}

interface ProjectStep3 {
  isTokenDeployed: boolean;
  isAllDeployed: boolean;
  tokenAddress: string;
  isTokenDeployedErr: boolean;
}

type Project = ProjectStep1 & ProjectStep2 & ProjectStep3;

type Projects = {
  CreateProject: Project;
};

type ChainNumber = 1 | 4;

type StepNumber = 1 | 2 | 3;

type PublicTokenColData = {
  firstColData: [
    {
      title: 'Public Round 1';
      content: string | undefined;
      percent: number | undefined;
      formikName: string;
      err: boolean;
    },
    {
      title: 'Public Round 2';
      content: string | undefined;
      percent: number | undefined;
      formikName: string;
      err: boolean;
    },
    {
      title: 'Token Allocation for Liquidity Pool (5~50%)';
      content: string | undefined;
      formikName: string;
      err: boolean;
    },
    {
      title: 'Minimum Fundraising Amount';
      content: string | undefined;
      formikName: string;
      err: boolean;
    },
    {
      title: 'Address for receiving funds';
      content: string | undefined;
      formikName: string;
      err: boolean;
    },
  ];
  secondColData: [
    {
      title: 'Snapshot';
      content: string;
      formikName: string;
      err: boolean;
    },
    {
      title: 'Whitelist';
      content: string;
      formikName: string;
      err: boolean;
    },
    {
      title: 'Public Round 1';
      content: string;
      formikName: string;
      err: boolean;
    },
    {
      title: 'Public Round 2';
      content: string;
      formikName: string;
      err: boolean;
    },
  ];
  thirdColData: [
    {
      tier: '1';
      requiredTos: number | undefined;
      allocatedToken: number | undefined;
      formikName: string;
      err: boolean;
    },
    {
      tier: '2';
      requiredTos: number | undefined;
      allocatedToken: number | undefined;
      formikName: string;
      err: boolean;
    },
    {
      tier: '3';
      requiredTos: number | undefined;
      allocatedToken: number | undefined;
      formikName: string;
      err: boolean;
    },
    {
      tier: '4';
      requiredTos: number | undefined;
      allocatedToken: number | undefined;
      formikName: string;
      err: boolean;
    },
  ];
  liquidityColData?: [
    {
      title: 'Select Pair';
      content: string | undefined;
      formikName: string;
    },
    {
      title: 'Pool Address\n(0.3% fee)';
      content: string | undefined;
      formikName: string;
    },
  ];
  initialLiquidityColData?: [
    {
      title: 'Select Pair';
      content: string | undefined;
      formikName: string;
    },
    {
      title: 'Pool Address\n(0.3% fee)';
      content: string | undefined;
      formikName: string;
    },
    {
      title: 'Exchange Ratio\n1 TOS';
      content: string | undefined;
      formikName: string;
    },
  ];
};

type Step3_InfoList = {
  [Key: string]: {title: string; content: string | number; isHref?: boolean}[];
};

interface I_StarterProject {
  name: string;
  saleStart: string;
  saleEnd: string;
  current: number;
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: string;
}

type ProjectCardType = {
  data: {
    description: string;
    isAllDeployed: boolean;
    isTokenDeployed: boolean;
    isTokenDeployedErr: boolean;
    owner: string;
    ownerAddress: string;
    projectName: string;
    projectTokenPrice: number;
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
    tosPrice: number;
    totalSupply: number;
    totalTokenAllocation: String;
    vaults: VaultAny[];
  };
  key: string;
};

export type {
  Projects,
  ProjectStep1,
  ProjectStep2,
  ProjectStep3,
  ChainNumber,
  StepNumber,
  Vault,
  VaultDao,
  VaultPublic,
  VaultC,
  VaultCommon,
  VaultName,
  VaultAny,
  VaultSchedule,
  PublicTokenColData,
  VaultType,
  Step3_InfoList,
  VaultLiquidityIncentive,
  ProjectCardType,
  TokenType,
};
