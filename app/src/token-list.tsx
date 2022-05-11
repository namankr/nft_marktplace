import React, { useState } from 'react';

import {
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import {
  AccountInfo,
  ParsedAccountData,
  PublicKey,
} from '@solana/web3.js';

export const TokenList = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [tokens, setTokens] = useState<Array<{
        pubkey: PublicKey;
        account: AccountInfo<Buffer | ParsedAccountData>;
      }> >([]);
  
      
    // useEffect(() => {
    //     async function fetchTokens() {
    //         if (!publicKey) throw new WalletNotConnectedError();

    //         const tokens = await connection.getParsedProgramAccounts(
    //             new PublicKey("HwAXhSmmvwBByqqJPRCChtXCeiAkFqstMpwxqjZXuf9F"),
    //             {
    //               filters: [
    //                 {
    //                   dataSize: 165, // number of bytes
    //                 },
    //                 {
    //                   memcmp: {
    //                     offset: 32, // number of bytes
    //                     bytes: publicKey.toString(), // base58 encoded string
    //                   },
    //                 },
    //               ],
    //             }
    //           );

    //           setTokens(tokens);
    //     }

    //     fetchTokens();
    // }, []);
      
    return (
        <div>
            PubKey: {publicKey?.toString()}
            {
                tokens.map(token => (
                    <div>
                        Token: {token.pubkey.toString()}
                    </div>
                ))
            }
        </div>
    );
};