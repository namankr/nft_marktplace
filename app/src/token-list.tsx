import React, {
  useEffect,
  useState,
} from 'react';

import {
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import {
  PublicKey,
  TokenAmount,
} from '@solana/web3.js';

export const TokenList = () => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const [tokenBalance, setTokenBalance] = useState<TokenAmount>();
  
      
    useEffect(() => {
        async function fetchTokens() {
            if (!wallet.publicKey) return;

            const tokenBalance = (await connection.getTokenAccountBalance(new PublicKey('HwAXhSmmvwBByqqJPRCChtXCeiAkFqstMpwxqjZXuf9F'))).value;

            setTokenBalance(tokenBalance);
        }

        fetchTokens();
    }, [wallet]);
      
    return (
        <div>
            PubKey: {wallet.publicKey?.toString()}
            <p>Token Balance for your token: { tokenBalance?.uiAmountString }</p>
            
        </div>
    );

};