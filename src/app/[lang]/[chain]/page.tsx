'use client';
import React, { useEffect, useState, Suspense, use } from "react";

import Image from "next/image";

import thirdwebIcon from "@public/thirdweb.svg";


import { client } from "../../client";

import {
    getContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import {
  //ThirdwebProvider,
  ConnectButton,

  useConnect,

  useReadContract,

  useActiveWallet,

  useActiveAccount,

  useSetActiveWallet,
  useConnectedWallets,

  darkTheme,

  lightTheme,

  useConnectModal,

  
  
} from "thirdweb/react";

import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

import {
  polygon,
  arbitrum,
  ethereum,
  bsc,
} from "thirdweb/chains";



import {
    allowance,
    approve,
    balanceOf
} from "thirdweb/extensions/erc20";


import {
    safeTransferFrom,
    claimTo,
    getOwnedNFTs,
} from "thirdweb/extensions/erc1155";


import {
  getUserPhoneNumber,
  getProfiles,
  getSocialIcon,
  getUserEmail,
} from "thirdweb/wallets/in-app";

import { toast } from 'react-hot-toast';

import {
  useRouter,
  useSearchParams
}from "next//navigation";
import { add } from "thirdweb/extensions/farcaster/keyGateway";


//import { getOwnedNFTs } from "thirdweb/extensions/erc721";


import GearSetupIcon from "@/components/gearSetupIcon";


//import LanguageSelector from "@/components/LanguageSelector";

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../dictionaries";
import { parse } from "path";
import { N } from "ethers";


import Link from "next/link";





/*
const wallets = [
  inAppWallet({
    auth: {
      options: [
        "phone",
        "email",


         
      ],
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
        //"phone",
        "facebook",
        "line",
        "apple",
        "coinbase",
      ],
    },
  }),
  /*
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
  //createWallet("com.binance.wallet"),
  createWallet("com.bitget.web3"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),
  */
];


const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon

const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum

const contractAddressEthereum = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT on Ethereum

const contractAddressBsc = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC


const contractAddressMKRW = "0xEb0a5ea0001Aa9f419BbaF8ceDad265A60f0B10f"; // MKRW on BSC


const erc1155ContractAddress = "0x796f8867E6D474C1d63e4D7ea5f52B48E4bA83D6";



/*
const client = createThirdwebClient({
  clientId: "dfb94ef692c2f754a60d35aeb8604f3d",
});
*/





function IndexPage(
    {
        params,
    }: {
        params: {
            lang: string;
            chain: string;
        };
    }
) {
  const { lang, chain } = params;

  const searchParams = useSearchParams();

  const center = searchParams.get('center');


 
  const wallet = searchParams.get('wallet');

  //const agent = searchParams.get('agent');

  //const agentNumber = searchParams.get('tokenId');

  //const center = searchParams.get('center');

  // start=' + nft.contract.address + '_' + nft.tokenId

  const start = searchParams.get('start') || "0x0276aE1b0768bBfe47d3Dd34493A225405aDB6AA_143";

  const agent = start?.split('_')[0];
  const agentNumber = start?.split('_')[1];




  const activeAccount = useActiveAccount();
  const address = activeAccount?.address || "";




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
    address: contractAddressMKRW,
  });




  /*
  const contractErc1155 = getContract({
    client,
    chain: params.chain === "bsc" ? bsc : params.chain === "arbitrum" ? arbitrum : params.chain === "polygon" ? polygon : params.chain === "ethereum" ? ethereum : polygon,
    address: erc1155ContractAddress,
  });
  */




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
    Open_Orders: "",
    Please_connect_your_wallet_first: "",

    Please_verify_your_account_first_for_selling: "",

    Apply_for_Listing_New_Token: "",
    Apply_for_Listing_New_Seller: "",

    Profile_Settings: "",

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
    Open_Orders,
    Please_connect_your_wallet_first,

    Please_verify_your_account_first_for_selling,

    Apply_for_Listing_New_Token,
    Apply_for_Listing_New_Seller,

    Profile_Settings,

  } = data;










  //const { connect, isConnecting, error } = useConnect();

  ///console.log(isConnecting, error);



  const router = useRouter();

  





  // get the active wallet
  const activeWallet = useActiveWallet();





  ////console.log('address', address);



  ///console.log('address', address);


  /*
  const [usdtBbalance, setBalance] = useState(0);

  
  useEffect(() => {

    if (!address) return;
    // get the balance


    if (!contract) {
      return;
    }

    const getBalance = async () => {

      try {
        const result = await balanceOf({
          contract,
          address: address,
        });
    
        //console.log(result);
    
        setBalance( Number(result) / 10 ** 6 );

      } catch (error) {
        console.error("Error getting balance", error);
      }

    };

    if (address) getBalance();

    // get the balance in the interval

    const interval = setInterval(() => {
      if (address) getBalance();
    }, 1000);


    return () => clearInterval(interval);

  } , [address, contract]);
   */
  





  const [loadingAnimation, setLoadingAnimation] = useState(false);
  // loadingAnimation duration is 2 seconds
  // and then 10 seconds later it will be toggled again

  useEffect(() => {

    if (loadingAnimation) {
      setTimeout(() => {
        setLoadingAnimation(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoadingAnimation(true);
      }, 10000);
    }


    


  } , [loadingAnimation]);


  /*
  const { data: balanceData } = useReadContract({
    contract, 
    method: "function balanceOf(address account) view returns (uint256)", 

    params: [ address ], // the address to get the balance of

  });

  console.log(balanceData);

  useEffect(() => {
    if (balanceData) {
      setBalance(
        Number(balanceData) / 10 ** 6
      );
    }
  }, [balanceData]);


  console.log(balance);
  */





  //console.log("address", address);

      
  /*
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {


    if (address) {

      //const phoneNumber = await getUserPhoneNumber({ client });
      //setPhoneNumber(phoneNumber);


      getUserPhoneNumber({ client }).then((phoneNumber) => {
        setPhoneNumber(phoneNumber || "");
      });



    }

  } , [address]);
  */

  const [userType, setUserType] = useState("");
  const [userTelegramId, setUserTelegramId] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");



  useEffect(() => {

    const fetchData = async () => {

      getProfiles({ client }).then((profiles) => {
        
        ///console.log("profiles======", profiles);

        if (profiles) {
          profiles.forEach((
            profile  // { type: "phone", details: { phone: "+8201098551647", id: "30e2276d8030b0bb9c27b4b7410d9de8960bab3d632f34d23d6e089182625506" } }
          ) => {
            if (profile.type === "phone") {
              setUserType("phone");
              setUserPhoneNumber(profile.details.phone || "");
            } else if (profile.type === "telegram") {
              setUserType("telegram");
              const details = profile.details as any;
              setUserAvatar(details.picture || "");
              setUserNickname(details.username || "");
              setUserTelegramId(details.id || "");
            }
          });
        }

      } );

    }


    client && fetchData();

  } , [address]);

 

  ////console.log(phoneNumber);

  console.log("userType========", userType);



  const usdtRate = 1360;

 

  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("/profile-default.png");
  const [userCode, setUserCode] = useState("");


  const [seller, setSeller] = useState(null) as any;


  const [loadingUserData, setLoadingUserData] = useState(false);

  useEffect(() => {

      if (!address) {
          return;
      }

      
      const fetchData = async () => {

          setLoadingUserData(true);

          const response = await fetch("/api/user/getUser", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  walletAddress: address,
              }),
          });

          const data = await response.json();

          ////console.log("getUser data.result", data.result);


          if (data.result) {
              setNickname(data.result.nickname);
              data.result.avatar && setAvatar(data.result.avatar);
              setUserCode(data.result.id);

              setSeller(data.result.seller);

          } else {
              setNickname("");
              setAvatar("/profile-default.png");
              setUserCode("");
              setSeller(null);
          }
          

          setLoadingUserData(false);
      };

      fetchData();

  }, [address]);



  







    // get sendbird user data
    const [loadingSendbirdUser, setLoadingSendbirdUser] = useState(false);
    const [sendbirdUser, setSendbirdUser] = useState(null) as any;
    useEffect(() => {
        const fetchData = async () => {
            setLoadingSendbirdUser(true);
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

            setLoadingSendbirdUser(false);
        };

        address && fetchData();
    }, [address]);









  // usdt balance
  const [usdtBalance, setUsdtBalance] = useState(0);
  useEffect(() => {
    
      const getUsdtBalance = async () => {


        if (address) {
          
          if (contract) {
  
            const balance = await balanceOf({
              contract: contract,
              address: address,
            });

            console.log("balance==========", balance);

            if (params.chain === "bsc") {
              setUsdtBalance(Number(balance) / 10 ** 18);
            } else {
              setUsdtBalance(Number(balance) / 10 ** 6);
            }
          }

        }

      }



      address && getUsdtBalance();

      // timer
      
      const interval = setInterval(() => {
        address && getUsdtBalance();
      }, 10000);

      return () => clearInterval(interval);
      
  } , [address, contract, params.chain]);




  // MKRW balance
  const [MKRWBalance, setMKRWBalance] = useState(0);
  useEffect(() => {
    
      const getMKRWBalance = async () => {

        const balance = await balanceOf({
          contract: contractMKRW,
          address: address,
        });

        setMKRWBalance(Number(balance) / 10 ** 18);

      };

      address && contractMKRW && getMKRWBalance();

      // timer
      
      const interval = setInterval(() => {
        address && contractMKRW && getMKRWBalance();
      }, 10000);

      return () => clearInterval(interval);

  } , [address, contractMKRW]);





  const [price, setPrice] = useState(0);



  const [ownedNfts, setOwnedNfts] = useState([] as any[]);
  const [loadingOwnedNfts, setLoadingOwnedNfts] = useState(false);

  useEffect(() => {

      /*
      const fetchOwnedNFTs = async () => {

          setLoadingOwnedNfts(true);

          const nfts = await getOwnedNFTs({
              contract: contractErc1155,
              start: 0,
              count: 10,
              address: address as string,
          });


          console.log("nfts", nfts);

          setOwnedNfts(nfts);
          setLoadingOwnedNfts(false);

      };

      if (address && contractErc1155) {
          fetchOwnedNFTs();
      }
      */

      // /api/snowball/getAgentNFTByWalletAddress
      
      const fetchOwnedNFTs = async () => {

          setLoadingOwnedNfts(true);

          const response = await fetch("/api/snowball/getAgentNFTByWalletAddress", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  walletAddress: address,
              }),
          });

          const data = await response.json();

          //console.log("data", data);

          if (data.result) {
              setOwnedNfts(data.result.ownedNfts);
          }

          setLoadingOwnedNfts(false);

      };

      if (address) {
          fetchOwnedNFTs();
      }



  }, [address]);




  const [totoalUsdtBalance, setTotalUsdtBalance] = useState(0);
  useEffect(() => {

    setTotalUsdtBalance(usdtBalance);

  }, [usdtBalance]);




  // api getAllBuyOrders
  const [buyOrders, setBuyOrders] = useState([] as any[]);
  const [loadingBuyOrders, setLoadingBuyOrders] = useState(false);
  const [storecode, setStorecode] = useState("admin");
  const [totalBuyOrders, setTotalBuyOrders] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchMyOrders, setSearchMyOrders] = useState(false);
  const [searchOrderStatusCancelled, setSearchOrderStatusCancelled] = useState(false);
  const [searchOrderStatusCompleted, setSearchOrderStatusCompleted] = useState(false);
  const [searchStoreName, setSearchStoreName] = useState("");
  const [privateSale, setPrivateSale] = useState(false);
  const [searchBuyer, setSearchBuyer] = useState("");
  const [searchDepositName, setSearchDepositName] = useState("");
  const [searchStoreBankAccountNumber, setSearchStoreBankAccountNumber] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  useEffect(() => {
    const fetchBuyOrders = async () => {

      setLoadingBuyOrders(true);

      const response = await fetch("/api/order/getAllBuyOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storecode: storecode,
          limit,
          page,
          walletAddress: address,
          searchMyOrders,
          searchOrderStatusCancelled,
          searchOrderStatusCompleted,
          searchStoreName,
          privateSale,
          searchBuyer,
          searchDepositName,
          searchStoreBankAccountNumber,
          fromDate,
          toDate,
        }),
      });

      const data = await response.json();

      //console.log("getAllBuyOrders data", data);

      if (data.result) {
        setBuyOrders(data.result.orders);
        setTotalBuyOrders(data.result.totalCount);
      } else {
        setBuyOrders([]);
        setTotalBuyOrders(0);
      }

      setLoadingBuyOrders(false);

    };

    fetchBuyOrders();

    // interval to refresh buy orders every 10 seconds
    const interval = setInterval(() => {
      fetchBuyOrders();
    }, 10000);

    return () => clearInterval(interval);

  }, [
    storecode,
    address,
    limit,
    page,
    searchMyOrders,
    searchOrderStatusCancelled,
    searchOrderStatusCompleted,
    searchStoreName,
    privateSale,
    searchBuyer,
    searchDepositName,
    searchStoreBankAccountNumber,
    fromDate,
    toDate,
  ]);






  return (


    <main className="
      pb-10
      p-0 min-h-[100vh] flex-col items-start justify-center container max-w-screen-lg mx-auto
      bg-[#E7EDF1]
    ">






      <div className="p-5 w-full">
        
        {/*
        <Header
          params={params}
          agent={agent || ""}
          tokenId={agentNumber || ""}
          center={center || ""}
        />
        */}

        {params.lang && (
          <div className="w-full flex flex-row gap-2 justify-end items-center">


            {/* right space */}
            {/* background transparent */}
            <select
              //className="p-2 text-sm bg-zinc-800 text-white rounded"


              className="p-2 text-sm bg-transparent text-zinc-800 rounded"
              value={params.lang}
              onChange={(e) => {
                const lang = e.target.value;
                router.push(
                  "/" + lang + "/" + params.chain
                );
              }}
            >
              <option value="en">
                English(US)
              </option>
              <option value="ko">
                한국어(KR)
              </option>
              <option value="zh">
                中文(ZH)
              </option>
              <option value="ja">
                日本語(JP)
              </option>
            </select>

            {/* icon-language */}
            {/* color is tone down */}
            <Image
              src="/icon-language.png"
              alt="Language"
              width={20}
              height={20}
              className="rounded-lg w-6 h-6
                opacity-50
                "
            />

          </div>
        )}



        <div className="w-full flex flex-row gap-2 justify-between items-center">
          
  
            {/*
            <div className=" flex flex-col xl:flex-row gap-2 justify-start items-start">
              
              <button
                onClick={() => {
                  router.push(
                    "/" + params.lang + "/polygon/tbot?agent=" + agent + "&tokenId=" + agentNumber + "&center=" + center
                  );
                }}
                className="p-2 bg-zinc-800 text-white rounded"
              >
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/icon-tbot.png"
                    alt="TBOT"
                    width={50}
                    height={50}
                    className="rounded-lg w-10 h-10"
                  />
                  <span>Go to TBOT</span>
                </div>
              </button>

            </div>
            */}




          

        </div>
        

        <div className="w-full flex flex-col justify-between items-center gap-2 mb-5">
          {/*
          <AppBarComponent />
          */}


          {/* select input for network selection (polygon, arbitrum) */}
          {/*
          <div className="flex flex-row gap-2 justify-center items-center">
            <button
              onClick={() => {
                // switch to polygon

                address && activeWallet?.disconnect();
                router.push(
                  "/" + params.lang + "/polygon"
                );
              }}
              className={`
                ${params.chain === "polygon" ? "bg-zinc-200 text-zinc-800" : "bg-zinc-800 text-zinc-300"} p-2 rounded`}
            >
              Polygon
            </button>
            <button
              onClick={() => {
                // switch to arbitrum
                address && activeWallet?.disconnect();
                router.push(
                  "/" + params.lang + "/arbitrum"
                );
              }}
              className={`
                ${params.chain === "arbitrum" ? "bg-zinc-200 text-zinc-800" : "bg-zinc-800 text-zinc-300"} p-2 rounded`}
            >
              Arbitrum
            </button>


          </div>
          */}

          {/* store code number */}
          {/*
          <div className="w-full flex flex-row gap-2 items-center justify-start text-zinc-300 text-lg font-se"
          >
            SC: {storeCodeNumber}
          </div>
          */}

        </div>

        {!address && (
          <div className="mt-5 w-full flex flex-col justify-center items-center gap-2 mb-5">
              


              {/* logo */}
              <div className="
                mt-16
                w-full flex flex-col justify-center items-center gap-2 mb-5">
                <Image
                  src="/logo.png"
                  alt="Wallet"
                  width={200}
                  height={200}
                  className="rounded-lg w-32 h-32 xl:w-40 xl:h-40"
                />
              </div>
          </div>
        )}


        {/* announcement */}
        {/*
        <div className="w-full flex flex-col bg-zinc-800 p-5 rounded-lg text-start gap-2 mb-5
                        hover:shadow-lg
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
        ">
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <h2 className="text-xl md:text-3xl font-semibold text-zinc-100 ">
              {title}
            </h2>
          </div>
          <p className="text-zinc-300">{description}</p>
        </div>
        */}




        {!address && (

          <div className="
            mt-16
            w-full flex flex-col justify-center items-center gap-2 p-2">
          
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

        {/*
        {address && (
          <div className="w-full flex items-center justify-end gap-5">


            <div className="flex flex-row gap-2">


              <button
                onClick={() => {
                  confirm("로그아웃 하시겠습니까?") && activeWallet?.disconnect();
                }}
                className="flex flex-row gap-2 items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                <Image
                  src="/icon-wallet.png"
                  alt="Wallet"
                  width={25}
                  height={25}
                  className="rounded"
                />
                <span className="text-sm">
                  로그아웃
                </span>
              </button>
            </div>

          </div>
        )}
        */}
            


        <div className="mt-5 w-full flex flex-col items-center xl:items-stretch justify-center gap-5 mb-10">
          



            {/* 회원아이디를 만들어주세요 */}
            {
            !loadingSendbirdUser
            && address && !sendbirdUser && (

                <div className="w-full flex flex-col justify-start items-start gap-2 p-2">
                    {/* 회원아이디를 만들어주세요 */}

                    <div className="flex flex-row justify-center items-center gap-2">
                    {/* dot */}
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <h2 className="text-sm md:text-lg font-semibold text-zinc-800">
                        회원아이디를 만들어주세요. 회원아이디가 없으면 서비스를 이용할 수 없습니다.
                    </h2>
                    </div>

                    <button
                    onClick={() => {

                        router.push(
                        "/" + params.lang + "/" + params.chain + "/my-page"
                        );

                    }}
                    className="w-full bg-[#3167b4] text-white px-4 py-2 rounded-lg hover:bg-[#3167b4]"
                    >
                    회원아이디 설정하기
                    </button>

                </div>


            )}





        {/* 총 자산 */}
        {/* ₩23,355*/}
        {address && (

          <div className="mt-5 w-full flex flex-col gap-0 items-center justify-between">

            {/* rounded top and not buttom */}
            {/* bg color is [#3167b4] */}
            <div className="w-full flex flex-row gap-2 items-center justify-between
                rounded-t-lg
                bg-[#3167b4]
                p-2
            ">
                <span className="text-sm md:text-lg text-white">
                  총 자산
                </span>

                <div className="flex flex-row gap-2 items-center justify-end">

                  {address && !loadingSendbirdUser &&
                    sendbirdUser && sendbirdUser.nickname && (
                    <span className="text-sm md:text-lg text-white">
                      {
                      sendbirdUser.nickname
                      }님, 반갑습니다.
                    </span>
                  )}

                  {address && !loadingSendbirdUser &&
                    !sendbirdUser && (
                    <button
                      onClick={() => {
                        router.push(
                          "/" + params.lang + "/" + params.chain + "/my-page"
                        );
                      }}
                      className="text-sm md:text-lg text-white"
                    >
                      {Profile_Settings}
                    </button>
                  )}


                </div>
            </div>





            <div className="w-full flex flex-col gap-2 items-center justify-start
                bg-white p-5 rounded-b-lg
            ">
                
                <span className="text-2xl md:text-3xl font-semibold text-zinc-800">
                    {
                      Number(totoalUsdtBalance * usdtRate + MKRWBalance)
                        .toFixed(0)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }{' '}원
                    
                </span>


            </div>

          </div>


        )}


        {/* 나의 코인 자산 */}
        {address && (
          <div className="mt-5 w-full flex flex-col gap-0 items-center justify-between">

            <div className="w-full flex flex-row gap-2 items-center justify-start
                rounded-t-lg
                bg-[#3167b4]
                p-2
            ">
                <span className="text-sm md:text-lg text-white">
                  나의 코인 자산
                </span>
            </div>
            
            <div className="w-full flex flex-col gap-2 items-center justify-start
                bg-white p-2
                rounded-b-lg
            ">



              {/* M point balance */}
              <div className="w-full flex flex-row gap-2 justify-between items-center p-2
                border-b border-gray-200
                ">
 
                <Image
                  src="/logo-mpoint.png"
                  alt="MKRW"
                  width={35}
                  height={35}
                  className="rounded-full w-8 h-8 xl:w-10 xl:h-10"
                />
                <span className="w-32 text-sm md:text-xl font-bold text-gray-600">
                  포인트
                </span>

                <div className="w-full text-2xl font-bold text-zinc-800 text-right">
                  {
                    Number(MKRWBalance)
                      .toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                </div>
                <div className="w-32 text-sm text-gray-800 font-bold text-right">
                  MKRW
                </div>
                <button
                  onClick={() => {
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/sell-mkrw"
                    );
                  }}
                  className="w-10 h-10"
                >
                  <Image
                    src="/goto-icon.webp"
                    alt="Send"
                    width={20}
                    height={20}
                  />
                </button>
              </div>


              {/* usdt balance */}
              <div className="w-full flex flex-row gap-2 justify-between items-center p-2
                ">
                <Image
                  src="/logo-tether.svg"
                  alt="USDT"
                  width={35}
                  height={35}
                  className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"
                />
                <span className="w-32 text-sm md:text-xl font-bold text-gray-600">
                  테더
                </span>


                  {/* floating point number to fixed 5 and text size small */}
                <div className="w-full text-2xl font-bold text-zinc-800 text-right">
                  {
                    Number(usdtBalance)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                </div>
                <div className="w-32 text-sm text-gray-800 font-bold text-right">
                  USDT
                </div>

                <button
                  onClick={() => {
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/send-token/?token=USDT"
                    );
                  }}
                  className="w-10 h-10"
                >
                  <Image
                    src="/goto-icon.webp"
                    alt="Send"
                    width={20}
                    height={20}
                  />
                </button>
              </div>




            </div>
          </div>
        )}










        {address && (


          <div className="mt-5 w-full flex flex-col gap-0 items-center justify-between">

              <div className="w-full flex flex-row gap-2 items-center justify-start
                  rounded-t-lg
                  bg-[#3167b4]
                  p-2
              ">
                  <div className="text-sm md:text-lg text-white">
                      포인트 구매
                  </div>
              </div>


 
                  <div className="w-full flex flex-col gap-5 items-center justify-between
                      rounded-b-lg
                      bg-white p-0
                  ">

                      {/* 1 USDT = 1340 MKRW */}
                      <div className="w-full flex flex-row gap-2 items-center justify-between p-5
                      ">
                        <div className="w-1/4 flex flex-row gap-2 items-center justify-start">
                            <Image
                                src="/logo-mpoint.png"
                                alt="MKRW"
                                width={50}
                                height={50}
                                className="rounded-lg w-10 h-10 xl:w-12 xl:h-12"
                            />
                        </div>

                        <div className="w-3/4 flex flex-col gap-1 items-center justify-center">

                          <div className="w-full flex flex-row gap-2 items-center justify-start">
                            <div className="w-32 text-sm text-zinc-800">
                              현재 환율
                            </div>
                            <div className="w-full text-sm text-zinc-800 font-bold text-right">
                              1 USDT = { usdtRate } MKRW
                            </div>
                          </div>

                          <div className="w-full flex flex-row gap-2 items-center justify-start">
                            <div className="w-32 text-sm text-zinc-800">
                              최소 구매량
                            </div>
                            <div className="w-full text-sm text-zinc-800 font-bold text-right">
                              10000 MKRW
                            </div>
                          </div>

                        </div>

                      </div>

                      <div className="w-full flex flex-row gap-2 items-center justify-between p-5
                      ">
                        <button
                            onClick={() => {
                                // redirect to nft detail page
                                
                                router.push(
                                    "/" + params.lang + "/" + params.chain + "/buy-mpoint"
                                );
                                
                              {/* 준비중입니다. */}
                                //alert("준비중입니다.");
                            }}
                            className="w-full
                              rounded-b-lg
                              bg-gray-100
                              p-2
                              text-sm md:text-lg font-semibold text-zinc-800
                              hover:bg-gray-200
                              "
                        >
                          테더로 구매하기
                        </button>


                        <button
                            onClick={() => {
                                // redirect to nft detail page
                                
                                router.push(
                                    "/" + params.lang + "/" + params.chain + "/buy-mpoint-winpay"
                                );
                                
                              {/* 준비중입니다. */}
                                //alert("준비중입니다.");
                            }}
                            className="w-full
                              rounded-b-lg
                              bg-gray-100
                              p-2
                              text-sm md:text-lg font-semibold text-zinc-800
                              hover:bg-gray-200
                              "
                        >
                          페이로 구매하기
                        </button>

                      </div>



                  </div>

          </div>


        )}


        {/* 테더 구매 */}
        {/* route paymater */}
        {address && (
          <div className="mt-5 w-full flex flex-col gap-0 items-center justify-between">
              <div className="w-full flex flex-row gap-2 items-center justify-start
                  rounded-t-lg
                  bg-[#3167b4]
                  p-2
              ">
                  <div className="text-sm md:text-lg text-white">
                      테더 P2P 거래
                  </div>
              </div>

              <div className="w-full flex flex-col gap-5 items-center justify-between
                  rounded-b-lg
                  bg-white p-0
              ">
                  <div className="w-full flex flex-row gap-2 items-center justify-between p-5
                  ">
                    <div className="w-1/4 flex flex-row gap-2 items-center justify-start">
                        <Image
                            src="/logo-tether.svg"
                            alt="USDT"
                            width={50}
                            height={50}
                            className="rounded-lg w-10 h-10 xl:w-12 xl:h-12"
                        />
                    </div>

                    <div className="w-3/4 flex flex-col gap-1 items-center justify-center">

                      <div className="w-full flex flex-row gap-2 items-center justify-start">
                        <div className="w-32 text-sm text-zinc-800">
                          현재 환율
                        </div>
                        <div className="w-full text-sm text-zinc-800 font-bold text-right">
                          1 USDT = { usdtRate } 포인트(MKRW)
                        </div>
                      </div>

                      <div className="w-full flex flex-row gap-2 items-center justify-start">
                        <div className="w-32 text-sm text-zinc-800">
                          최소 구매량
                        </div>
                        <div className="w-full text-sm text-zinc-800 font-bold text-right">
                          1 USDT
                        </div>
                      </div>

                    </div>

                  </div>
                  
                  <div className="w-full flex flex-col gap-2 items-center justify-start p-5
                    bg-gray-50  rounded-b-lg
                  ">
                    {/* 구매 신청하기 버튼 */}
                    {/* 테더를 구매하기 위해서는 구매 신청을 해야 합니다. */}
                    {/* 구매 신청을 하면 판매자와 연결됩니다. */}
                    <div className="w-full flex flex-row gap-2 items-center justify-start text-sm md:text-lg text-zinc-800 font-semibold mb-2">
                      <Image
                        src="/icon-info.png"
                        alt="Info"
                        width={35}
                        height={35}
                        className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"
                      />
                      <span className="text-sm md:text-lg text-zinc-800 font-semibold">
                        테더를 구매하기 위해서는 구매 신청을 해야 합니다. 구매 신청을 하면 판매자와 연결됩니다.
                      </span>
                    </div>
                    <button
                        onClick={() => {
                            // redirect to nft detail page
                            router.push(
                                "/" + params.lang + "/" + params.chain + "/paymaster"
                            );
                        }}
                        className="w-full
                          rounded-b-lg
                          bg-gray-100
                          p-2
                          text-sm md:text-lg font-semibold text-zinc-800
                          hover:bg-gray-200
                          "
                    >
                      구매 신청하기
                    </button>
                  </div>


                  {/* 구매주문 목록 */}
                  <div className="w-full flex flex-col gap-2 items-center justify-start p-5">

                    {/* 테더를 판매하기 위해서는 구매주문 목록에서 판매를 해야 합니다. */}
                    <div className="w-full flex flex-row gap-2 items-center justify-start text-sm md:text-lg text-zinc-800 font-semibold mb-2">
                      <Image
                        src="/icon-info.png"
                        alt="Info"
                        width={35}
                        height={35}
                        className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"
                      />
                      <span className="text-sm md:text-lg text-zinc-800 font-semibold">
                        테더를 판매하기 위해서는 구매주문 목록에서 판매를 해야 합니다.
                      </span>
                    </div>

                    <div className="w-full flex flex-row gap-2 items-center justify-between
                      border-b border-black-200 pb-2 mb-2
                      text-zinc-800 font-semibold
                      text-lg md:text-xl
                    ">
                      <Image
                        src="/icon-buyorder.png"
                        alt="Buy Order"
                        width={35}
                        height={35}
                        className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"
                      />
                      <span className="text-sm md:text-lg text-zinc-800 font-semibold">
                        구매주문 목록
                      </span>
                      <span className="text-sm md:text-lg text-zinc-500">
                        총 {totalBuyOrders}건
                      </span>
                    </div>

                    {/* 주문 목록 테이블 */}
                    <div className="w-full flex flex-col gap-2 items-start justify-start">

                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-800">구매자</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-800">
                              <div className="flex flex-col items-start">
                                <span className="text-sm text-zinc-500">금액(MKRW)</span>
                                <span className="text-sm text-zinc-500">수량(USDT)</span>
                                <span className="text-xs text-zinc-500">환율</span>
                              </div>
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-zinc-800">판매</th>
                          </tr>
                        </thead>
                        <tbody>
                          {buyOrders.map((order) => (

                            // if order.status is cancelled, skip this order
                            order.status !== "cancelled" && (

                              <tr key={order._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">
                                  <div className="flex flex-col items-start">
                                  {/* time ago */}
                                    <span className="text-xs text-zinc-500">
                                      {
                                        new Date(order.createdAt).toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })
                                      }
                                    </span>

                                    <span className="text-sm font-semibold text-zinc-800">
                                      {order.nickname}
                                    </span>
  
                                  </div>
                                </td>
                                <td className="px-4 py-2">
                                  <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-zinc-800">
                                      {
                                        Number(order.krwAmount).toFixed(0)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                      }
                                    </span>
                                    <span className="text-lg text-zinc-600 font-bold">
                                      {
                                        Number(order.usdtAmount).toFixed(2)
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                      }
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                      {order.rate}
                                    </span>
                                  </div>
                                </td>

                                <td className="px-4 py-2">

                                  {order.walletAddress === address ? (
                                    <span className="text-sm text-zinc-500 font-semibold">
                                      나의 주문
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        //
                                      }}
                                      className="
                                      border border-blue-500 text-blue-500 px-4 py-2 rounded-lg
                                      hover:bg-blue-500 hover:text-white
                                      transition duration-300 ease-in-out
                                      "
                                    >
                                      판매하기
                                    </button>
                                  )}


                                </td>
                              </tr>

                            )

                          ))}
                        </tbody>
 
                      </table>
                    </div>
                    
                    {/* 로딩 중일 때 */}
                    {loadingBuyOrders && (
                      <div className="mt-4 flex flex-row justify-center items-center">
                        <Image
                          src="/loading.png"
                          alt="Loading"
                          width={35}
                          height={35}
                          className="animate-spin"
                        />
                      </div>
                    )}
                  </div>

              </div>
          </div>
        )}















        {address && loadingUserData && (                          
          <div className="mt-4 flex flex-row justify-center items-center">

            <Image
              src="/loading.png"
              alt="Loading"
              width={35}
              height={35}
              className="animate-spin hidden"
            />
          </div>
        )}



        </div>

        {/*}
        <div className="grid gap-4 lg:grid-cols-3 justify-center">

          <ArticleCard
            title={`${Buy_USDT} - ${Open_Orders} (${countOfOpenOrders}) EA`}
            
            href={`${params.lang}/buy-usdt`}

            description={Buy_Description}
          />

          
            
          <ArticleCard
            title={`${Sell_USDT} - ${Open_Orders} (${countOfOpenOrders}) EA`}
            href={`${params.lang}/sell-usdt`}
            description={Sell_Description}
          />
            


        </div>
        */}


        {/* Best Sellers */}
        {/*
        <div className="bg-zinc-800 p-5 rounded-lg text-center mt-10">
          <h2 className="text-3xl font-semibold text-zinc-100">
            Best Sellers
          </h2>
          <p className="text-zinc-300">Check out the best sellers</p>

          <div className="grid gap-4 lg:grid-cols-3 justify-center mt-4">


            {bestSellers.map((seller: any) => (
              <ArticleCard
                key={seller.id}
                title={seller.nickname}
                avatar={seller.avatar}
                href={`/buy-usdt`}
                description="Check out the best sellers"
              />
            ))}
 

          </div>
        </div>
        */}

      </div>



      {/* footer fixed */}



      {/* 이용방법인 궁금하신가요? 이용가이드 */}
      {/* 계속하면 이용약관에 동의하는것입니다. 이용약관 */}
      {/* 개인정보 처리방침을 확인하세요. 개인정보 처리방침 */}
      {!address && (

        <div className="w-full fixed bottom-0 left-0 right-0 items-center justify-center pb-5">


          <div className="flex flex-col items-center justify-center gap-2">



            <div className="
              flex flex-row gap-2 justify-center items-center">
              <span className="text-sm md:text-lg text-zinc-500">
                계속하면 이용약관에 동의하는것입니다.
              </span>
              <Link
                href="#"
                className="text-sm md:text-lg text-blue-500 font-semibold hover:underline"
              >
                이용약관
              </Link>
            </div>

            <div className="
              flex flex-row gap-2 justify-center items-center">
              <span className="text-sm md:text-lg text-zinc-500">
                개인정보 처리방침을 확인하세요.
              </span>
              <Link
                href="#"
                className="text-sm md:text-lg text-blue-500 font-semibold hover:underline"
              >
                개인정보 처리방침
              </Link>
            </div>



          </div>

        </div>

      )}

      {/* footer menu */}
      {/* 홈 / NFT 상점 / 회원목록 / 마이페이지 */}
      {/* same width footer menu */}

      {address && (

        <div className="w-full fixed bottom-0 left-0 right-0 items-center justify-center">


          <div className="w-full grid grid-cols-3 gap-0 justify-center items-center p-0
            bg-zinc-100 rounded-lg text-center
          ">

            {/* logo */}

            {/* home */}
            {/* selected state */}
            
            <button
              /*
              onClick={() => {
                router.push(
                  "/" + params.lang + "/" + params.chain + "/"
                );
              }}
              */

              className="flex flex-col justify-center items-center gap-0
                bg-blue-200 text-blue-800
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
                p-2
              "
            >
              <Image
                src="/icon-home.png"
                alt="Home"
                width={35}
                height={35}
                className="rounded-lg w-5 h-5 xl:w-10 xl:h-10"
              />
              <p className="text-xs md:text-lg text-gray-600 font-bold">
                홈
              </p>
            </button>

            {/* NFT 상점 */}
            {/*
            <button
              onClick={() => {
                router.push(
                  "/" + params.lang + "/" + params.chain + "/my-nft-snowball"
                  + "?start=" + start
                );
              }}
              className="flex flex-col justify-center items-center gap-0
                hover:bg-blue-200 hover:text-blue-800
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
                p-2
              "
            >
              <Image
                src="/icon-shopping-cart.png"
                alt="NFT Market"
                width={35}
                height={35}
                className="rounded-lg w-5 h-5 xl:w-10 xl:h-10"
              />
              <p className="text-xs md:text-lg text-gray-600 font-bold">
                NFT 상점
              </p>
            </button>
            */}

            {/* NFT 상점 */}

            {/* 친구 초대 */}
            <button
              onClick={() => {
                router.push(
                  "/" + params.lang + "/" + params.chain + "/users"
                );
              }}
              className="flex flex-col justify-center items-center gap-0
                hover:bg-blue-200 hover:text-blue-800
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
                p-2
              "
            >
              <Image
                src="/icon-invite.png"
                alt="Invite Friend"
                width={35}
                height={35}
                className="rounded-lg w-5 h-5 xl:w-10 xl:h-10"
              />
              <p className="text-xs md:text-lg text-gray-600 font-bold">
                회원목록
              </p>
            </button>

            {/* 마이페이지 */}
            <button
              onClick={() => {
                router.push(
                  "/" + params.lang + "/" + params.chain + "/my-page"
                );
              }}
              className="flex flex-col justify-center items-center gap-0
                hover:bg-blue-200 hover:text-blue-800
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
                p-2
              "
            >
              <Image
                src="/icon-my-page.png"
                alt="My Page"
                width={35}
                height={35}
                className="rounded-lg w-5 h-5 xl:w-10 xl:h-10"
              />
              <p className="text-xs md:text-lg text-gray-600 font-bold">
                마이페이지
              </p>
            </button>

          </div>

        </div>

      )}




    </main>
  );
}



function Header(
  {
    params,
    agent,
    tokenId,
    center,
  }
  :
  {
    params: any;
    agent: string;
    tokenId: string;
    center: string;
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
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="/logo.png"
            alt="Wallet"
            width={35}
            height={35}
            className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
          />
          <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
            MKRW
          </span>
        </div>


          {/* language selection */}
          
          <div className=" flex flex-row gap-2 justify-end items-center">
            <select
              className="p-2 text-sm bg-zinc-800 text-white rounded"
              onChange={(e) => {
                const lang = e.target.value;
                router.push(
                  "/" + lang + "/" + params.chain
                );
              }}
            >
              <option
                value="en"
                selected={params.lang === "en"}
              >
                English(US)
              </option>
              <option
                value="ko"
                selected={params.lang === "ko"}
              >
                한국어(KR)
              </option>
              <option
                value="zh"
                selected={params.lang === "zh"}
              >
                中文(ZH)
              </option>
              <option
                value="ja"
                selected={params.lang === "ja"}
              >
                日本語(JP)
              </option>
            </select>

          </div>



        {/* menu */}
        {/*
        <div className="flex flex-row gap-2 items-center">

          <button
            onClick={() => {
              router.push('/ko/polygon/my-nft/?agent=' + agent + '&tokenId=' + tokenId + '&center=' + center);
            }}
            className="text-gray-600 hover:underline text-xs xl:text-lg"
          >
            NFT
          </button>

        </div>
        */}
      </div>
      
      {/*
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />
      */}
      {/*
      <Image
        src="/wallet-logo.webp"
        alt="Wallet Logo"
        width={150}
        height={150}
        className="w-10 h-10 md:w-20 md:h-20"
      />


      
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-yellow-500">
        MKRW Wallet
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-green-500 font-bold"> USDT </span>
      </h1>

      <p className="text-gray-600
        text-base">
        Magic wallet for{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          P2E Game
        </code>{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          NFT
        </code>{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          DeFi
        </code>{" "}
      </p>
      */}
      
    </header>
  );
}



function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}


function MarketResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">

      <ArticleCard
        avatar="/icon-game.png"
        title="P2E Game"
        href="/"
        description="Play to Earn games with USDT rewards"
      />

  
      <ArticleCard
        avatar="/icon-nft.png"
        title="NFT Marketplace"
        href="/"
        description="Trade NFTs with USDT"
      />

      <ArticleCard
        avatar="/icon-defi.png"
        title="DeFi Apps"
        href="/"
        description="DeFi applications with USDT"
      />

    </div>
  );
}





function ArticleCard(props: {
  avatar?: string;
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      
      //href={props.href + "?utm_source=next-template"}
      href={props.href}

      //target="_blank"

      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >

      <div className="flex justify-center">
        <Image
          src={props.avatar || thirdwebIcon}
          alt="avatar"
          width={38}
          height={38}
          priority={true} // Added priority property
          className="rounded-full"
          style={{
              objectFit: 'cover',
              width: '38px',
              height: '38px',
          }}
        />
      </div>

      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}






  export default function Index({ params }: any) {
    return (
        <Suspense fallback={
            <div
                className="w-full h-screen flex flex-col items-center justify-center
                bg-zinc-100 text-gray-600 font-semibold text-lg"
            >Loading...</div>
        }>
            <IndexPage
                params={params}
            />
            {/* bg-[#E7EDF1] */}
            <div className="w-full h-36 bg-[#E7EDF1]"></div>

        </Suspense>
    );
  }