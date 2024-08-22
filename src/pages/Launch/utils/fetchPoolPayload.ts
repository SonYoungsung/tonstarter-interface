import axios from 'axios';
import {Position} from '@uniswap/v3-sdk';
import {DEPLOYED} from 'constants/index';

export const fetchPoolPayload = async (library: any) => {
  const {
    pools: {TOS_WTON_POOL},
  } = DEPLOYED;

  const subgraphURL = process.env.REACT_APP_SUBGRAPH_ENDPOINT;

  if (library && TOS_WTON_POOL && subgraphURL) {
    const res = await axios.post(subgraphURL, {
      query: `{pool(id: "0x1c0ce9aaa0c12f53df3b4d8d77b82d6ad343b4e4") {
        id
        token0Price
        token1Price
        token0 {
          symbol
          id
        }
        token1 {
          symbol
          id
        }
      }}`,
      variables: null,
    });

    return res.data.data.pool;
  }
  // console.log('TOS_WTON_POOL',TOS_WTON_POOL);
};
