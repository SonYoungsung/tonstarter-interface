import {Flex, Box, useColorMode, useTheme} from '@chakra-ui/react';
import {PageHeader} from 'components/PageHeader';
import {useActiveWeb3React} from 'hooks/useWeb3';
import {useEffect, useMemo, useState} from 'react';
import {ListTable} from './components/ListTable';
import {DistributeModal} from './components/DistributeModal';
import {AdminObject, ListingTableData} from './types';
import {fetchStarterURL} from 'constants/index';
import AdminActions from './actions';
import moment from 'moment';

export const ListingProjects = () => {
  const theme = useTheme();
  const {account, library} = useActiveWeb3React();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProjectsData() {
      const starterReq = await fetch(fetchStarterURL)
        .then((res) => res.json())
        .then((result) => result);

      const starterData = starterReq.datas;
      const nowTimeStamp = moment().unix();
      const res = await Promise.all(
        starterData.map(async (data: any) => {
          if (data.adminAddress === account) {
            const {
              endAddWhiteTime,
              endExclusiveTime,
              endDepositTime,
              saleContractAddress,
            } = data;
            const saleAmount = await AdminActions.getSaleAmount({
              library,
              address: saleContractAddress,
            });
            const checkStep =
              endAddWhiteTime > nowTimeStamp
                ? 'Whitelist'
                : endExclusiveTime > nowTimeStamp
                ? 'Public Round 1'
                : endDepositTime > nowTimeStamp
                ? 'Public Round 2'
                : 'Claim';
            return {...data, status: checkStep, saleAmount};
          }
        }),
      );
      if (res[0] !== undefined) {
        setProjects(res);
        return setLoading(false);
      } else {
        return setProjects([]);
      }
    }
    fetchProjectsData();
  }, [account, library]);

  const dummyData: {
    data: AdminObject[];
    columns: any;
    isLoading: boolean;
  } = {
    data: projects,
    columns: useMemo(
      () => [
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Token',
          accessor: 'token',
        },
        {
          Header: 'Sale Start',
          accessor: 'saleStart',
        },
        {
          Header: 'Sale End',
          accessor: 'saleEnd',
        },
        {
          Header: 'Sale Amount',
          accessor: 'saleAmount',
        },
        {
          Header: 'Funding Raised',
          accessor: 'fundingRaised',
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Airdrop',
          accessor: 'airdrop',
        },
      ],
      [],
    ),
    isLoading: loading,
  };

  const {data, columns, isLoading} = dummyData;

  return (
    <Flex mt={'110px'} flexDir="column" alignItems="center">
      <PageHeader
        title={'Listing Projects'}
        subtitle={
          'It shows the names of the projects, their tokens and their current sales.'
        }
      />
      <Flex mt={'60px'}>
        {data.length > 0 ? (
          <ListTable
            data={data}
            columns={columns}
            isLoading={isLoading}></ListTable>
        ) : (
          <div>no data for this account address</div>
        )}
      </Flex>
      <DistributeModal></DistributeModal>
    </Flex>
  );
};
