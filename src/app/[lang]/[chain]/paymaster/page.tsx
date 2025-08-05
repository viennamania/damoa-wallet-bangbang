'use client';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';



import { useState, useEffect, use } from "react";



import { toast } from 'react-hot-toast';

import { client } from "../../../client";

import {
    getContract,
    sendAndConfirmTransaction,
    sendTransaction,
} from "thirdweb";



import {
    ConnectButton,
    useActiveAccount,
    useActiveWallet,
} from "thirdweb/react";
import {
  inAppWallet,
    createWallet,
} from "thirdweb/wallets";


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import Image from 'next/image';

import GearSetupIcon from "@/components/gearSetupIcon";


import Uploader from '@/components/uploader';

import { balanceOf, deposit, transfer } from "thirdweb/extensions/erc20";
 






// open modal

import Modal from '@/components/modal';

import { useRouter }from "next//navigation";

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";


import { useSearchParams } from "next/navigation";

import Link from "next/link";


import {
  ethereum,
  polygon,
  arbitrum,
  bsc,
} from "thirdweb/chains";

import {
  ethereumContractAddressUSDT,
  polygonContractAddressUSDT,
  arbitrumContractAddressUSDT,
  bscContractAddressUSDT,

  bscContractAddressMKRW,
} from "../../../config/contractAddresses";
import { send } from 'process';






interface SellOrder {
  _id: string;
  createdAt: string;
  nickname: string;
  avatar: string;

  trades: number;
  price: number;
  available: number;
  limit: string;
  paymentMethods: string[];

  usdtAmount: number;
  krwAmount: number;
  rate: number;

  walletAddress: string;

  seller: any;


  status: string;

  acceptedAt: string;
  paymentRequestedAt: string;
  paymentConfirmedAt: string;

  tradeId: string;

  buyer: any;

  privateSale: boolean;


  escrowTransactionHash: string;
  transactionHash: string;
}




/*
const wallets = [
  inAppWallet({
    auth: {
      options: ["phone", "email"],
    },
  }),
];
*/

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "email",
        "x",
        "passkey",
        "phone",
        "facebook",
        "line",
        "apple",
        "coinbase",
      ],
    },
  }),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
  createWallet("com.bitget.web3"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),

];


const recipientWalletAddress = "0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6";








// [orderId].tsx

//function SellUsdt(orderId: string) {


/*
export async function getStaticProps(context: any) {
    const orderId = context.params.orderId;
    return {
      props: {
        orderId,
      },
    };
}


export default function SellUsdt({ orderId }: InferGetStaticPropsType<typeof getStaticProps>) {
*/

///export default function SellUsdt() {



//export default function SellUsdt({ params }: { params: { orderId: string } }) {

 
 
/*
// random deposit name
// korean your name
const randomDepositName = [
  '김철수', 
  '이영희',
  '박영수',
  '정미영',
  '오재원',
  '최지연',
  '강민수',
  '윤지원',
  '서동훈',
  '신미정',
  '조영호',
  '임지은',
  '한상훈',
  '황미정',
  '백성호',
  '전지은',
  '고상훈',
  '권미정',
  '문성호',
  '송지은',
  '류상훈',
  '안미정',
  '손성호',
  '홍지은',
  '이상훈',
  '김미정',
  '박성호',
  '이지은',
  '최상훈',
  '정미정',
  '오성호',
  '윤지은',
];

// random korea bank name
const koreanBankName = [
  '국민은행',
  '신한은행',
  '우리은행',
  '하나은행',
  '기업은행',
  '농협은행',
  '외환은행',
  'SC제일은행',
  '씨티은행',
  '대구은행',
  '부산은행',
  '경남은행',
  '광주은행',
  '전북은행',
  '제주은행',
  '새마을금고',
  '신협',
  '우체국',
  '카카오뱅크',
  '케이뱅크',
];

*/
  
 


export default function Index({ params }: any) {

    //console.log('params', params);

    // get params

    const { lang, chain } = params;

    const searchParams = useSearchParams();

    const storeUser = searchParams.get('storeUser');

    console.log('storeUser', storeUser);


    //const storecode = storeUser?.split('@').slice(-1)[0];
    //const memberid = storeUser?.split('@').slice(0, -1).join('@');

    
    const storecode = "admin";

    console.log("storecode", storecode);

    const paramStoreUser = storeUser;

 
    //console.log("memberid", memberid);

  


  

    const paramDepositName = searchParams.get('depositName');
    const paramDepositBankName = searchParams.get('depositBankName');
    const paramDepositBankAccountNumber = searchParams.get('depositBankAccountNumber');
    




    const contract = getContract({
      // the client you have created via `createThirdwebClient()`
      client,

      chain: chain === "ethereum" ? ethereum :
              chain === "polygon" ? polygon :
              chain === "arbitrum" ? arbitrum :
              chain === "bsc" ? bsc : arbitrum,
   
      address: chain === "ethereum" ? ethereumContractAddressUSDT :
              chain === "polygon" ? polygonContractAddressUSDT :
              chain === "arbitrum" ? arbitrumContractAddressUSDT :
              chain === "bsc" ? bscContractAddressUSDT : arbitrumContractAddressUSDT,
  
  
      // OPTIONAL: the contract's abi
      //abi: [...],
    });
  


    const contractMKRW = getContract({
      // the client you have created via `createThirdwebClient()`
      client,

      // the chain the contract is deployed on
      chain: bsc,

      // the contract's address
      address: bscContractAddressMKRW,

      // OPTIONAL: the contract's abi
      //abi: [...],
    });


  
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
      Buy: "",
      Total: "",
      Orders: "",
      Trades: "",
      Search_my_trades: "",
  
      Seller: "",
      Buyer: "",
      Me: "",

      Price: "",
      Amount: "",
      Rate: "",
  
      Go_Buy_USDT: "",
      Go_Sell_USDT: "",

      Disconnect_Wallet: "",

      My_Order: "",

      Payment: "",
      Bank_Transfer: "",


      hours: "",
      minutes: "",
      seconds: "",

      hours_ago: "",
      minutes_ago: "",
      seconds_ago: "",

      Waiting_for_seller_to_deposit: "",
      to_escrow: "",

      If_you_request_payment: "",
      I_agree_to_escrow_USDT: "",


 
      Bank_Name: "",
      Account_Number: "",
      Account_Holder: "",
      Deposit_Name: "",
      Deposit_Amount: "",
      Deposit_Deadline: "",

      Waiting_for_seller_to_confirm_payment: "",

      Confirm_Payment: "",

      Connect_Wallet_Description_For_Buyers: "",

      I_agree_to_the_terms_of_trade: "",

      Requesting_Payment: "",

      Deposit_Information: "",

      Request_Payment: "",

      Checking_the_bank_transfer_from_the_buyer: "",

      I_agree_to_check_the_bank_transfer_of: "",

      Transfering_USDT_to_the_buyer_wallet_address: "",

      Anonymous: "",

      TID: "",

      Escrow: "",

      Profile: "",
      My_Profile_Picture: "",
  
      Edit: "",


      Cancel: "",
      Save: "",
      Enter_your_nickname: "",

      Nickname_should_be_5_10_characters: "",

      You_must_have_a_wallet_address_to_buy_USDT: "",
      Make_Wallet_Address: "",

      My_Wallet_Address: "",

      PRICE_10000_KRW: "",
      PRICE_50000_KRW: "",
      PRICE_100000_KRW: "",
      PRICE_300000_KRW: "",
      PRICE_500000_KRW: "",
      PRICE_1000000_KRW: "",
      PRICE_5000000_KRW: "",
      PRICE_10000000_KRW: "",

      Please_keep_Your_Wallet_address_safe: "",

      Waiting_for_the_USDT_to_be_sent_to_the_store_address: "",
      Successfully_sent_USDT_to_the_store_address: "",

      Order_accepted_successfully: "",

      Order_Opened: "",
      Trade_Started: "",

      When_the_deposit_is_completed: "",

      Completed_at: "",

      Please_enter_deposit_name: "",

      Copy: "",

      Your_wallet_address_is_copied: "",

      Charge: "",

      Deposit_name_description: "",

      Deposit_Confirmed: "",

      Account_number_has_been_copied: "",

      Payment_name_has_been_copied: "",

      Payment_amount_has_been_copied: "",

      My_Balance: "",


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
      Buy,
      Total,
      Orders,
      Trades,
      Price,
      Amount,
      Rate,

      Search_my_trades,
      Seller,
      Buyer,
      Me,
      Go_Buy_USDT,
      Go_Sell_USDT,

      Disconnect_Wallet,

      My_Order,

      Payment,
      Bank_Transfer,

      hours,
      minutes,
      seconds,

      hours_ago,
      minutes_ago,
      seconds_ago,

      Waiting_for_seller_to_deposit,
      to_escrow,

      If_you_request_payment,
      I_agree_to_escrow_USDT,

      Bank_Name,
      Account_Number,
      Account_Holder,
      Deposit_Name,
      Deposit_Amount,
      Deposit_Deadline,

      Waiting_for_seller_to_confirm_payment,

      Confirm_Payment,

      Connect_Wallet_Description_For_Buyers,

      I_agree_to_the_terms_of_trade,

      Requesting_Payment,

      Deposit_Information,

      Request_Payment,

      Checking_the_bank_transfer_from_the_buyer,

      I_agree_to_check_the_bank_transfer_of,

      Transfering_USDT_to_the_buyer_wallet_address,

      Anonymous,

      TID,

      Escrow,

      Profile,
      My_Profile_Picture,

      Edit,

      Cancel,
      Save,
      Enter_your_nickname,

      Nickname_should_be_5_10_characters,

      You_must_have_a_wallet_address_to_buy_USDT,
      Make_Wallet_Address,

      My_Wallet_Address,

      PRICE_10000_KRW,
      PRICE_50000_KRW,
      PRICE_100000_KRW,
      PRICE_300000_KRW,
      PRICE_500000_KRW,
      PRICE_1000000_KRW,
      PRICE_5000000_KRW,
      PRICE_10000000_KRW,

      Please_keep_Your_Wallet_address_safe,

      Waiting_for_the_USDT_to_be_sent_to_the_store_address,
      Successfully_sent_USDT_to_the_store_address,

      Order_accepted_successfully,

      Order_Opened,
      Trade_Started,

      When_the_deposit_is_completed,

      Completed_at,

      Please_enter_deposit_name,

      Copy,

      Your_wallet_address_is_copied,

      Charge,

      Deposit_name_description,

      Deposit_Confirmed,

      Account_number_has_been_copied,

      Payment_name_has_been_copied,

      Payment_amount_has_been_copied,

      My_Balance,

    } = data;
   
 
 
 
 
  const router = useRouter();
    

  //const orderId = params.orderId as string;

  const orderId = "0";
  
  ///console.log('orderId', orderId);


 

    // get the active wallet
    const activeWallet = useActiveWallet();



  const activeAccount = useActiveAccount();
  const address = activeAccount?.address || "";


  console.log('address==============>', address);




  const [balance, setBalance] = useState(0);
  useEffect(() => {

    if (!address) {
      return;
    }

    // get the balance
    const getBalance = async () => {
      const result = await balanceOf({
        contract,
        address: address,
      });
  
      if (chain === 'bsc') {
        setBalance( Number(result) / 10 ** 18 );
      } else {
        setBalance( Number(result) / 10 ** 6 );
      }
  
    };

    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 5000);

    return () => clearInterval(interval);

  } , [address, contract, chain]);


  // balance of MKRW
  const [mkrwBalance, setMkrwBalance] = useState(0);
  useEffect(() => {
    if (!address) {
      return;
    }
    // get the balance
    const getMkrwBalance = async () => {
      const result = await balanceOf({
        contract: contractMKRW,
        address: address,
      });
  
      setMkrwBalance( Number(result) / 10 ** 18 );

  
    };
    if (address) getMkrwBalance();
    const interval = setInterval(() => {
      if (address) getMkrwBalance();
    } , 5000);
    return () => clearInterval(interval);
  }, [address, contractMKRW]);




    

    // fetch store info by storecode
    const [storeInfo, setStoreInfo] = useState<any>(null);
    const [loadingStoreInfo, setLoadingStoreInfo] = useState(false);
    useEffect(() => {
      const fetchStoreInfo = async () => {
        if (!storecode) {
          return;
        }

        setLoadingStoreInfo(true);
        const response = await fetch('/api/singal/getOneStore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            storecode: storecode,
          }),
        });

        if (!response) {
          setLoadingStoreInfo(false);
          toast.error('가맹점 정보를 가져오는 데 실패했습니다.');
          return;
        }
  
        const data = await response?.json();
  
        console.log('data', data);
  
        if (data.result) {
          setStoreInfo(data.result);
        }
  
        setLoadingStoreInfo(false);
      };
  
      fetchStoreInfo();
    }, [storecode]);

    /*
    {
    "_id": "681b3cd4b6da3a9ffe0f7831",
    "storecode": "wmipqryz",
    "storeName": "비고비",
    "storeType": "test",
    "storeUrl": "https://test.com",
    "storeDescription": "설명입니다.",
    "storeLogo": "https://www.stable.makeup/logo.png",
    "storeBanner": "https://www.stable.makeup/logo.png",
    "createdAt": "2025-05-07T10:58:28.019Z"
    }
    */



   


    const [nickname, setNickname] = useState(storeUser);

    const [inputNickname, setInputNickname] = useState('');


   // select krw amount (10000, 50000, 100000, 300000, 500000, 1000000, 5000000, 10000000)

   const [krwAmounts, setKrwAmounts] = useState([10000, 50000, 100000, 300000, 500000, 1000000, 5000000, 10000000]);
   // select one of krw amount

   const [selectedKrwAmount, setSelectedKrwAmount] = useState(0);







    // user walletAddress is auto generated or not
    const [isMyWalletAddress, setIsMyWalletAddress] = useState(false);
    const [memberid, setMemberId] = useState("");

    const [userPassword, setUserPassword] = useState('');



   const [depositName, setDepositName] = useState(
     ////randomDepositName[Math.floor(Math.random() * randomDepositName.length)]
     paramDepositName
   );

   const [depositBankName, setDepositBankName] = useState(
     //koreanBankName[Math.floor(Math.random() * koreanBankName.length)]
     paramDepositBankName
   );

   const [depositBankAccountNumber, setDepositBankAccountNumber] = useState(
     paramDepositBankAccountNumber
   );






   /*
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);


  useEffect(() => {

    if (!address) {

      setUser(null);
      return;
    }

    setLoadingUser(true);

    fetch('/api/user/getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storecode: storecode,
            walletAddress: address,
        }),
    })
    .then(response => response.json())
    .then(data => {
        
        setUser(data.result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


    setLoadingUser(false);

  } , [address]);
  */


  // get sendbird user data
  const [loadingUser, setLoadingUser] = useState(false);
  const [sendbirdUser, setSendbirdUser] = useState(null) as any;
  useEffect(() => {
      const fetchData = async () => {
          setLoadingUser(true);
          const response = await fetch("/api/sendbird/getOneUser", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  walletAddress: address,
              }),
          });

          const data = await response.json();

          //console.log("sendbird user data", data);

          if (data.error) {
              setSendbirdUser(null);
          } else {
              setSendbirdUser(data.result.user);
          }

          setLoadingUser(false);
      };

      address && fetchData();
  }, [address]);








  const [isAdmin, setIsAdmin] = useState(false);

  const [p2pUser, setP2PUser] = useState<any>(null);
  const [loadingP2PUser, setLoadingP2PUser] = useState(false);

  const [buyOrderStatus, setBuyOrderStatus] = useState(''); // 'ordered', 'accepted', 'paymentRequested', 'paymentConfirmed'
  const [latestBuyOrder, setLatestBuyOrder] = useState<any>(null);

  useEffect(() => {

    if (!address) {

      ///setP2PUser(null);
      return;
    }

    setLoadingP2PUser(true);

    fetch('/api/singal/getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storecode: storecode,
            walletAddress: address,
        }),
    })
    .then(response => response.json())
    .then(data => {
        
        ///console.log('data.result', data.result);


        ///////setP2PUser(data.result);


        setNickname(data.result?.nickname || '');



        setIsAdmin(data.result?.role === "admin");

        setBuyOrderStatus(data.result?.buyOrderStatus || '');
        setLatestBuyOrder(data.result?.latestBuyOrder || null);

    })
    .catch((error) => {
        console.error('Error:', error);
    });


    setLoadingP2PUser(false);

  } , [address]);







    // userLogin
    const [userLogining, setUserLogin] = useState(false);


 

    const [sellOrders, setSellOrders] = useState<SellOrder[]>([]);

    useEffect(() => {

        const fetchSellOrders = async () => {


          // api call
          const response = await fetch('/api/order/getOneSellOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: orderId,
            })
          });
  
          const data = await response?.json();
  
          console.log('getOneSellOrder data', data);
  
          if (data.result) {

            if (data.result.orders.length > 0) {

              setSellOrders(data.result.orders);

              ///setAddress(data.result.orders[0].buyer.walletAddress);

              ////setNickname(data.result.orders[0].buyer.nickname);
            }


          }
  
        };
  
        fetchSellOrders();


        const interval = setInterval(() => {

          fetchSellOrders();
        }, 10000);
        
        return () => clearInterval(interval);
        
  
    }, [orderId]);

    //console.log('orderId', orderId);





    // array of escrowing
    const [escrowing, setEscrowing] = useState([] as boolean[]);

    useEffect(() => {
        
        setEscrowing(
          new Array(sellOrders.length).fill(false)
        );
  
    } , [sellOrders]);





    // array of requestingPayment
    const [requestingPayment, setRequestingPayment] = useState([] as boolean[]);

    useEffect(() => {

      setRequestingPayment(
        
        sellOrders.map((item) => {
          
          if (item.status === 'paymentRequested') {
            return true;
          }
          return false;
        } )

      );

    } , [sellOrders]);








    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);






    const [usdtAmount, setUsdtAmount] = useState(0);

    const [defaultKrWAmount, setDefaultKrwAmount] = useState(0);

    const [krwAmount, setKrwAmount] = useState(
      krwAmounts[0]
    );

    ///console.log('usdtAmount', usdtAmount);



    const [rate, setRate] = useState(1380);




    useEffect(() => {

      if (usdtAmount === 0) {

        setDefaultKrwAmount(0);

        setKrwAmount(0);

        return;
      }
    
        
      setDefaultKrwAmount( Math.round(usdtAmount * rate) );


      setKrwAmount( Math.round(usdtAmount * rate) );

    } , [usdtAmount, rate]);








    /* agreement for trade */
    const [agreementForTrade, setAgreementForTrade] = useState([] as boolean[]);
    useEffect(() => {
        setAgreementForTrade (
            sellOrders.map((item, idx) => {
                return false;
            })
        );
    } , [sellOrders]);

    const [acceptingSellOrder, setAcceptingSellOrder] = useState([] as boolean[]);

    useEffect(() => {
        setAcceptingSellOrder (
            sellOrders.map((item, idx) => {
                return false;
            })
        );
    } , [sellOrders]);


    // request payment check box
    const [requestPaymentCheck, setRequestPaymentCheck] = useState([] as boolean[]);
    useEffect(() => {
        
        setRequestPaymentCheck(
          new Array(sellOrders.length).fill(false)
        );
  
    } , [sellOrders]);





    const acceptSellOrder = (index: number, orderId: string) => {


    }





    const requstPayment = async (
      index: number,
      orderId: string,
      tradeId: string,
      amount: number,
    ) => {
      // check balance
      // send payment request

      if (balance < amount) {
        toast.error('Insufficient balance');
        return;
      }

      if (escrowing[index]) {
        toast.error('Escrowing');
        return;
      }


      if (requestingPayment[index]) {
        toast.error('Requesting payment');
        return;
      }



      setEscrowing(
        escrowing.map((item, idx) => {
          if (idx === index) {
            return true;
          }
          return item;
        })
      );

   


      // send USDT
      // Call the extension function to prepare the transaction
      const transaction = transfer({
        contract,
        to: recipientWalletAddress,
        amount: amount,
      });
      


      try {


        const transactionResult = await sendAndConfirmTransaction({
            transaction: transaction,
            
            account: activeAccount as any,
        });

        console.log("transactionResult===", transactionResult);


        setEscrowing(
          escrowing.map((item, idx) => {
            if (idx === index) {
              return false;
            }
            return item;
          })
        );



        // send payment request

        if (transactionResult) {

          /*
          setRequestingPayment(
            requestingPayment.map((item, idx) => {
              if (idx === index) {
                return true;
              }
              return item;
            })
          );
          */
          
          


        
          const response = await fetch('/api/order/requestPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              lang: params.lang,
              storecode: storecode,
              orderId: orderId,
              transactionHash: transactionResult.transactionHash,
            })
          });

          const data = await response?.json();

          console.log('/api/order/requestPayment data====', data);


          /*
          setRequestingPayment(
            requestingPayment.map((item, idx) => {
              if (idx === index) {
                return false;
              }
              return item;
            })
          );
          */
          


          if (data.result) {

            const response = await fetch('/api/order/getOneSellOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                orderId: orderId,
              })
            });
    
            const data = await response?.json();
    
            ///console.log('data', data);
    
            if (data.result) {
              setSellOrders(data.result.orders);
            }
            


            // refresh balance

            const result = await balanceOf({
              contract,
              address: address as string,
            });

            //console.log(result);

            setBalance( Number(result) / 10 ** 6 );


            toast.success('Payment request has been sent');
          } else {
            toast.error('Payment request has been failed');
          }

        }


      } catch (error) {
        console.error('Error:', error);

        toast.error('Payment request has been failed');

        setEscrowing(
          escrowing.map((item, idx) => {
            if (idx === index) {
              return false;
            }
            return item;
          })
        );


      }


      

    }










    const [privateSale, setprivateSale] = useState(false);


    const [sellOrdering, setSellOrdering] = useState(false);

    const sellOrder = async () => {
      // api call
      // set sell order

      if (sellOrdering) {
        return;
      }

      setSellOrdering(true);

      const response = await fetch('/api/order/setSellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: address,
          usdtAmount: usdtAmount,
          krwAmount: krwAmount,
          rate: rate,
          privateSale: privateSale,
        })
      });

      const data = await response?.json();

      //console.log('data', data);

      if (data.result) {
        toast.success('Sell order has been created');

        setUsdtAmount(0);
        setprivateSale(false);
     


        await fetch('/api/order/getOneSellOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            walletAddress: address
          })
        }).then(async (response) => {
          const data = await response?.json();
          //console.log('data', data);
          if (data.result) {
            setSellOrders(data.result.orders);
          }
        });




      } else {
        toast.error('Sell order has been failed');
      }

      setSellOrdering(false);

      

    };







  // array of confirmingPayment

  const [confirmingPayment, setConfirmingPayment] = useState([] as boolean[]);

  useEffect(() => {
      
      setConfirmingPayment(
        new Array(sellOrders.length).fill(false)
      );

  } , [sellOrders]);



  // confirm payment check box
  const [confirmPaymentCheck, setConfirmPaymentCheck] = useState([] as boolean[]);
  useEffect(() => {
      
      setConfirmPaymentCheck(
        new Array(sellOrders.length).fill(false)
      );

  } , [sellOrders]);



  const confirmPayment = async (

    index: number,
    orderId: string,

  ) => {
    // confirm payment
    // send usdt to buyer wallet address

    if (confirmingPayment[index]) {
      return;
    }

    setConfirmingPayment(
      confirmingPayment.map((item, idx) => {
        if (idx === index) {
          return true;
        }
        return item;
      })
    );




    const response = await fetch('/api/order/confirmPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lang: params.lang,
        storecode: storecode,
        orderId: orderId,
      })
    });

    const data = await response?.json();

    //console.log('data', data);

    if (data.result) {

      const response = await fetch('/api/order/getOneSellOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
        })
      });

      const data = await response?.json();

      ///console.log('data', data);

      if (data.result) {
        setSellOrders(data.result.orders);
      }

      toast.success('Payment has been confirmed');
    } else {
      toast.error('Payment has been failed');
    }

    setConfirmingPayment(
      confirmingPayment.map((item, idx) => {
        if (idx === index) {
          return false;
        }
        return item;
      })
    );



  }



  // api setUserWithoutWalletAddress


  const [acceptingSellOrderRandom, setAcceptingSellOrderRandom] = useState(false);

  const [escrowWalletAddress, setEscrowWalletAddress] = useState('');

  // escrowing state
  const [sendingEscrow, setSendingEscrow] = useState(false);


  console.log('acceptingSellOrderRandom', acceptingSellOrderRandom);


  const acceptSellOrderRandom = async (
    krwAmount: number,
    //depositName: string,
    //depositBankName: string,
    //depositBankAccountNumber: string,
  ) => {

    const depositName = paramDepositName || '구매자';
    const depositBankName = paramDepositBankName || '카카오뱅크';
    const depositBankAccountNumber = paramDepositBankAccountNumber || '123-456-7890';
    

    if (acceptingSellOrderRandom) {
      return;
    }


    if (!address) {
      toast.error('지갑 주소가 없습니다. 지갑을 연결해주세요.');
      return;
    }

    if (krwAmount > mkrwBalance) {
      toast.error('MKRW 잔액이 부족합니다. 충전해주세요.');
      return;
    }


    setAcceptingSellOrderRandom(true);




    // fectch sell order and accept one of them
    
    const responseGetAllSellOrders = await fetch('/api/order/getAllSellOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lang: params.lang,
        storecode: storecode,
      })
    });

    const dataGetAllSellOrders = await responseGetAllSellOrders.json();

    ///console.log('acceptSellOrderRandom dataGetAllSellOrders', dataGetAllSellOrders);

    //console.log('acceptSellOrderRandom krwAmount', krwAmount);


    if (dataGetAllSellOrders.result) {

      // find one of sell order which is krwAmount is selectedKrwAmount and status is ordered
      

      const order = dataGetAllSellOrders.result.orders.find((item: any) => {
        return item.krwAmount === krwAmount && item.status === 'ordered';
      });

      if (order) {


        // accept sell order

        const response = await fetch('/api/order/acceptSellOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lang: params.lang,
            storecode: storecode,
            
            orderId: order._id,

            buyerWalletAddress: address,
            buyerNickname: nickname,
            buyerAvatar: '',
            buyerMobile: '010-1234-5678',
            depositName: depositName,
            depositBankName: depositBankName,
            depositBankAccountNumber: depositBankAccountNumber,
          }),
        });

        const data = await response?.json();

        if (data.result) {
          toast.success("판매 주문이 수락되었습니다");

          //router.push('/' + params.lang + '/' + storecode + '/pay-usdt/' + order._id);

        } else {
          toast.error('판매 주문 수락에 실패했습니다');
        }



        //setSellOrders([order]);
      } else {




        
        ///toast.error('Sell order not found');

        // if sell order not found, create buy order

        const usdtAmount =  parseFloat((krwAmount / rate).toFixed(3));

        console.log('usdtAmount', usdtAmount);


        const response = await fetch('/api/singal/setBuyOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            lang: params.lang,
            storecode: storecode,
            walletAddress: address,
            nickname: nickname,
            usdtAmount: usdtAmount,
            krwAmount: krwAmount,
            rate: rate,
            privateSale: false,
            buyer: {
              depositBankName: depositBankName,
              depositBankAccountNumber: depositBankAccountNumber,
              depositName: depositName,
            },
            //paymentMethod: 'bank',
            //paymentMethod: 'usdt',
            paymentMethod: 'mkrw',
            
          })
        });

        const data = await response.json();

        //console.log('setBuyOrder data.result', data.result);
        if (!data.result) {
          toast.error('구매 주문 생성에 실패했습니다');
          setAcceptingSellOrderRandom(false);
          return;
        }



        if (data.result) {
          toast.success('구매 주문이 생성되었습니다');


          const order = data.result;

          setEscrowWalletAddress(order?.escrowWalletAddress || '');
          setSendingEscrow(true);

          const escrowWalletAddress = order?.escrowWalletAddress;

          console.log('escrowWalletAddress', escrowWalletAddress);

          ///alert('구매 주문이 생성되었습니다. 거래소 지갑 주소로 USDT를 보내주세요. 거래소 지갑 주소: ' + escrowWalletAddress);

          // transfer MKRW to escrow wallet address
          const transaction = transfer({
            contract: contractMKRW,
            to: escrowWalletAddress,
            amount: krwAmount,
          });

          const transactionResult = await sendTransaction({
            transaction: transaction,
            account: activeAccount as any,
          });

          console.log("transactionResult===", transactionResult);


          setSendingEscrow(false);


          router.push('/' + params.lang + '/' + params.chain + '/pay-usdt-reverse/' + order._id);


        } else {
          toast.error('구매 주문에 실패했습니다');
        }



      }



    } else {
      toast.error('Sell order not found');
    }

    setAcceptingSellOrderRandom(false);

  }



  const [storeCodeNumber, setStoreCodeNumber] = useState('');

  useEffect(() => {

    const fetchStoreCode = async () => {

      const response = await fetch('/api/order/getStoreCodeNumber', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      //console.log('data', data);

      setStoreCodeNumber(data?.storeCodeNumber);

    }

    fetchStoreCode();

  } , []);






    /*
  if (orderId === '0' && !storeUser) {
    return (
      <div>
        Store user not found
      </div>
    );
  }
    */


  /*
  if (orderId === '0' && storeCodeNumber && storecode !== storeCodeNumber) {
    return (
      <div>
        Store code is invalid
      </div>
    );
  }
    */
  
    /*
  if (orderId === '0' && !paramDepositName) {
    return (
      <div>
        Deposit name is invalid
      </div>
    );
  }
    */
   /*
  if (orderId === '0' && !paramDepositBankName) {
    return (
      <div>
        Deposit bank name is invalid
      </div>
    );
  }
    */



  
  const userLogin = async () => {
    if (!memberid) {
      toast.error('회원아이디를 입력해주세요');
      return;
    }
    if (!userPassword) {
      toast.error('비밀번호를 입력해주세요');
      return;
    }
    const mobile = '010-1234-5678';

    try {
      setUserLogin(true);
      const response = await fetch('/api/user/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storecode: storecode,
          nickname: nickname,
          mobile: mobile,
          password: userPassword,
        }),
      });
      const data = await response?.json();
      console.log('userLogin data', data);
      if (data.walletAddress) {

        //setAddress(data.walletAddress);

        toast.success('로그인 성공');
      } else {
        toast.error('로그인 실패');
      }
    } catch (error) {
      console.error('userLogin error', error);
      toast.error('로그인 실패');
    } finally {

      setUserLogin(false);
    }
  }




  // buyOrders
  const [buyOrders, setBuyOrders] = useState<any[]>([]);
  const [loadingBuyOrders, setLoadingBuyOrders] = useState(false);
  useEffect(() => {

    const fetchBuyOrders = async () => {

      console.log('fetchBuyOrders address', address);



      if (!address) {
        return;
      }

      setLoadingBuyOrders(true);
      const response = await fetch('/api/order/getAllBuyOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
          /*
            storecode,
            limit,
            page,
            walletAddress,
            searchMyOrders,
            searchOrderStatusCancelled,
            searchOrderStatusCompleted,
            */

          storecode: "admin",
          limit: 10,
          page: 1,
          walletAddress: address,
          searchMyOrders: true,


          searchOrderStatusCancelled: false,
          searchOrderStatusCompleted: true,



        }),
      });


      if (!response) {
        setLoadingBuyOrders(false);
        toast.error('구매 주문 정보를 가져오는 데 실패했습니다.');
        return;
      }
      const data = await response?.json();

      //console.log('data', data);

      if (data.result) {
        setBuyOrders(data.result.orders || []);
      }
      setLoadingBuyOrders(false);
    };

    fetchBuyOrders();


    const interval = setInterval(() => {
      fetchBuyOrders();
    }, 10000);
    return () => clearInterval(interval);


  }, [address]);


  //console.log('address', address);

  //console.log('buyOrders', buyOrders);




  const [settingP2PUser, setSettingP2PUser] = useState(false);

  const setP2PUserWithWalletAddress = async () => {
    if (!address) {
      toast.error('지갑 주소가 없습니다. 지갑을 연결해주세요.');
      return;
    }

    if (nickname) {
      toast.error('이미 회원가입이 되어 있습니다.');
      return;
    }

    setSettingP2PUser(true);

    const response = await fetch('/api/singal/setUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode: storecode,
        walletAddress: address,
        nickname: sendbirdUser?.nickname,
        mobile: '010-1234-5678',
      }),
    });

    const data = await response?.json();

    console.log('setP2PUserWithWalletAddress data', data);

    if (data.result) {
      toast.success('P2P 거래소 회원가입이 완료되었습니다.');
    } else {
      toast.error('P2P 거래소 회원가입에 실패했습니다.');
    }

    setSettingP2PUser(false);


    // refresh user
    fetch('/api/singal/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode: storecode,
        walletAddress: address,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('getUser data', data);
      setNickname(data.result?.nickname || '');
      setP2PUser(data.result);
      setIsAdmin(data.result?.role === "admin");
      setBuyOrderStatus(data.result?.buyOrderStatus || '');
      setLatestBuyOrder(data.result?.latestBuyOrder || null);
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('회원 정보를 가져오는 데 실패했습니다.');
    }
    );

  }






  if (orderId !== '0') {
      
      return (
        <div>
          Order not found
        </div>
      );

  }


  
  if (!loadingUser && (buyOrderStatus === 'ordered' || buyOrderStatus === 'accepted' || buyOrderStatus === 'paymentRequested')) {

      router.push('/' + params.lang + '/' + params.chain + '/pay-usdt-reverse/' + latestBuyOrder?._id);

      return (
        <div>
          Redirecting to payment page...
        </div>
      );

  }
      


    
  return (

    <main className="
      pl-2 pr-2
      pb-10 min-h-[100vh] flex flex-col items-center justify-start container
      max-w-screen-lg
      mx-auto
      bg-zinc-50
      text-zinc-500
      ">


      <div className="
        h-32

        w-full flex flex-col gap-2 justify-center items-center
        p-4
        bg-gradient-to-r from-blue-500 to-blue-600
        shadow-lg rounded-lg
        text-zinc-50
        ">

        {loadingStoreInfo ? (
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <Image
              src="/loading.png"
              alt="Loading"
              width={24}
              height={24}
              className='animate-spin'
            />
            <div className="text-sm text-zinc-50">
              가맹점 정보를 불러오는 중입니다.
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-row items-center justify-between gap-2">


            <button
              onClick={() => {
                router.push('/' + params.lang + '/' + params.chain);
              }}
              className="flex items-center justify-center gap-2
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold py-2 px-4 rounded-lg
                transition-colors duration-200
                shadow-lg hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                active:bg-blue-800 active:shadow-none
                "
            >
              <Image
                src="/icon-home.png"
                alt="Home"
                width={20}
                height={20}
                className="rounded-lg w-5 h-5"
              />
              <span className="text-sm text-[#f3f4f6]">
                <span className="hidden xl:inline">
                  홈으로
                </span>
                <span className="xl:hidden">
                  홈
                </span>
              </span>
            </button>

            <div className='flex flex-col items-start justify-start gap-1'>
              <div className='flex flex-row gap-2 items-center justify-start'>
                <Image
                  src={storeInfo?.storeLogo || '/logo.png'}
                  alt="Store Logo"
                  width={24}
                  height={24}
                  className='rounded-lg w-6 h-6 object-cover'
                />
                <span className="text-sm text-zinc-100 font-semibold">
                  {storeInfo?.storeName}
                </span>
              </div>

              {loadingUser ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <Image
                    src="/loading.png"
                    alt="Loading"
                    width={24}
                    height={24}
                    className='animate-spin'
                  />
                  <div className="text-sm text-zinc-50">
                    회원정보를 불러오는 중입니다.
                  </div>
                </div>
              ) : (

                <div className="flex flex-row items-center justify-center gap-2">
                  <Image
                    src={"/profile-default.png"}
                    alt="Avatar"
                    width={24}
                    height={24}
                    className="rounded-full w-6 h-6 object-cover"
                  />
                  <span className="text-sm text-zinc-50 font-semibold">
                    {nickname ? nickname : Anonymous}
                  </span>
                </div>
              )}
            </div>
 

            {address && (

              <div className="flex flex-col items-start justify-center gap-2">


                <div className='flex flex-row gap-2 items-center justify-center'>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(address);
                      toast.success("USDT통장번호가 복사되었습니다.");
                    }}
                    className="text-sm underline text-zinc-100 hover:text-zinc-200"
                  >
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </button>
                </div>

                {/* balance */}
                <div className="flex flex-col gap-2 items-center justify-center">

                  <div className="flex flex-row items-center justify-center gap-2">
                    <Image
                      src="/token-usdt-icon.png"
                      alt="USDT Icon"
                      width={20}
                      height={20}
                      className="inline-block mr-1"
                    />
                    <span className="text-sm text-zinc-100">
                      내 테더 잔액
                    </span>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-2">
                    <span className="text-xl font-semibold text-zinc-100">
                      {Number(balance).toFixed(2)}
                    </span>
                    {' '}
                    <span className="text-sm text-zinc-100">
                      USDT
                    </span>
                  </div>
                </div>

                
              </div>

            )}




          </div>
        )}


      </div>


      <div className="
        mt-5
        p-4  w-full
        flex flex-col gap-2 justify-start items-center
        bg-zinc-50
        ">

 
        {address && (
          <div className='w-full  flex-row items-between justify-start gap-5'>

            <div className="flex flex-row items-center justify-start">
              <Image
                src="/token-mkrw-icon.png"
                alt="MKRW Icon"
                width={20}
                height={20}
                className="inline-block mr-1"
              />
              <span className="text-sm font-semibold">
                내 포인트 잔액
              </span>
            </div>
            <div className=" flex flex-row items-start justify-start gap-2">
              <div className="text-2xl font-semibold text-zinc-500">
                {
                Number(mkrwBalance).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }{' '}MKRW
              </div>
            </div>

          </div>
        )}




        {!address && (

          <div className="
            flex flex-col justify-center items-center gap-2 p-2">

            <ConnectButton
              client={client}
              wallets={wallets}
              accountAbstraction={{
                chain: bsc,
                sponsorGas: true
              }}

              theme={"light"}

              // button color is dark skyblue convert (49, 103, 180) to hex
              connectButton={{
                style: {
                  backgroundColor: "#3167b4", // dark skyblue
                  // font color is gray-300
                  color: "#f3f4f6", // gray-300
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  // w-full
                  width: "100%",
                },
                label: "로그인 및 회원가입",
              }}

              connectModal={{
                size: "wide",
                //size: "compact",
                titleIcon: "https://wallet.cryptopay.beauty/logo.png",
                showThirdwebBranding: false,
              }}

              locale={"ko_KR"}
              //locale={"en_US"}
            />



            <div className="mt-20
              flex flex-row gap-2 justify-center items-center">
              <span className="text-sm md:text-lg text-zinc-500">
                이용방법이 궁금하신가요?
              </span>
              <Link
                href="#"
                className="text-sm md:text-lg text-blue-500 font-semibold hover:underline"
              >
                이용가이드
              </Link>
            </div>


          </div>

        )}




        {!loadingUser && !nickname && (
          <div className="w-full flex flex-col items-center justify-center gap-2 mt-10">
            <div className='flex flex-row items-center justify-center gap-2'>
              <Image
                src="/icon-info.png"
                alt="Info Icon"
                width={24}
                height={24}
                className="rounded-full w-8 h-8 object-cover"
              />
              <div className="text-lg font-semibold text-zinc-500">
                회원가입이 필요합니다.
              </div>
            </div>
            <div className="text-sm text-zinc-500">
              P2P 거래소 회원가입 후 이용해주세요.
            </div>


            <button
              disabled={settingP2PUser}
              onClick={() => {
                setP2PUserWithWalletAddress();
              }}
              className={`
                ${settingP2PUser ? 'bg-zinc-800' : 'bg-black'}
                text-sm text-zinc-100
                px-4 py-2 rounded-md border border-zinc-100
                hover:bg-[#f472b6] hover:text-zinc-50
                transition-colors duration-200
                w-full
                flex items-center justify-center gap-2
              `}
            >
              <div className="flex items-center justify-center">
                {settingP2PUser ? (
                  <span className="text-sm">
                    P2P 거래소 회원가입 중...
                  </span>
                ) : (
                  <span className="text-sm">
                    P2P 거래소 회원가입하기
                  </span>
                )}
              </div>

            </button>

          </div>
        )}



        {!loadingUser && nickname && (
          <div className="w-full flex flex-col items-start justify-between gap-2">


            {/* select one of krw amounts combo box */}
            {/* combo box */}

            {/* 10000, 50000, 100000, 300000, 500000, 1000000, 5000000, 10000000 */}

            {orderId === '0' && (

              <div className='w-full flex flex-col gap-2 items-center justify-start'>








              <div className='mt-5 w-full flex flex-col gap-2 items-center justify-center
                p-4
                bg-zinc-50
                rounded-2xl
                shadow-lg
                shadow-zinc-200
                border-2 border-zinc-200
                border-opacity-50
                '>

                  {/* selected krw amount */}
                
                <div className='w-full flex flex-col xl:flex-row gap-2 items-center justify-between'>

                  <div className='w-full flex flex-col gap-5 items-center justify-center'>
                    


                    {/* usdtAmount */}
                    {/* 구매량 */}
                    <div className="flex flex-row gap-2 items-center justify-center">

                        <span className="text-sm text-zinc-500">
                          구매량
                        </span>

                        <div className='flex flex-row gap-2 items-center justify-center'>
                          <Image
                            src="/token-usdt-icon.png"
                            alt="USDT Icon"
                            width={24}
                            height={24}
                            className="inline-block mr-1"
                          />
                          <span className="text-4xl font-semibold text-green-600"
                            style ={{fontFamily: 'monospace'}}
                          >
                            {
                              Number(selectedKrwAmount / rate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                          </span>
                          <span className="text-sm text-zinc-500">
                            USDT
                          </span>
                        </div>

                    </div>


                    {/* 시세 */}
 

                    <div className="flex flex-row gap-2 items-center justify-center">

                        <span className="text-sm text-zinc-500">
                          시세
                        </span>
                        <div className="text-2xl font-semibold text-zinc-500">
                          {
                            rate?.toLocaleString('ko-KR')
                          } 원
                        </div>

                        {/* new window for upbit site */}
                        <a
                          href="https://upbit.com/exchange?code=CRIX.UPBIT.KRW-USDT"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-row gap-2 items-center justify-center"
                        >
                          <div className='flex flex-row gap-2 items-center justify-center'>
                            <span className="text-sm text-zinc-500">
                              시세제공
                            </span>
                            <Image
                              src="/logo-upbit.jpg"
                              alt="upbit"
                              width={100}
                              height={100}
                              className="rounded-full w-12 h-12"
                            />
                          </div>
                        </a>


                    </div>


                 

                    <div className="flex flex-row gap-2 items-center justify-center">
                      <span className="text-sm text-zinc-500">
                        구매금액
                      </span>
                      <div className="text-2xl font-semibold text-zinc-500">
                        {
                          selectedKrwAmount?.toLocaleString('ko-KR')
                        } 원
                      </div>
                      {/* reset button */}
                      <button
                        onClick={() => setSelectedKrwAmount(0)}
                        className={`${loadingStoreInfo ? 'bg-zinc-800' : 'bg-black'
                        }
                          text-sm text-zinc-100
                          px-4 py-2 rounded-md border border-zinc-100
                          hover:bg-[#f472b6] hover:text-zinc-50
                          `}
                      >
                        초기화
                      </button>
                    </div>

                  </div>


                  <div className="mt-4 grid grid-cols-2 xl:grid-cols-3 gap-4 w-full text-sm text-zinc-200">



                      {/* when mouse over, background color is green */}

                      <button
                        onClick={() => setSelectedKrwAmount(
                          selectedKrwAmount + 1000
                        )}
                        className={`${loadingStoreInfo ? 'bg-zinc-800' : 'bg-black'
                        }
                          text-lg text-zinc-100
                          px-4 py-2 rounded-md border border-zinc-100
                          hover:bg-[#f472b6] hover:text-zinc-50
                          `}
                        disabled={loadingStoreInfo}
                      >
                        1,000원
                      </button>


                      <button
                        onClick={() => setSelectedKrwAmount(
                          selectedKrwAmount + 10000
                        )}
                        className={`${loadingStoreInfo ? 'bg-zinc-800' : 'bg-black'
                        }
                          text-lg text-zinc-100
                          px-4 py-2 rounded-md border border-zinc-100
                          hover:bg-[#f472b6] hover:text-zinc-50
                          `}
                      >
                        10,000원
                      </button>

                      <button
                        onClick={() => setSelectedKrwAmount(
                          selectedKrwAmount + 50000
                        )}
                        className={`${loadingStoreInfo ? 'bg-zinc-800' : 'bg-black'
                        }
                          text-lg text-zinc-100
                          px-4 py-2 rounded-md border border-zinc-100
                          hover:bg-[#f472b6] hover:text-zinc-50
                          `}
                      >
                        50,000원
                      </button>

                      <button
                        onClick={() => setSelectedKrwAmount(
                          selectedKrwAmount + 100000
                        )}
                        className={`${loadingStoreInfo ? 'bg-zinc-800' : 'bg-black'
                        }
                          text-lg text-zinc-100
                          px-4 py-2 rounded-md border border-zinc-100
                          hover:bg-[#f472b6] hover:text-zinc-50
                          `}
                      >
                        100,000원
                      </button>

                      <button
                        onClick={() => setSelectedKrwAmount(
                          selectedKrwAmount + 500000
                        )}
                        className={`${loadingStoreInfo ? 'bg-zinc-800' : 'bg-black'
                        }
                          text-lg text-zinc-100
                          px-4 py-2 rounded-md border border-zinc-100
                          hover:bg-[#f472b6] hover:text-zinc-50
                          `}
                      >
                        500,000원
                      </button>

                      <button
                        onClick={() => setSelectedKrwAmount(
                          selectedKrwAmount + 1000000
                        )}
                        className={`${loadingStoreInfo ? 'bg-zinc-800' : 'bg-black'
                        }
                          text-lg text-zinc-100
                          px-4 py-2 rounded-md border border-zinc-100
                          hover:bg-[#f472b6] hover:text-zinc-50
                          `}
                      >
                        1,000,000원
                      </button>


                  </div>

                </div>


                  <div className='mt-5 flex flex-col xl:flex-row gap-2 items-center justify-center'>

                    {/*
                    <div className="w-full flex flex-col gap-2 items-center justify-center">

                      <div className='flex flex-col xl:flex-row gap-2 items-center justify-center'>
                        <span className="w-24 text-sm text-zinc-500">
                          입금자은행명
                        </span>

                        <select
                          disabled={false}
                          value={depositBankName || ''}
                          onChange={(e) => setDepositBankName(e.target.value)}
                          className=" text-sm font-semibold bg-zinc-200 text-zinc-600 px-4 py-2 rounded-md border border-zinc-100"
                        >
                          <option value="">은행이름 선택</option>
                          <option value="카카오뱅크">카카오뱅크</option>
                          <option value="케이뱅크">케이뱅크</option>
                          <option value="토스뱅크">토스뱅크</option>
                          <option value="국민은행">국민은행</option>
                          <option value="우리은행">우리은행</option>
                          <option value="신한은행">신한은행</option>
                          <option value="농협">농협</option>
                          <option value="기업은행">기업은행</option>
                          <option value="하나은행">하나은행</option>
                          <option value="외환은행">외환은행</option>
                          <option value="부산은행">부산은행</option>
                          <option value="대구은행">대구은행</option>
                          <option value="전북은행">전북은행</option>
                          <option value="경북은행">경북은행</option>
                          <option value="광주은행">광주은행</option>
                          <option value="수협">수협</option>
                          <option value="씨티은행">씨티은행</option>
                          <option value="대신은행">대신은행</option>
                          <option value="동양종합금융">동양종합금융</option>
                        </select>

                      </div>

                      <div className='mt-2 flex flex-col xl:flex-row gap-2 items-center justify-center'>
                        <span className=" w-24 text-sm text-zinc-500">
                          입금자계좌번호
                        </span>
                        <input
                          //disabled={!address || !selectedKrwAmount || acceptingSellOrderRandom}
                          disabled={false}
                          type="text"
                          value={depositBankAccountNumber || ''}
                          onChange={(e) => setDepositBankAccountNumber(e.target.value)}
                          placeholder="입금자계좌번호"
                          className=" text-sm font-semibold bg-zinc-200 text-zinc-600 px-4 py-2 rounded-md border border-zinc-100"
                        />
                      </div>

                      <div className='mt-2 flex flex-col xl:flex-row gap-2 items-center justify-center'>
                        
                        <span className=" w-24 text-sm text-zinc-500">
                          입금자명
                        </span>

                        <input
                          //disabled={!address || !selectedKrwAmount || acceptingSellOrderRandom}
                          disabled={false}
                          type="text"
                          value={depositName || ''}
                          onChange={(e) => setDepositName(e.target.value)}
                          placeholder="입금자명"
                          className=" text-sm font-semibold bg-zinc-200 text-zinc-600 px-4 py-2 rounded-md border border-zinc-100"
                        />
                      </div>

                    </div>
                    */}



                    <button
                      //disabled={!address || !nickname || !selectedKrwAmount || acceptingSellOrderRandom}
                      
                      disabled={!address || acceptingSellOrderRandom || !selectedKrwAmount}
                      
                      className={`
                      ${!address || !nickname || !selectedKrwAmount || acceptingSellOrderRandom
                      ? 'bg-zinc-100' : 'bg-[#f472b6]'
                      }
                        mt-5 w-44 flex items-center justify-center gap-2
                        text-lg text-zinc-50 px-4 py-2 rounded-md border border-zinc-100
                        hover:bg-[#f472b6] hover:text-zinc-50
                        `}

                      onClick={() => {

                          // check address is empty
                          if (!address) {
                            toast.error('지갑주소가 없습니다');
                            return;
                          }

                          // check deposit name is empty
                          /*
                          if (!depositName) {
                            toast.error(Please_enter_deposit_name);
                            return;
                          }
                          if (!depositBankName) {
                            toast.error("입금자 은행명을 입력해주세요");
                            return;
                          }
                          if (!depositBankAccountNumber) {
                            toast.error("입금자 계좌번호를 입력해주세요");
                            return;
                          }
                          */

                          // if mkrwBalance is less than selectedKrwAmount / rate, show error
                          if (mkrwBalance < selectedKrwAmount / rate) {
                            toast.error('포인트 잔액이 부족합니다');
                            return;
                          }



                          confirm("구매주문을 하시겠습니까?") &&

                            acceptSellOrderRandom(
                              selectedKrwAmount,
                              //depositName,
                              //depositBankName || '',
                              //depositBankAccountNumber || ''
                            );

                          
                          
                      }}
                      
                    >
                      <div className="flex flex-row items-center justify-center gap-2">
                        {/* loaaing icon */}
                        {acceptingSellOrderRandom ? (
                          <Image
                            src="/loading.png"
                            alt="Loading"
                            width={24}
                            height={24}
                            className='animate-spin'
                          />
                        ) : (
                          <Image
                            src="/icon-buy.webp"
                            alt="Check"
                            width={24}
                            height={24}
                          />
                        )}
                      
                        <div className="flex flex-row items-center justify-center gap-2">
                          {acceptingSellOrderRandom ? (
                            <span className="text-sm text-zinc-500">
                              구매주문 중입니다.
                            </span>
                          ) : (
                            <span className="text-sm text-zinc-800
                              font-semibold hover:text-zinc-900 transition-colors duration-200
                              hover:cursor-pointer
                              hover:decoration-2
                              hover:decoration-blue-500
                              ">
                              
                              테더 구매주문하기
                            </span>
                          )}
                        </div>

                      </div>

                    </button>

                    {sendingEscrow && (
                      <div className='flex flex-col items-center justify-center gap-2 mt-2'>

                        {/* escrowWalletAddress */}
                        {escrowWalletAddress && (
                          <div className="flex flex-row items-center justify-center gap-2">
                            <Image
                              src="/icon-escrow-wallet.png"
                              alt="Escrow Wallet"
                              width={24}
                              height={24}
                            />
                            <span className="text-sm text-zinc-500">
                              에스크로 지갑 주소: {escrowWalletAddress.slice(0, 6)}...{escrowWalletAddress.slice(-4)}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-row items-center justify-center gap-2">
                          <Image
                            src="/loading.png"
                            alt="Loading"
                            width={24}
                            height={24}
                            className='animate-spin'
                          />
                          <span className="text-sm text-zinc-500">
                            에스크로 지갑으로{' '}
                            {
                              Number(selectedKrwAmount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }{' '}MKRW를 전송 중입니다.
                          </span>
                        </div>

                      </div>

                    )}



                    {/* 정보: 구매주문할때 000 MKRW가 에스크로 지갑으로 전송됩니다. */}
                    {/* 판매가 되지 않으면 000 MKRW가 다시 내 지갑으로 전송됩니다. */}
                    <div className='mt-2 w-full flex flex-row items-center justify-start gap-2'>
                      <Image
                        src="/icon-info.png"
                        alt="Info"
                        width={24}
                        height={24}
                      />
                      <div className='flex flex-col gap-1'>
                        <span className="text-sm text-zinc-500">
                          구매주문을 하면 {
                          Number(selectedKrwAmount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          } MKRW가 에스크로 지갑으로 전송됩니다.
                        </span>
                        <span className="text-sm text-zinc-500">
                          판매가 되지 않으면 다시 내 지갑으로 반환됩니다.
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* deposit name description */}
                  {/*
                  <div className='
                    mt-2 w-full flex flex-row items-center justify-start gap-2
                    '>
                    <Image
                      src="/icon-info.png"
                      alt="Info"
                      width={24}
                      height={24}
                    />
                    <span className="text-sm text-zinc-500">
                      입금 시 반드시 사전 등록한 은행과 이름, 계좌번호로 송금해야 합니다. 이와 다를 시에는 입금 처리가 안될 수 있습니다.
                    </span>
                  </div>
                  */}

                </div>

              </div>
            )}






          </div>
        )}



        {sellOrders.length > 0 && (
          <div className="mt-4 w-full flex flex-col gap-5 xl:flex-row items-start justify-center ">


            <div className="w-full mb-10 grid grid-cols-1 gap-4  justify-center  ">

                {sellOrders.map((item, index) => (

                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center"
                  >

                    {item.status === 'ordered' && (new Date().getTime() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24) && (
                      <div className="absolute inset-0 flex justify-center items-center z-10
                        bg-black bg-opacity-50
                      ">
                        <Image
                          src="/icon-expired.png"
                          alt="Expired"
                          width={100}
                          height={100}
                          className="opacity-20"
                        />
                      </div>
                    )}



                    {item.status === 'cancelled' && (
                      <div className="absolute inset-0 flex justify-center items-center z-10
                        bg-black bg-opacity-50
                      ">
                        <Image
                          src="/icon-cancelled.png"
                          alt="Cancelled"
                          width={100}
                          height={100}
                          className="opacity-20"
                        />
                      </div>
                    )}



                    <div className=" w-full flex flex-col gap-2 items-center justify-start">


                      {address && item.buyer && item?.buyer?.walletAddress === address && (
                        <div className="w-full flex flex-row items-center justify-start">
                          <div className='flex flex-row items-center gap-2'>

                            <Image
                                src={item.avatar || '/profile-default.png'}
                                alt="Avatar"
                                width={32}
                                height={32}
                                priority={true} // Added priority property
                                className="rounded-full"
                                style={{
                                    objectFit: 'cover',
                                    width: '32px',
                                    height: '32px',
                                }}
                            />      


                            <h2 className="text-lg font-semibold">
                                {Seller}: {

                                    item.walletAddress === address ? item.nickname ? item.nickname : Anonymous  + ' :' + Me :
                                    
                                    item.nickname ? item.nickname : Anonymous

                                }
                            </h2>

                            <Image
                                src="/verified.png"
                                alt="Verified"
                                width={24}
                                height={24}
                            />

                            <Image
                              src='/best-seller.png'
                              alt='Best Seller'
                              width={24}
                              height={24}
                            />

                          </div>

                        </div>
                      )}

                      {/* byer information */}
                      {address && item.walletAddress === address && (
                        <div className="w-full flex flex-row items-center justify-start">
                          <div className='flex flex-row items-center gap-2'>

                            <Image
                                src={item.buyer?.avatar || '/profile-default.png'}
                                alt="Avatar"
                                width={32}
                                height={32}
                                priority={true} // Added priority property
                                className="rounded-full"
                                style={{
                                    objectFit: 'cover',
                                    width: '32px',
                                    height: '32px',
                                }}
                            />

                            <h2 className="text-lg font-semibold">
                                {Buyer}: {
                                    item.buyer?.nickname ? item.buyer?.nickname : Anonymous
                                }
                            </h2>

                            <Image
                                src="/verified.png"
                                alt="Verified"
                                width={24}
                                height={24}

                            />

                            <Image
                              src='/icon-buyer.png'
                              alt='Best Buyer'
                              width={24}
                              height={24}

                            />

                          </div>
  
                        </div>


                      )}




                      <article
                          className={`w-full bg-black p-4 rounded-md border
                            
                            ${item.walletAddress === address ? 'border-green-500' : 'border-gray-200'}

                            ${item.status === 'paymentConfirmed' ? 'bg-gray-900 border-gray-900' : ''}

                            w-96 `
                          }
                      >

                          {item.status === 'ordered' && (
                            <div className=" flex flex-col items-start justify-start gap-1">


                              <div className="flex flex-row items-center gap-2">
                                {/* new order icon */}
                                {
                                  (new Date(item.createdAt).getTime() - new Date().getTime()) / 1000 / 60 / 60 < 24 && (
                                    <Image
                                      src="/icon-new.png"
                                      alt="New Order"
                                      width={32}
                                      height={32}
                                    />
                                  )
                                } 



                                {item.privateSale ? (
                                    <Image
                                      src="/icon-private-sale.png"
                                      alt="Private Sale"
                                      width={32}
                                      height={32}
                                    />
                                ) : (
                                    <Image
                                      src="/icon-public-sale.png"
                                      alt="Public Sale"
                                      width={32}
                                      height={32}
                                    />
                                )}

                                
                                {/* Expired in 24 hours */}
                                <p className=" text-sm text-zinc-400">
                                  Expired in {24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60)} {hours}
                                </p>

                              </div>

                              <p className="mb-4 text-sm text-zinc-400">
                                Opened at {
                                  new Date(item.createdAt).toLocaleDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString()
                                }
                              </p>

                            </div>
                          )}


                          { (item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'paymentConfirmed') && (

                            <div className='flex flex-row items-center gap-2 bg-white px-2 py-3 rounded-md mb-4'>

                              {item.status === 'accepted' || item.status === 'paymentRequested' && (
                                <Image
                                  src='/icon-trade.png'
                                  alt='Trade'
                                  width={32}
                                  height={32}
                                />
                              )}

                              <p className=" text-xl font-semibold text-green-600 ">
                                {TID}: {item.tradeId}
                              </p>



                              {item.status === 'paymentConfirmed' && (

                                <div className='flex flex-row items-end gap-2'>
                                  <Image
                                    src='/confirmed.png'
                                    alt='Confirmed'
                                    width={80}
                                    height={12}
                                  />
                                </div>

                              )}

                              
                            </div>

                          )}

                          {item.acceptedAt && (

                            <div className='flex flex-col items-start gap-2 mb-2'>



                              <div className='hidden  flex-row items-center gap-2'>
                            
                                {item.privateSale ? (
                                  <Image
                                    src='/icon-private-sale.png'
                                    alt='Private Sale'
                                    width={32}
                                    height={32}
                                  />
                                ) : (
                                  <Image
                                    src='/icon-public-sale.png'
                                    alt='Public Sale'
                                    width={32}
                                    height={32}
                                  /> 
                                )}
                                <p className="text-sm text-zinc-400">
                                  

                                  {params.lang === 'ko' ? (

                                    <p className="text-sm text-zinc-400">


                                      {

                                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) :
                                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }{' '}{Order_Opened} 

                                    </p>

                                    ) : (

                                      <p className="text-sm text-zinc-400">



                                      {Order_Opened}{' '}{

                                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) :
                                        new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }



                                    </p>


                                  )}


                                </p>

                              </div>


                              <div className='hidden flex-row items-center gap-2'>
                                <div className={
                                  ` ml-4 mr-3 bg-green-500 w-1 h-[20px]
                                  rounded-full`
                                }></div>

                                {/* difference minutes between payment confirmed and trade started */}
                                <div className='flex flex-row items-center gap-2'>

                                  <Image
                                    src='/timer.png'
                                    alt='Timer'
                                    width={32}
                                    height={32}
                                  />
                                  <div className="text-sm text-green-600">
                                    {
                                      ( (new Date(item.acceptedAt).getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 ).toFixed(0)
                                    } {minutes}
                                  </div>
                                </div>

                              </div>


                            


                              <div className='flex flex-row items-center gap-2'>

                                <Image
                                  src='/icon-trade.png'
                                  alt='Trade'
                                  width={32}
                                  height={32}
                                />

                                <p className="text-sm text-zinc-400">


                                {params.lang === 'ko' ? (

                                  <p className="ml-2 text-sm text-zinc-400">


                                    {new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )
                                    }{' '}{Trade_Started}

                                  </p>



                                ) : (

                                  <p className="ml-2 text-sm text-zinc-400">

                                    {Trade_Started} {
                                      new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                      ) :
                                      new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                      ) : (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                      )
                                    }

                                  </p>

                                )}
                                
                                
                                </p>
                              </div>

                            </div>

                          )}

                          {item.status === 'paymentConfirmed' && (

                            <div className='flex flex-col items-start gap-2 mb-4'>

                              {/* vertical line of height for time between trade started  and payment confirmed */}

                              <div className='flex flex-row items-center gap-2'>
                                <div className={
                                  ` ml-4 mr-3 bg-green-500 w-1 h-[20px]
                                  rounded-full`
                                }></div>

                                {/* difference minutes between payment confirmed and trade started */}
                                <div className='flex flex-row items-center gap-2'>

                                  <Image
                                    src='/timer.png'
                                    alt='Timer'
                                    width={32}
                                    height={32}
                                  />
                                  <div className="text-sm text-green-600">
                                    { ( (new Date(item.paymentConfirmedAt).getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 ).toFixed(0) } {minutes}
                                  </div>
                                </div>

                              </div>

                              <div className='flex flex-row items-center gap-2 mb-4'>
                                

                                <Image
                                  src='/icon-completed.png'
                                  alt='Completed'
                                  width={32}
                                  height={32}
                                />
                                <p className="text-sm text-green-600">
                                  {Completed_at} {new Date(item.paymentConfirmedAt).toLocaleDateString() + ' ' + new Date(item.paymentConfirmedAt).toLocaleTimeString()}
                                </p>
                              </div>

                            </div>



                          )}


                          <div className="mt-4 flex flex-col items-start">

                            <p className="text-2xl text-zinc-400">
                              {Price}: {
                                // currency
                              
                                Number(item.krwAmount)?.toLocaleString('ko-KR', {
                                  style: 'currency',
                                  currency: 'KRW',
                                })

                              }
                            </p>


                            <div className="mt-2 flex flex-row items-between space-x-2">


                              <p className="text-lg font-semibold text-zinc-500">{item.usdtAmount} USDT</p>
                              <p className="text-lg font-semibold text-zinc-500">{Rate}: {

                                Number(item.krwAmount / item.usdtAmount).toFixed(2)

                              }</p>
                            </div>

                          </div>


                        


                          {item.status === 'paymentConfirmed' && (
                            <div className="mt-4 flex flex-col items-start gap-2">
                              <p className="mt-4 text-sm text-zinc-400">
                                {Payment}: {item.seller?.bankInfo.bankName} {item.seller?.bankInfo.accountNumber} {item.seller?.bankInfo.accountHolder}
                              </p> 
                              <p className="text-sm text-zinc-400">
                                {Deposit_Amount}: {item.krwAmount} KRW
                              </p>
                              <p className="text-sm text-zinc-400">
                                {Deposit_Name}: {
                                  item.buyer?.depositName ? item.buyer?.depositName : item.tradeId
                                }
                              </p>                        

                              {/* 판매자가 입급을 확인였습니다. */}

                              <p className="mt-4 text-lg text-green-600">
                                {Deposit_Confirmed}
                              </p>
                            </div>
                          )}
                          

                      


                          {/* share button */}
                          {/*

                            <div className='flex flex-row items-center justify-end gap-2'>
                              <button
                                  className="flex text-sm bg-blue-500 text-zinc-500 px-2 py-1 rounded-md"
                                  onClick={() => {
                                    
                                    //router.push(`/sell-usdt/${item._id}`);

                                    // copy link to clipboard
                                    navigator.clipboard.writeText(`https://gold.goodtether.com/${params.lang}/sell-usdt/${item._id}`);
                                    toast.success('Link has been copied');

                                  }}
                              >
                                <Image
                                  src="/icon-share.png"
                                  alt="Share"
                                  width={16}
                                  height={16}
                                  className='mr-2'
                                />
                                Share
                              </button>
                            </div>
                            */}
                          



                          {/* waiting for escrow */}
                          {address && item.walletAddress !== address && item.status === 'accepted' && (
                              <div className="mt-10 mb-10 flex flex-row gap-2 items-center justify-start">

                                {/* rotate loading icon */}
                              
                                <Image
                                  src="/loading.png"
                                  alt="Escrow"
                                  width={32}
                                  height={32}
                                  className="animate-spin"
                                />

                                <span>
                                  {Waiting_for_seller_to_deposit}
                                  {' '}{item.usdtAmount} USDT
                                  {' '}{to_escrow}....
                                </span>




                              </div>

                          )}





                          {
                            address && item.walletAddress === address &&  item.status === 'accepted' && (

                            <div className="w-full mt-2 mb-2 flex flex-col items-start ">


                            {escrowing[index] && (

                              <div className="flex flex-col gap-2">
                                
                                <div className="flex flex-row items-center gap-2">
                                  <Image
                                      src='/loading.png'
                                      alt='loading'
                                      width={32}
                                      height={32}
                                      className="animate-spin"
                                  />
                                  <div className="text-lg font-semibold text-zinc-500">
                                    Escrowing {item.usdtAmount} USDT...
                                  </div>
                                </div>

                              </div>

                            )}


                            {escrowing[index] === false && requestingPayment[index] === true && (
                              <div className="flex flex-col gpa-2">
                                {Escrow} {item.usdtAmount} USDT to the smart contract has been completed.
                              </div>
                            )}


                            {requestingPayment[index] && (

                              <div className="p-2 flex flex-col gap-2">
                                
                                <div className="flex flex-row items-center gap-2">
                                  <Image
                                      src='/loading.png'
                                      alt='loading'
                                      width={50}
                                      height={50}
                                      className="animate-spin"
                                  />
                                  <div className="text-lg font-semibold text-zinc-500">
                                    {Requesting_Payment}...
                                  </div>
                                </div>

                              </div>

                            )}


                            <div className="mt-5 flex flex-row items-center gap-2">
                              {/* dot */}
                              <div  className="w-2 h-2 rounded-full bg-green-500"></div>

                              <div className="text-sm text-zinc-400">
                                {/*
                                If you request payment, the {item.usdtAmount} USDT will be escrowed to the smart contract and then the buyer ( {item?.buyer?.nickname} ) will be requested to pay.
                                */}

                                {If_you_request_payment}
                              </div>
                            </div>

                            <div className="mt-5 flex flex-row items-center gap-2">
                                
                                <div className="flex flex-row items-center gap-2">
                                  <input
                                      type="checkbox"
                                      checked={requestPaymentCheck[index]}
                                      onChange={(e) => {
                                        setRequestPaymentCheck(
                                          requestPaymentCheck.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            }
                                            return item;
                                          })
                                        );
                                      }}
                                      className=" w-6 h-6 rounded-md border border-gray-200"
                                  />
                                </div>
                                <div className="text-sm text-zinc-400">
                                  {/*
                                  I agree to escrow {item.usdtAmount} USDT to the smart contract and request payment to the buyer ( {item?.buyer?.nickname} )
                                  */}

                                    {I_agree_to_escrow_USDT}

                                </div>
                            </div>



                            <div className="mt-4 flex flex-col gap-2 text-sm text-left text-zinc-500">
                              <div className='flex flex-row items-center gap-2'>
                                {/* dot */}
                                <div  className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>
                                  {Bank_Transfer} {Deposit_Information}
                                </span>
                              </div>
                              <ul>
                                <li>
                                  {item.seller?.bankInfo.bankName}
                                  {' '}
                                  <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(item.seller?.bankInfo.accountNumber);
                                        toast.success(Account_number_has_been_copied);
                                    } }
                                    className='text-lg font-semibold'
                                  >
                                    {item.seller?.bankInfo.accountNumber}
                                  </button>
                                  {' '}
                                  {item.seller?.bankInfo.accountHolder}
                                </li>
                                <li>{Deposit_Amount} : {item.krwAmount} KRW</li>
                                <li>{Deposit_Name} : {
                                  item.buyer?.depositName ? item.buyer?.depositName : item.tradeId
                                }</li>
                              </ul>
                            </div>


                            <button
                                disabled={
                                  balance < item.usdtAmount || requestingPayment[index] || escrowing[index]
                                  || !requestPaymentCheck[index]
                                }
                                className={`w-full text-lg
                                  ${balance < item.usdtAmount ? 'bg-red-500' : 'bg-blue-500'}

                                  ${requestPaymentCheck[index] ? 'bg-green-500' : 'bg-gray-500'}
                                  
                                text-zinc-500 px-4 py-2 rounded-md mt-4`}

                                onClick={() => {
                                    //console.log('request Payment');
                                    
                                    ///router.push(`/chat?tradeId=12345`);

                                    requstPayment(
                                      index,
                                      item._id,
                                      item.tradeId,
                                      item.usdtAmount,
                                    );

                                }}
                              >



                              {balance < item.usdtAmount ? (

                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-row items-center gap-2">
                                    <GearSetupIcon />
                                    <div className="text-lg font-semibold">
                                    {Request_Payment}
                                    </div>
                                  </div>

                                  <div className="text-lg text-zinc-500">
                                    Insufficient Balance
                                  </div>
                                  <div className="text-lg text-zinc-500">
                                    You need {item.usdtAmount} USDT
                                  </div>
                                  <div className="text-lg text-zinc-500">
                                    You have {balance} USDT
                                  </div>
                                  <div className="text-lg text-zinc-500">
                                    Please top up your balance by depositing {item.usdtAmount - balance} USDT
                                  </div>
                                  <div className="text-lg text-zinc-500">
                                    Your wallet address is
                                  </div>
                                  <div className="text-xs text-zinc-500">
                                    {address.substring(0, 10)}...{address.substring(address.length - 10, address.length)}
                                    
                                  </div>
                                  <div className="text-xs text-zinc-500">
                                  
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(address);
                                            toast.success('USDT통장번호가 복사되었습니다.');
                                        }}
                                      className="text-xs bg-green-500 text-zinc-500 px-2 py-1 rounded-md">
                                      복사
                                    </button>
                                  </div>
                                </div>

                              ) : (

                                <div className="flex flex-col gap-2">

                                  <div className="flex flex-row items-center gap-2">
                                    

                                    {requestingPayment[index] || escrowing[index] ? (
                                      <Image
                                        src='/loading.png'
                                        alt='loading'
                                        width={32}
                                        height={32}
                                        className="animate-spin"
                                      />
                                    ) : (
                                      <GearSetupIcon />
                                    )}


                                    <div className="text-lg font-semibold">
                                    {Request_Payment}
                                    </div>
                                  </div>


                                </div>
                              )}


                            </button>

                            </div>


                          )}


                          


                          {item.status === 'ordered' && (
                            <>

                            {acceptingSellOrder[index] ? (

                              <div className="flex flex-row items-center gap-2">
                                <Image
                                  src='/loading.png'
                                  alt='loading'
                                  width={38}
                                  height={38}
                                  className="animate-spin"
                                />
                                <div>Accepting...</div>
                              </div>


                            ) : (
                              <>
                                
                                {item.walletAddress === address ? (
                                  <div className="flex flex-col space-y-4">
                                    {My_Order}
                                  </div>
                                ) : (
                                  <div className="w-full flex items-center justify-center">

                                    {item.status === 'ordered' && (
                                      
                                      // check if the order is expired
                                      new Date().getTime() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24

                                    ) ? (
                                      
                                      <Image
                                        src="/icon-expired.png"
                                        alt="Expired"
                                        width={80}
                                        height={80}
                                      />
                                    
                                    ) : (

                                      <div className='mt-4 flex flex-col items-center gap-2'>


                                        {/* agreement for trade */}
                                        <div className="flex flex-row items-center space-x-2">
                                          <input
                                            disabled={!address}
                                            type="checkbox"
                                            checked={agreementForTrade[index]}
                                            onChange={(e) => {
                                                setAgreementForTrade(
                                                    sellOrders.map((item, idx) => {
                                                        if (idx === index) {
                                                            return e.target.checked;
                                                        } else {
                                                            return false;
                                                        }
                                                    })
                                                );
                                            }}
                                          />
                                          <label className="text-sm text-zinc-400">
                                            {I_agree_to_the_terms_of_trade}
                                          </label>
                                        </div>



                                      
                                        <button
                                          disabled={!address || !agreementForTrade[index]}
                                          className={`text-lg text-zinc-500 px-4 py-2 rounded-md
                                          ${!agreementForTrade[index] ? 'bg-zinc-800' : 'bg-green-500 hover:bg-green-600'}
                                          `}

                                          onClick={() => {

                                              acceptSellOrder(index, item._id);
                                        

                                          }}
                                        >
                                          {Buy} {item.usdtAmount} USDT
                                        </button>



                                      </div>

                                    )}

                                  </div>



                                  )}

                                </>

                              )}

                            </>

                          )}



                          {/* bank transfer infomation */}
                          {item.status === 'paymentRequested' && (

                            <div className="mt-4 mb-10 flex flex-col items-start gap-2">


                              <div className='flex flex-row items-center gap-2'>
                                <Image
                                  src='/icon-bank.png'
                                  alt='Bank'
                                  width={32}
                                  height={32}
                                />
                                <div className="text-lg font-semibold text-green-600">
                                  {Bank_Transfer}
                                </div>
                                <span className="text-sm text-green-600">
                                  {When_the_deposit_is_completed}
                                </span>
                              </div>




                              {address && (item.walletAddress === address || item.buyer?.walletAddress === address ) && (
                                <>
                                  {/* bank transfer information 입금은행 */}
                                  <div className='mt-4 text-lg text-green-600 font-semibold'>
                                    입금은행
                                  </div>
                                  <div className='flex flex-row items-center justify-center gap-2'>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="text-sm ">
                                    {item.seller?.bankInfo.bankName}
                                    {' '}
                                    <button
                                      onClick={() => {
                                          navigator.clipboard.writeText(item.seller?.bankInfo.accountNumber);
                                          toast.success("계좌번호가 복사되었습니다.");
                                      } }
                                      className='text-lg font-semibold'
                                    >
                                      {item.seller?.bankInfo.accountNumber}
                                    </button>
                                    {' '}
                                    <button
                                      onClick={() => {
                                          navigator.clipboard.writeText(item.seller?.bankInfo.accountNumber);
                                          toast.success("계좌번호가 복사되었습니다.");
                                      } }
                                      className="text-xs bg-green-500 text-zinc-500 px-2 py-1 rounded-md"
                                    >
                                      복사
                                    </button>
                                    {' '}
                                    {item.seller?.bankInfo.accountHolder}
                                    </div>
                                  </div>


                                  <div className='flex flex-row items-center gap-2'>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="text-sm">
                                      {Deposit_Name}:{' '}
                                      <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.buyer?.depositName ? item.buyer?.depositName : item.tradeId);
                                            toast.success(Payment_name_has_been_copied);
                                        } }
                                        className="text-lg font-semibold"
                                      >
                                        {item.buyer?.depositName ? item.buyer?.depositName : item.tradeId}
                                      </button>
                                      {' '}
                                      <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.buyer?.depositName ? item.buyer?.depositName : item.tradeId);
                                            toast.success(Payment_name_has_been_copied);
                                        } }
                                        className="hidden text-xs bg-green-500 text-zinc-500 px-2 py-1 rounded-md"
                                      >
                                        복사
                                      </button>
                                    </div>
                                  </div>

                                  <div className='flex flex-row items-center gap-2'>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="text-sm">
                                      {Deposit_Amount}:{' '}

                                      <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.krwAmount.toString());
                                            toast.success(Payment_amount_has_been_copied);
                                        } }
                                        className="text-lg font-semibold"
                                      >
                                        {item.krwAmount?.toLocaleString('ko-KR', {
                                            style: 'currency',
                                            currency: 'KRW'
                                          })
                                        }
                                      </button>
                                      {' '}
                                      <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.krwAmount.toString());
                                            toast.success(Payment_amount_has_been_copied);
                                        } }
                                        className="hidden text-xs bg-green-500 text-zinc-500 px-2 py-1 rounded-md"
                                      >
                                        복사
                                      </button>
                                    </div>
                                  </div>

                                </>

                              )}




                              <div className='flex flex-row items-center gap-2'>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <div className="text-sm">
                                  {Deposit_Deadline}: {
                                  
                                    new Date(new Date(item.paymentRequestedAt).getTime() + 1000 * 60 * 60 * 1)?.toLocaleString()
                                  
                                  }
                                </div>
                              </div>


                              {/* waiting for receive USDT */}

                              {!address && (
                            
                                <div className="mt-4 flex flex-row gap-2 items-center justify-start">

                                  {/* rotate loading icon */}
                                
                                  <Image
                                    src="/loading.png"
                                    alt="Escrow"
                                    width={32}
                                    height={32}
                                    className="animate-spin"
                                  />

                                  <div>{Waiting_for_seller_to_confirm_payment}...</div>

                                </div>
                                
                              )}  

                            </div>
                          )}








                          {address && item.walletAddress === address && item.status === 'paymentRequested' && (

                          <div className="w-full mt-4 mb-2 flex flex-col items-start ">


                            
                            
                            <div className="w-full flex flex-col items-start gap-2">

                              {/*
                              <div className="flex flex-row items-center gap-2">

                                <Image
                                  src='/smart-contract.png'
                                  alt='smart-contract'
                                  width={32}
                                  height={32}
                                />

                                <span className="textlg text-zinc-500">
                                  Escrow: {item.usdtAmount} USDT
                                </span>

                                <button
                                    className="ml-5 text-sm bg-white text-zinc-500 px-2 py-1 rounded-md"
                                    onClick={() => {
                                        //console.log('Cancel Payment Request');
                                        // new window

                                        window.open(`https://arbiscan.io/token/0xc2132d05d31c914a87c6611c10748aeb04b58e8f?a=0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6`, '_blank');
                                    }}
                                >
                                  <Image
                                    src='/logo-arbitrum.png'
                                    alt='cancel'
                                    width={20}
                                    height={20}
                                  />
                                </button>


                              </div>
                              */}




                            
                              { 
                                item.status === 'paymentRequested'
                                && requestingPayment[index]
                                && confirmingPayment[index] === false
                                && (

                                <div className="flex flex-col gap-2">
                                  
                                  <div className="flex flex-row items-center gap-2">
                                    <Image
                                        src='/loading.png'
                                        alt='loading'
                                        width={32}
                                        height={32}
                                        className="animate-spin"
                                    />
                                    <div className="text-lg font-semibold text-zinc-500">
                                      
                                      {Checking_the_bank_transfer_from_the_buyer} ( {
                                        item?.buyer?.nickname ? item?.buyer?.nickname : Anonymous
                                      } )...


                                    </div>
                                  </div>

                                </div>

                              )}


                              {/*
                              <div className="mt-5 flex flex-row items-center gap-2">
                                <div  className="flex w-2 h-2 rounded-full bg-green-500"></div>

                                <div className="text-sm text-zinc-400">
                                  If you confirm the payment, the escrowed {item.usdtAmount} USDT will be transferred to the buyer ( {item?.buyer?.nickname} ) wallet address.
                                </div>
                              </div>
                              */}

                              {/* check box for confirming payment */}

                              <div className="flex flex-row items-center gap-2">

                                <div className="flex flex-row items-center gap-2">
                                  <input
                                      type="checkbox"
                                      checked={confirmPaymentCheck[index]}
                                      onChange={(e) => {
                                        setConfirmPaymentCheck(
                                          confirmPaymentCheck.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            }
                                            return item;
                                          })
                                        );
                                      }}
                                      className=" w-6 h-6 rounded-md border border-gray-200"
                                  />
                                </div>

                                <span className="text-sm text-zinc-400">
                                  {/*
                                  I agree to check the bank transfer of {
                                  item.krwAmount?.toLocaleString('ko-KR', {
                                    style: 'currency',
                                    currency: 'KRW',
                                  })} from buyer ( {item?.buyer?.nickname} ) and transfer {item.usdtAmount} USDT to the buyer wallet address.
                                  */}



                                  {I_agree_to_check_the_bank_transfer_of}


                                </span>

                              </div>




                            </div>
                              


                            {confirmingPayment[index] ? (

                              <div className="p-2 flex flex-row items-center gap-2">

                                <Image
                                    src='/loading.png'
                                    alt='loading'
                                    width={32}
                                    height={32}
                                    className="animate-spin"
                                />
                                <div className="text-lg font-semibold text-zinc-500">

                                  {/*
                                  Transfering {item.usdtAmount} USDT to the buyer ( {item?.buyer?.nickname} ) wallet address...
                                  */}
                                  {Transfering_USDT_to_the_buyer_wallet_address}...
                              
                                </div>
                              </div>

                            ) : (

                                <button
                                    disabled={
                                      confirmingPayment[index]
                                      || !confirmPaymentCheck[index]
                                  }
                                    className={`w-full text-lg
                                      ${confirmPaymentCheck[index] ? 'bg-green-500' : 'bg-gray-500'}
                                      text-zinc-500 px-4 py-2 rounded-md mt-4`}
                                    onClick={() => {
                                        console.log('Canfirm Payment');

                                        //toast.success('Payment has been confirmed');

                                        confirmPayment(index, item._id);
                                        
                                    }}
                                >
                                  {Confirm_Payment}
                                </button>
                              
                              )}


                          </div>


                          )}


                          {/* buyer mobile number */}
                          {/*address && item.buyer?.walletAddress === address && (
                            <div className="mt-4 flex flex-row items-center gap-2">
                              <div className="text-lg font-semibold text-green-600">
                                SMS: {item.buyer?.mobile}
                              </div>
                            </div>
                          )*/}


                      </article>


                    </div>







                  
                  </div>


                ))}

            </div>




          </div>
        )}



        {buyOrders.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center mt-10 mb-10
            bg-white shadow-lg rounded-lg p-4
            border border-gray-200
            ">
            <div className="text-lg text-zinc-500 font-semibold">
              최근 구매내역이 없습니다.
            </div>
          </div>
        )}

        <div className="w-full flex flex-col items-center justify-center mt-10 mb-10
          bg-white shadow-lg rounded-lg p-6
          border border-gray-200
          ">
          <div className='flex flex-row items-center justify-start w-full gap-2 mb-4'>
            <Image
              src="/token-usdt-icon.png"
              alt='USDT Icon'
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-lg text-zinc-500 font-semibold">
              최근 테더 구매내역
            </div>
            {loadingBuyOrders && (
              <Image
                src="/loading.png"
                alt="Loading"
                width={32}
                height={32}
                className="animate-spin"
              />
            )}
          </div>


          <div className="w-full flex flex-col items-start justify-start mt-4">
            
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-sm text-right">구매수량<br/>(USDT)</th>
                  <th className="px-4 py-2 text-sm text-right">결제금액<br/>(MKRW)</th>
                  <th className="px-4 py-2 text-sm text-center">날짜</th>
                </tr>
              </thead>
              <tbody>
                {buyOrders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-4 py-2">
                      <div className="
                        w-18 
                        2xl:w-32
                        flex items-center justify-end
                        text-lg text-green-600 font-semibold
                        "
                        style={{ fontFamily: 'monospace' }}
                        >
                        {order.usdtAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="
                        w-20
                        2xl:w-32
                        flex items-center justify-end
                        text-sm text-zinc-500 font-semibold
                        "
                        style={{ fontFamily: 'monospace' }}
                        >
                        {order.krwAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className='flex flex-col xl:flex-row items-start xl:items-center gap-1'>
                        <span className="text-sm text-zinc-500">
                          {new Date(order.createdAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {new Date(order.createdAt).toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>





          {/*
          📌 필독 안내사항
              1.	대행 신청 전 유의사항을 반드시 확인해 주세요.
            신청 전 안내된 내용을 충분히 숙지하지 않아 발생하는 모든 문제는 회원 본인의 책임이며, 당사는 이에 대해 책임지지 않습니다.
              2.	코인 전송 완료 후에는 취소 및 환불이 불가능합니다.
            대행 신청 완료 후 진행된 코인 거래는 어떤 경우에도 취소나 환불이 불가하오니 신중히 진행해 주세요.
              3.	최근 코인 거래 관련 사기가 빈번하게 발생하고 있습니다.
            구매 및 판매 시 반드시 신원과 거래 내용을 철저히 확인하신 후 진행해 주시기 바랍니다.
            ※ 대행 신청 후 사고 발생 시 당사는 도움을 드릴 수 없습니다.
              4.	불법 자금 거래 및 금융사기 방지를 위해 최선을 다하고 있습니다.
            의심스러운 거래로 판단될 경우, 회원 본인에게 신분증, 통장 사본, 거래 내역, 이체 확인증 등의 추가 인증을 요청드릴 수 있습니다.
              5.	잘못된 정보 입력 시 거래에 문제가 발생할 수 있습니다.
            모든 정보를 정확히 기입해 주시고, 신청 전 다시 한 번 확인 부탁드립니다.
              6.	영업시간: 연중무휴 24시간 운영
            언제든지 문의 및 이용이 가능합니다.
            */}


          <div className="w-full flex flex-col items-center justify-center mt-10 mb-10
            bg-white shadow-lg rounded-lg p-6
            border border-gray-200
            ">
            <p className="text-sm text-zinc-500 font-semibold">
            📌 필독 안내사항
            </p>
            <div className='flex flex-col items-start justify-start mt-2'>
              <ul className="list-disc list-inside text-sm text-zinc-500 font-semibold">
                <li>대행 신청 전 유의사항을 반드시 확인해 주세요. 신청 전 안내된 내용을 충분히 숙지하지 않아 발생하는 모든 문제는 회원 본인의 책임이며, 당사는 이에 대해 책임지지 않습니다.</li>
                <li>코인 전송 완료 후에는 취소 및 환불이 불가능합니다. 대행 신청 완료 후 진행된 코인 거래는 어떤 경우에도 취소나 환불이 불가하오니 신중히 진행해 주세요.</li>
                <li>최근 코인 거래 관련 사기가 빈번하게 발생하고 있습니다. 구매 및 판매 시 반드시 신원과 거래 내용을 철저히 확인하신 후 진행해 주시기 바랍니다. ※ 대행 신청 후 사고 발생 시 당사는 도움을 드릴 수 없습니다.</li>
                <li>불법 자금 거래 및 금융사기 방지를 위해 최선을 다하고 있습니다. 의심스러운 거래로 판단될 경우, 회원 본인에게 신분증, 통장 사본, 거래 내역, 이체 확인증 등의 추가 인증을 요청드릴 수 있습니다.</li>
                <li>잘못된 정보 입력 시 거래에 문제가 발생할 수 있습니다. 모든 정보를 정확히 기입해 주시고, 신청 전 다시 한 번 확인 부탁드립니다.</li>
                <li>영업시간: 연중무휴 24시간 운영 언제든지 문의 및 이용이 가능합니다.</li>
              </ul>
            </div>
          </div>


              
            



          
      </div>


      {/* footer */}
      {/* 이용약관 / 개인정보처리방침 / 고객센터 */}
      <div className="
        w-full
        flex flex-col items-center justify-center mt-10 mb-10
        bg-white shadow-lg rounded-lg p-6
        border border-gray-200
        ">
        <div className="flex flex-row items-center justify-center gap-2">
          <a
            href="#"
            className="text-sm text-zinc-500 hover:text-blue-500"
          >
            이용약관
          </a>
          <span className="text-sm text-zinc-500">|</span>
          <a
            href="#"
            className="text-sm text-zinc-500 hover:text-blue-500"
          >
            개인정보처리방침
          </a>
          <span className="text-sm text-zinc-500">|</span>
          <a
            href="#"
            className="text-sm text-zinc-500 hover:text-blue-500"
          >
            고객센터
          </a>
        </div>
        <div className="text-sm text-zinc-500 mt-2">
          © 2023 Iskan9. All rights reserved.
        </div>

      </div>






            

    </main>

  );


};





