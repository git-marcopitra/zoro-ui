import { useMemo } from 'react';
import { Token, VToken } from 'types';


import {
  getComptrollerContract,
  //getGovernorBravoDelegateContract,
  //getMulticallContract,
  //getPoolLensContract,
  //getSwapRouterContract,
  getTokenContract,
  getVTokenContract,
  //getVaiControllerContract,
  //getVaiVaultContract,
  getVenusLensContract,
  //getVrtConverterProxyContract,
  //getXvsVaultContract,
  //getXvsVaultProxyContract,
  //getXvsVestingProxyContract,
} from './getters';
import { useSigner } from 'hooks/useSigner';

export const useTokenContract = (token: Token) => {
  const signer = useSigner();
  return useMemo(() => getTokenContract(token, signer), [signer, token]);
};

export const useVTokenContract = (vToken: VToken) => {
  const signer  = useSigner();
  return useMemo(() => getVTokenContract(vToken, signer ), [signer, vToken]);
};

export const useVaiControllerContract = () => {
  const signer  = useSigner();
  return useMemo(() => getVaiControllerContract(signer), [signer]);
};

export const useVaiVaultContract = () => {
  const signer  = useSigner();
  return useMemo(() => getVaiVaultContract(signer), [signer]);
};

export const useComptrollerContract = (address: string) => {
  const signer = useSigner();
  return useMemo(() => getComptrollerContract(address, signer || undefined), [signer]);
};

export const useVenusLensContract = () => {
  const signer = useSigner();
  return useMemo(() => getVenusLensContract(signer || undefined), [signer]);
};

//export const useXvsVaultContract = () => {
  //const { signer } = useAuth();
  //return useMemo(() => getXvsVaultContract(signer || undefined), [signer]);
//};

//export const useXvsVaultProxyContract = () => {
  //const { signer } = useAuth();
  //return useMemo(() => getXvsVaultProxyContract(signer || undefined), [signer]);
//};

//export const useGovernorBravoDelegateContract = () => {
  //const { signer } = useAuth();
  //return useMemo(() => getGovernorBravoDelegateContract(signer || undefined), [signer]);
//};

// VRT conversion
//export const useVrtConverterProxyContract = () => {
  //const { signer } = useAuth();
  //return useMemo(() => getVrtConverterProxyContract(signer || undefined), [signer]);
//};

//export const useXvsVestingProxyContract = () => {
  //const { signer } = useAuth();
  //return useMemo(() => getXvsVestingProxyContract(signer || undefined), [signer]);
//};

//export const useSwapRouterContract = (poolComptrollerAddress: string) => {
  //const { signer } = useAuth();
  //return useMemo(
    //() => getSwapRouterContract(poolComptrollerAddress, signer || undefined),
    //[signer],
  //);
//};

export const useMulticallContract = () => {
  const { signer } = useAuth();
  return useMemo(() => getMulticallContract(signer || undefined), [signer]);
};

export const useGetPoolLensContract = () => {
  const { signer } = useAuth();
  return useMemo(() => getPoolLensContract(signer || undefined), [signer]);
};
