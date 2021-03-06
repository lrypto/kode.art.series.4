import React from 'react';
import { ActionType } from '../../common/Store';
import { notifyError } from '../../common/Actions';
import useAppContext from './useAppContext';
import { navigate } from '@reach/router';


//will this run over the portis provider?
export default function useInjectedWeb3() {
    const { state, dispatch } = useAppContext();
    let provider;

    // if metamask && no other provider currently, then go to connect page
     if (typeof window.ethereum === 'undefined' && !state.injectedProvider) { 
    //if (typeof window.ethereum === 'undefined') { 
        console.error('no metamask');
        navigate('gettingStarted');        
    }


    React.useEffect(() => {
      const windowProvider = async() => {
        if (typeof window.ethereum !== 'undefined'
            || (typeof window.web3 !== 'undefined')) {

            provider = window['ethereum'] || window.web3.currentProvider;
 
            try{
               await provider.enable();
            }catch (e){
                console.error('user refused to connect');
                notifyError('Please note that you are required to connect to this application for it to work correctly.')
            }
            //console.log('network:', provider.networkVersion);
            //console.log('selectedAddress:', provider.selectedAddress);
            //console.log('is metamask:', provider.isMetaMask);
          
            dispatch({
                type: ActionType.SET_INJECTED_PROVIDER,
                payload: provider
            })

            provider.on('accountsChanged', function(accounts) {
                console.log("accounts changed");
                dispatch({
                    type: ActionType.SET_SELECTED_ETH_ADDR,
                    payload: accounts[0]
                })
            })

            provider.on('networkChanged', function(accounts) {
                console.log('networkChanged changed');
                console.log(accounts);
            })

          }
        }

        windowProvider();
    }, [window['ethereum']]);

    return provider;
}

