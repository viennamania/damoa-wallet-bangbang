'use client';

//import { Session, Chatbox } from "@talkjs/react";


import dynamic from "next/dynamic";

import '@sendbird/uikit-react/dist/index.css';


import { client } from "../../../client";

import {
    getContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import {
    ConnectButton,
    useActiveAccount,
    useActiveWallet,

    useConnectedWallets,
    useSetActiveWallet,
} from "thirdweb/react";




import Image from 'next/image';

import React, { useEffect, useState, Suspense } from 'react';

import { Button } from "@headlessui/react";

import Link from "next/link";




//import Uploader from '@/components/uploader';

import {
    balanceOf,
    totalSupply,
} from "thirdweb/extensions/erc20";

import {
    polygon,
    arbitrum,
    ethereum,
    bsc,
} from "thirdweb/chains";

import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";


import {
    useRouter,
    useSearchParams,
} from "next//navigation";




import {
    bscContractAddressUSDT,
    bscContractAddressMKRW,
} from "@/app/config/contractAddresses";


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



function AgentPage(
    {
        params,
    }: {
        params: {
            lang: string;
            chain: string;
        };
    }
) {
  
  const searchParams = useSearchParams()
 
  const channel = searchParams.get('channel')
 

  console.log("ChatPageContent channel", channel);


  const { lang, chain } = params;




  // get the active wallet
  const activeWallet = useActiveWallet();


  //console.log("activeWallet", activeWallet);

  console.log("activeWallet", activeWallet);


  // get wallet address

  const address = activeWallet?.getAccount()?.address;
  


    const contractMKRW = getContract({
        client,
        chain: bsc,
        address: bscContractAddressMKRW,
    });
    
    const contractUSDT = getContract({
        client,
        chain: bsc,
        address: bscContractAddressUSDT,
    });


    const [totalSupplyMKRW, setTotalSupplyMKRW] = useState(0);
    const [balanceMKRW, setBalanceMKRW] = useState(0);
    useEffect(() => {

        // get the balance
        const getBalanceMKRW = async () => {

        if (!address) {
            return;
        }

        ///console.log('getBalance address', address);


        const resultTotalSupply = await totalSupply({
            contract: contractMKRW,
        });
        //console.log("resultTotalSupply", resultTotalSupply);
        setTotalSupplyMKRW(Number(resultTotalSupply) / 10 ** 18);




        
        const result = await balanceOf({
            contract: contractMKRW,
            address: address,
        });


        //console.log(result);

        if (!result) return;

        setBalanceMKRW( Number(result) / 10 ** 18 );

        };

        if (address) getBalanceMKRW();
        const interval = setInterval(() => {
            if (address) getBalanceMKRW();
        } , 5000)
        return () => clearInterval(interval);
    }, [address, contractMKRW]);



      

  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("/profile-default.png");
  const [userCode, setUserCode] = useState("");


  const [user, setUser] = useState<any>(null);


  const [seller, setSeller] = useState(null) as any;


  useEffect(() => {
      const fetchData = async () => {
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

          //console.log("data", data);

          if (data.result) {
              setNickname(data.result.nickname);
              data.result.avatar && setAvatar(data.result.avatar);
              setUserCode(data.result.id);

              setUser(data.result);

              setSeller(data.result.seller);

          }
      };

      fetchData();

  }, [address]);






  return (

    <main className="
        p-4 min-h-[100vh] flex-col items-start justify-center container max-w-screen-2xl mx-auto
        bg-[#E7EDF1]
        ">

      <div className="w-full flex flex-col items-center justify-center gap-4">


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



        {/* total supply of MKRW */}
        
        <div className="flex flex-col items-center justify-center w-full mb-5">

            <div className="flex flex-row gap-2 items-center">                    
                <Image
                    src="/token-mkrw-icon.png"
                    alt="MKRW Icon"
                    width={40}
                    height={40}
                    className="inline-block mr-2"
                />
                <span className="text-lg md:text-xl font-semibold">
                    MKRW 총 유통량:
                </span>
                <span className="text-2xl md:text-4xl font-semibold text-yellow-600"
                    style={{ fontFamily: 'monospace' }}>
                    {totalSupplyMKRW.toLocaleString()}
                </span>
            </div>
            {/* bscscan link */}
            <div className="mt-2">
                <Button
                    onClick={() => {
                        window.open(
                            `https://bscscan.com/token/${bscContractAddressMKRW}`,
                            "_blank"
                        );
                    }}
                    className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    BscScan에서 확인하기
                </Button>
            </div>
        </div>
        


        {/* 메뉴: 공지사항, 회원목록 */}
        <div className="w-full flex flex-row gap-4 items-start justify-start mb-5">
            <div className="flex flex-row gap-2 items-center
                border-b-2 border-blue-500 pb-2">
                <Image
                    src="/icon-notice.png"
                    alt="Notice Icon"
                    width={24}
                    height={24}
                />
                <Link
                    href={`/${lang}/${chain}/admin-notice`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                >
                    공지사항
                </Link>
            </div>

            <div className="flex flex-row gap-2 items-center
                border-b-2 border-blue-500 pb-2">
                <Image
                    src="/icon-invite.png"
                    alt="Users Icon"
                    width={24}
                    height={24}
                />
                <Link
                    href={`/${lang}/${chain}/admin-users`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                >
                    회원 목록
                </Link>
            </div>
        </div>


          {/* [공지] 지갑서비스를 오픈하였습니다. */}
          {/* 안녕하세요 지갑서스를 오픈하였습니다. */}
          {/* 제목 */}
          {/* 본문 */}
          <div className="flex flex-col items-center justify-center
              bg-white p-6 rounded-lg shadow-md
              border border-gray-200
              max-w-2xl w-full">
              <div className="flex items-center justify-center mb-4">
                  <Image
                      src="/icon-notice.png"
                      alt="Notice"
                      width={40}
                      height={40}
                      className="rounded-full w-8 h-8 mr-2"
                  />
                  <span className="text-gray-800 font-bold">
                    [공지] 지갑서비스를 오픈하였습니다.
                  </span>
              </div>
              <p className="text-gray-600 text-sm text-left">
                  안녕하세요 지갑서비스를 오픈하였습니다. 이제부터 지갑서비스를 이용하실 수 있습니다.
                  <br />
                  지갑서비스를 이용하시려면 아래의 절차를 따라주세요.
              </p>
              <p className="text-gray-600 mt-4 text-sm text-left">
                  
                  1. 지갑 생성
                  <br />
                  2. 지갑 주소 확인
                  <br />
                  3. 지갑 주소로 토큰 전송
                  <br />
                  4. 지갑 주소로 토큰 수신
                  <br />
                  5. 지갑 주소로 토큰 잔액 확인
                  <br />
                  6. 지갑 주소로 토큰 전송 기록 확인
              </p>
          </div>


      </div>

    </main>


  );
}


  export default function Agent({ params }: any) {
    return (
        <Suspense fallback={
            <div
                className="w-full h-screen flex flex-col items-center justify-center
                bg-zinc-100 text-gray-600 font-semibold text-lg"
            >Loading...</div>
        }>
            <AgentPage
                params={params}
            />
            <div className="w-full h-36 bg-[#E7EDF1]"></div>
        </Suspense>
    );
  }