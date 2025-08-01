// send USDT
'use client';


import React, { use, useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import { client } from '../../../client';

import {
    //ThirdwebProvider,
    ConnectButton,
  
    useConnect,
  
    useReadContract,
  
    useActiveWallet,

    useActiveAccount,
    useSendBatchTransaction,

    useConnectedWallets,

    useSetActiveWallet,
    
} from "thirdweb/react";

import {
    polygon,
    arbitrum,
    ethereum,
    bsc,
} from "thirdweb/chains";

import {
    getContract,
    //readContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import {
  balanceOf,
  transfer,
  allowance,
  approve,
  claimTo,
} from "thirdweb/extensions/erc20";
 









import {
  createWallet,
  inAppWallet,
} from "thirdweb/wallets";

import Image from 'next/image';

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";

import { useQRCode } from 'next-qrcode';

import {
  Scanner,
  useDevices,
  outline,
  boundingBox,
  centerText,
} from "@yudiel/react-qr-scanner";

const styles = {
  container: {
    width: 400,
    margin: "auto",
  },
  controls: {
    marginBottom: 8,
  },
};






const wallets = [
  inAppWallet({
    auth: {
      options: ["phone"],
    },
  }),
];




const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum
const contractAddressEthereum = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT on Ethereum
const contractAddressBsc = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC

const contractAddressSHKRW = "0xEb0a5ea0001Aa9f419BbaF8ceDad265A60f0B10f"; // MKRW on BSC




/*
const smartWallet = new smartWallet(config);
const smartAccount = await smartWallet.connect({
  client,
  personalAccount,
});
*/

import {
  useRouter,
  useSearchParams
} from "next//navigation";

import { Select } from '@mui/material';
import { Sen } from 'next/font/google';
import { Router } from 'next/router';
import path from 'path';

import { TronWeb, utils as TronWebUtils, Trx, TransactionBuilder, Contract, Event, Plugin } from 'tronweb';







/*
const transactions = await Engine.searchTransactions({
  client,
  filters: [
    {
      filters: [
        {
          field: "from",
          values: ["0x1234567890123456789012345678901234567890"],
        },
        {
          field: "chainId",
          values: ["8453"],
        },
      ],
      operation: "AND",
    },
  ],
  pageSize: 100,
  page: 0,
});
console.log(transactions);
*/






export default function SendUsdt({ params }: any) {




  const [recipient, setRecipient] = useState({
    _id: '',
    id: 0,
    email: '',
    nickname: '',
    avatar: '',
    mobile: '',
    walletAddress: '',
    tronWalletAddress: '',
    createdAt: '',
    settlementAmountOfFee: '',
  });

  //console.log("recipient", recipient);



  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [tracker, setTracker] = useState<string | undefined>("centerText");
  const [pause, setPause] = useState(false);

  const devices = useDevices();

  function getTracker() {
    switch (tracker) {
      case "outline":
        return outline;
      case "boundingBox":
        return boundingBox;
      case "centerText":
        return centerText;
      default:
        return undefined;
    }
  }

  const handleScan = async (data: string) => {
    setPause(true);

    /*
    setRecipient({
      _id: '',
      id: 0,
      email: '',
      nickname: '',
      avatar: '',
      mobile: '',
      walletAddress: data,
      tronWalletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
    });
    */
    setRecipient({
      ...recipient,
      walletAddress: data,
    })

    // close scanner
    setShowQrScanner(false);

    /*
    try {

      const response = await fetch(
        `your-api-url?code=${encodeURIComponent(data)}`
      );
      const result = await response.json();

      if (response.ok && result.success) {
        alert("Success! Welcome to the conference.");
      } else {
        alert(result.message);
      }


    } catch (error: unknown) {
      console.log(error);
    } finally {
      setPause(false);
    }
    */

  };









  //console.log("params", params);

  const searchParams = useSearchParams();
 

  //const token = searchParams.get('token');

  const token = "MKRW"; // hardcoded for now, can be changed later


  const center = searchParams.get('center');


  const agent = searchParams.get('agent');
  const agentNumber = searchParams.get('tokenId');

  

  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: params.chain === "bsc" ? bsc : params.chain === "arbitrum" ? arbitrum : params.chain === "polygon" ? polygon : params.chain === "ethereum" ? ethereum : polygon,
  
  
  
    // the contract's address
    ///address: contractAddress,

  

    address: params.chain === "bsc" ? contractAddressBsc : params.chain === "arbitrum" ? contractAddressArbitrum : params.chain === "polygon" ? contractAddress : params.chain === "ethereum" ? contractAddressEthereum : contractAddress,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });




  const contractMKRW = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    chain: bsc,
    // the contract's address
    address: contractAddressSHKRW,
  });



  



  const { Canvas } = useQRCode();










  const [data, setData] = useState({
    title: "",
    description: "",

    menu : {
      buy: "",
      sell: "",
      trade: "",
      chat: "",
      history: "",
      settings: "",
    },

    Go_Home: "",
    My_Balance: "",
    My_Nickname: "",
    My_Buy_Trades: "",
    My_Sell_Trades: "",
    Buy: "",
    Sell: "",
    Buy_USDT: "",
    Sell_USDT: "",
    Contact_Us: "",
    Buy_Description: "",
    Sell_Description: "",
    Send_USDT: "",
    Pay_USDT: "",
    Coming_Soon: "",
    Please_connect_your_wallet_first: "",

    USDT_sent_successfully: "",
    Failed_to_send_USDT: "",

    Go_Buy_USDT: "",
    Enter_Wallet_Address: "",
    Enter_the_amount_and_recipient_address: "",
    Select_a_user: "",
    User_wallet_address: "",
    This_address_is_not_white_listed: "",
    If_you_are_sure_please_click_the_send_button: "",

    Sending: "",

    Anonymous: "",

    My_Wallet_Address: "",

  } );

  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);

  const {
    title,
    description,
    menu,
    Go_Home,
    My_Balance,
    My_Nickname,
    My_Buy_Trades,
    My_Sell_Trades,
    Buy,
    Sell,
    Buy_USDT,
    Sell_USDT,
    Contact_Us,
    Buy_Description,
    Sell_Description,
    Send_USDT,
    Pay_USDT,
    Coming_Soon,
    Please_connect_your_wallet_first,

    USDT_sent_successfully,
    Failed_to_send_USDT,

    Go_Buy_USDT,
    Enter_Wallet_Address,
    Enter_the_amount_and_recipient_address,
    Select_a_user,
    User_wallet_address,
    This_address_is_not_white_listed,
    If_you_are_sure_please_click_the_send_button,

    Sending,

    Anonymous,

    My_Wallet_Address,

  } = data;



  const router = useRouter();



  const activeAccount = useActiveAccount();

  const address = activeAccount?.address;



  const usdtRate = 1360;


  const [amount, setAmount] = useState(0);






  const [balance, setBalance] = useState(0);
  useEffect(() => {

    // get the balance
    const getBalance = async () => {

      if (!address || !params.chain ) return;
  
      try {


          const result = await balanceOf({
            contract : contract,
            address: address,
          });

          if (result !== undefined && result !== null) {
            if (params.chain === "bsc") {
              setBalance( Number(result) / 10 ** 18 );
            } else {
              setBalance( Number(result) / 10 ** 6 );
            }
          } else {
            setBalance(0);
          }

      } catch (error) {
        console.error("Error getting balance:", error);
        setBalance(0);
      }

    };

    if (address && params.chain) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);


  } , [address, params.chain, contract]);





  const [balanceMKRW, setBalanceMKRW] = useState(0);
  useEffect(() => {

    // get the balance
    const getBalance = async () => {

      if (!address || !params.chain ) return;
  
      try {


          const result = await balanceOf({
            contract : contractMKRW,
            address: address,
          });

          if (result !== undefined && result !== null) {
              setBalanceMKRW( Number(result) / 10 ** 18 );
          } else {
            setBalanceMKRW(0);
          }

      } catch (error) {
        console.error("Error getting balance:", error);
        setBalanceMKRW(0);
      }

    };

    if (address && params.chain) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 1000);

    return () => clearInterval(interval);


  } , [address, params.chain, contractMKRW]);








  const [user, setUser] = useState(
    {
      _id: '',
      id: 0,
      email: '',
      nickname: '',
      avatar: '',
      mobile: '',
      walletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
      tronWalletAddress: '',
      tronWalletPrivateKey: '',
    }
  );

  useEffect(() => {

    if (!address) return;

    const getUser = async () => {

      const response = await fetch('/api/user/getUserByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
        }),
      });

      if (!response) return;

      const data = await response.json();


      setUser(data.result);

    };

    getUser();

  }, [address]);








  // get list of user wallets from api
  const [users, setUsers] = useState([
    {
      _id: '',
      id: 0,
      email: '',
      avatar: '',
      nickname: '',
      mobile: '',
      walletAddress: '',
      createdAt: '',
      settlementAmountOfFee: '',
    }
  ]);

  const [totalCountOfUsers, setTotalCountOfUsers] = useState(0);

  useEffect(() => {

    if (!address) return;

    const getUsers = async () => {

      const response = await fetch('/api/user/getAllUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
      });

      if (!response) return;

      const data = await response.json();

      console.log("getUsers", data);


      ///setUsers(data.result.users);
      // set users except the current user

      setUsers(data.result.users.filter((user: any) => user.walletAddress !== address));



      setTotalCountOfUsers(data.result.totalCount);

    };

    ///getUsers();


  }, [address]);










  ///console.log("recipient", recipient);

  //console.log("recipient.walletAddress", recipient.walletAddress);
  //console.log("amount", amount);



  const [otp, setOtp] = useState('');

  
  
  /////const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(true); // for testing


  const [isSendedOtp, setIsSendedOtp] = useState(false);



  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const [isVerifingOtp, setIsVerifingOtp] = useState(false);

  

  const sendOtp = async () => {

    setIsSendingOtp(true);
      
    const response = await fetch('/api/transaction/setOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        walletAddress: address,
        mobile: user.mobile,
      }),
    });

    const data = await response.json();

    //console.log("data", data);

    if (data.result) {
      setIsSendedOtp(true);
      toast.success('OTP sent successfully');
    } else {
      toast.error('Failed to send OTP');
    }

    setIsSendingOtp(false);

  };

  const verifyOtp = async () => {

    setIsVerifingOtp(true);
      
    const response = await fetch('/api/transaction/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lang: params.lang,
        chain: params.chain,
        walletAddress: address,
        otp: otp,
      }),
    });

    const data = await response.json();

    //console.log("data", data);

    if (data.status === 'success') {
      setVerifiedOtp(true);
      toast.success('OTP verified successfully');
    } else {
      toast.error('Failed to verify OTP');
    }

    setIsVerifingOtp(false);
  
  }


  const [wantToReceiveWalletAddress, setWantToReceiveWalletAddress] = useState(true);


  const [sending, setSending] = useState(false);



  const sendUsdt = async () => {
    if (sending) {
      return;
    }

    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!amount) {
      toast.error('Please enter a valid amount');
      return;
    }

 

    setSending(true);



    try {



      console.log("recipient", recipient);

      let transaction = null;

        // send KCT
        // Call the extension function to prepare the transaction

        if (String(token).toLowerCase() === "usdt") {


          transaction = transfer({
 
              contract: contract,

              to: recipient.walletAddress,
              amount: amount,
          });

        } else if (String(token).toLowerCase() === "mkrw") {

          transaction = transfer({
              //contract,

              contract: contractMKRW,

              to: recipient.walletAddress,
              amount: amount,
          });
        } 

        if (!transaction) {
          toast.error("잘못된 토큰입니다.");
          setSending(false);
          return;
        }



        const { transactionHash } = await sendTransaction({
          
          account: activeAccount as any,

          transaction,
        });

        console.log("transactionHash", transactionHash);

        
        if (transactionHash) {

          /*
          await fetch('/api/transaction/setTransfer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lang: params.lang,
              chain: params.chain,
              walletAddress: address,
              amount: amount,
              toWalletAddress: recipient.walletAddress,
            }),
          });
          */



          //toast.success(USDT_sent_successfully);
          toast.success("전송 완료");

          setAmount(0); // reset amount

          // refresh balance

          // get the balance



          //console.log(result);

          if (String(token).toLowerCase() === "usdt") {
            const result = await balanceOf({
              contract: contract,
              address: address,
            });

            if (params.chain === "bsc") {
              setBalance( Number(result) / 10 ** 18 );
            } else {
              setBalance( Number(result) / 10 ** 6 );
            }

          } else if (String(token).toLowerCase() === "mkrw") {


            const result = await balanceOf({
              contract: contractMKRW,
              address: address,
            });

            setBalance( Number(result) / 10 ** 18 );
          }

        } else {

          toast.error("전송 실패");

        }

    

      


    } catch (error) {
      
      console.error("error", error);

      //toast.error(Failed_to_send_USDT);
      toast.error("전송 실패");
    }

    setSending(false);
  };



  // get user by wallet address
  const getUserByWalletAddress = async (walletAddress: string) => {

    const response = await fetch('/api/user/getUserByWalletAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: walletAddress,
      }),
    });

    const data = await response.json();

    //console.log("getUserByWalletAddress", data);

    return data.result;

  };

  const [isWhateListedUser, setIsWhateListedUser] = useState(false);



  const [selectDeposit, setSelectDeposit] = useState(false);
  const [selectWithdraw, setSelectWithdraw] = useState(false);
  const [selectSwap, setSelectSwap] = useState(true);






  // swap function
  // 스왑할 수량
  const [swapAmount, setSwapAmount] = useState(0);

  // 스왑될 수량
  const [swapAmountTo, setSwapAmountTo] = useState(0);


  const [loadingSwap, setLoadingSwap] = useState(false);

  const winpay = async () => {
    if (loadingSwap) {
      return;
    }

    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!swapAmount) {
      toast.error('Please enter a valid amount');
      return;
    }


    console.log("swapAmount", swapAmount);
    console.log("swapAmountTo", swapAmountTo);



    setLoadingSwap(true);

    try {

      // api call to winpay
      const response = await fetch('/api/winpay/buyPoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          amount: swapAmount,
          toWalletAddress: address, // toWalletAddress is same as walletAddress for now
        }),
      });
      const data = await response.json();
      console.log("winpay response", data);

      if (data.status === 'success') {

        const jwtToken = data.jwtToken;

        console.log("jwtToken", jwtToken);


        toast.success("포인트 구매 성공");

        setSwapAmount(0); // reset amount
        setSwapAmountTo(0); // reset amount to



      } else {
        toast.error("포인트 구매 실패");
      }

    } catch (error) {
      
      console.error("error", error);

      toast.error("구매 실패");
    }

    setLoadingSwap(false);

  }

  

  // toggle qr scanner
  const [showQrScanner, setShowQrScanner] = useState(false);




  /*
  const [transferListKCT, setTransferListKCT] = useState([]);
  const [loadingTransferListKCT, setLoadingTransferListKCT] = useState(false);
  useEffect(() => {
    const getTransferListKCT = async () => {
      setLoadingTransferListKCT(true);
      const response = await fetch('/api/transfer/getAllTransferKCT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
        }),
      });
      if (!response.ok) {
        toast.error("전송 내역을 불러오는 데 실패했습니다.");
        setLoadingTransferListKCT(false);
        return;
      }
      const data = await response.json();

      setTransferListKCT(data.result.transfers);

      setLoadingTransferListKCT(false);
    };


    if (address) {
      getTransferListKCT();
    }

    // setInterval to refresh transfer list every 5 seconds
    const interval = setInterval(() => {
      if (address) {
        getTransferListKCT();
      }
    }
    , 5000);
    return () => {
      clearInterval(interval);
    };


  }, [address]);
  */



  // transfer list USDT
  /*
  const [transferListUSDT, setTransferListUSDT] = useState([]);
  const [loadingTransferListUSDT, setLoadingTransferListUSDT] = useState(false);
  useEffect(() => {
    const getTransferListUSDT = async () => {
      setLoadingTransferListUSDT(true);
      const response = await fetch('/api/transfer/getAllTransferUSDT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
        }),
      });
      if (!response.ok) {
        toast.error("전송 내역을 불러오는 데 실패했습니다.");
        setLoadingTransferListUSDT(false);
        return;
      }
      const data = await response.json();
      setTransferListUSDT(data.result.transfers);
      setLoadingTransferListUSDT(false);
    };
    if (address) {
      getTransferListUSDT();
    }

    // setInterval to refresh transfer list every 5 seconds
    const interval = setInterval(() => {
      if (address) {
        getTransferListUSDT();
      }
    }
    , 5000);
    return () => {
      clearInterval(interval);
    };
  }, [address]);
  */



  return (

    <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto
      bg-[#E7EDF1] text-gray-800 font-sans antialiased relative overflow-x-hidden
      "
    >


      {/* go back button is left side of the screen */}
      {/* and title is absolutely horizontal center position */}

      <div className="p-2 w-full flex flex-row items-center justify-between bg-white border-b border-gray-300
      fixed top-0 left-0 z-50">
        <button
            onClick={() => router.back()}
            className="flex flex-row items-center justify-center bg-gray-200 rounded-lg
            p-2 gap-2 hover:bg-gray-300 transition-colors duration-200"
        >
            <Image
                src="/icon-back.png"
                alt="Back"
                width={20}
                height={20}
                className="rounded-full"
            />
            <div className="text-sm font-semibold text-gray-800">
              <span className="inline">
                뒤로가기
              </span>
            </div>
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          포인트 구매
        </h1>

      </div>










      


    </main>

  );

}





function Header(
  {
      lang,
      chain,
      center,
      agent,
      tokenId,
  } : {
      lang: string
      chain: string
      center: string
      agent: string
      tokenId: string
  }
) {

  const router = useRouter();


  return (
    <header className="flex flex-col items-center mb-5 md:mb-10">

      {/* header menu */}
      <div className="w-full flex flex-row justify-between items-center gap-2
        bg-green-500 p-4 rounded-lg mb-5
      ">
          {/* logo */}
          <button
              onClick={() => {
                  router.push(
                    '/' + lang + '/' + chain + '/?agent=' + agent + '&tokenId=' + tokenId
                  );
              }}
          >            
              <div className="flex flex-row gap-2 items-center">
                  <Image
                  src="/logo.png"
                  alt="Circle Logo"
                  width={35}
                  height={35}
                  className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
                  />
                  <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
                  MKRW
                  </span>
              </div>
          </button>

        {/* menu */}
        {/*
        <div className="flex flex-row gap-2 items-center">

              <button
                onClick={() => {
                    router.push(
                        '/ko/polygon/my-nft?agent=' + agent + '&tokenId=' + tokenId + '&center=' + center
                    );
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
              >
                NFT
              </button>

        </div>
        */}
        
      </div>
      
    </header>
  );
}