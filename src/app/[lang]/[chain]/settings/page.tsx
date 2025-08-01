// nickname settings
'use client';
import React, { act, use, useEffect, useState } from 'react';



import { toast } from 'react-hot-toast';

import { client } from "../../../client";

import {
    polygon,
    arbitrum,
    ethereum,
    bsc,
} from "thirdweb/chains";

import {
    ConnectButton,
    useActiveAccount,
    useActiveWallet,
    useSetActiveWallet,
    useConnectedWallets,
    useDisconnect,
    useConnectModal,
} from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import Image from 'next/image';

import GearSetupIcon from "@/components/gearSetupIcon";


import Uploader from '@/components/uploader';
import { add } from 'thirdweb/extensions/farcaster/keyGateway';


const wallets = [
    inAppWallet({
      auth: {
        options: ["phone"],
      },
    }),
];


import {
    useRouter,
    useSearchParams,
}from "next//navigation";



import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";









export default function SettingsPage({ params }: any) {


    /////console.log("SettingsPage params", params);

    const searchParams = useSearchParams();
 
    const wallet = searchParams.get('wallet');
    
    
    
    
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

        Wallet_Settings: "",
        Profile_Settings: "",


        My_Wallet_Address: "",
        My_Phone_Number: "",
    
        Wallet_Address_Description1: "",
        Wallet_Address_Description2: "",
    
        I_understand_that_I_should_never_deposit_any_other_tokens: "",

        Copy: "",

        Disconnect_Wallet: "",
    

    
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

        Wallet_Settings,
        Profile_Settings,

        My_Wallet_Address,
        My_Phone_Number,

        Wallet_Address_Description1,
        Wallet_Address_Description2,

        I_understand_that_I_should_never_deposit_any_other_tokens,

        Copy,

        Disconnect_Wallet,

    } = data;
    
    
    

    const {disconnect} = useDisconnect();



    const { connect, isConnecting } = useConnectModal();
    const handleConnect = async () => {
      await connect({
        chain: params.chain === "arbitrum" ? arbitrum : polygon,
        client,
        wallets,
        size: 'compact',
        showThirdwebBranding: false,
        theme: 'light',
      });
    };




    const router = useRouter();

    // get the active wallet
    const activeWallet = useActiveWallet();





    const activeAccount = useActiveAccount();

    const address = activeAccount?.address;



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




    
    const [nickname, setNickname] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);

    const [editedNickname, setEditedNickname] = useState("");


    const [userCode, setUserCode] = useState("");






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

            ///console.log("data", data);

            if (data.result) {
                setNickname(data.result.nickname);
                setUserCode(data.result.id);
            }
        };

        fetchData();
    }, [address]);






    const setUserData = async () => {


        // check nickname length and alphanumeric
        //if (nickname.length < 5 || nickname.length > 10) {

        if (editedNickname.length < 5 || editedNickname.length > 10) {

            toast.error('Nickname should be at least 5 characters and at most 10 characters');
            return;
        }
        
        ///if (!/^[a-z0-9]*$/.test(nickname)) {
        if (!/^[a-z0-9]*$/.test(editedNickname)) {
            toast.error('Nickname should be alphanumeric and lowercase');
            return;
        }

        if (nicknameEdit) {


            const response = await fetch("/api/user/updateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    
                    //nickname: nickname,
                    nickname: editedNickname,

                }),
            });

            const data = await response.json();

            console.log("updateUser data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                toast.success('Nickname saved');

            } else {
                toast.error('Error saving nickname');
            }


        } else {

            const response = await fetch("/api/user/setUserVerified", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    
                    //nickname: nickname,
                    nickname: editedNickname,

                    mobile: phoneNumber,
                }),
            });

            const data = await response.json();

            console.log("data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                toast.success('Nickname saved');

            } else {
                toast.error('Error saving nickname');
            }
        }


        

        
    }



    const [agreementCopy, setAgreementCopy] = useState(false);


    return (

        <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-lg mx-auto">

            <div className="py-0 w-full">
        
                {/* goto home button using go back icon
                history back
                */}

                <AppBarComponent />
        
  
                <div className="mt-4 flex justify-start space-x-4 mb-10">
                    <button
                        onClick={() => router.push(

                        '/' + params.lang + '/' + params.chain + '/?wallet=' + wallet
                        
                    )}
                        className="text-zinc-100 font-semibold underline"
                    >
                        {Go_Home}
                    </button>
                </div>


                <div className="flex flex-col items-start justify-center space-y-4">

                    <div className='flex flex-row items-center space-x-4'>
                        <GearSetupIcon />
                        <div className="text-2xl font-semibold">
                            {Wallet_Settings}
                        </div>


                        {!address && (
                            <button
                                disabled={isConnecting}
                                onClick={handleConnect}
                                className="p-2 bg-blue-500 text-zinc-100 rounded"
                            >
                                {Please_connect_your_wallet_first}
                            </button>
                        )}


                        

                    </div>


                    <div className='w-full  flex flex-col gap-5 '>

                        {/* My Wallet */}
                        <div className='flex flex-col xl:flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>

                            <div className='flex flex-col items-start gap-2'>

                                <div className='flex flex-row items-center gap-2'>    
                                    <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                       
                                        {My_Wallet_Address}
                                    </div>
                                    {/* button for polygon explorer */}
                                    {address ? (
                                        <button
                                            onClick={() => {
                                                window.open(`


                                                    ${params.chain === "arbitrum" ? "https://arbiscan.io/address/" : "https://polygonscan.com/address/"}${address}
                                                    

                                                    `, "_blank");
                                            }}
                                            className="p-2 bg-zinc-200 text-zinc-800 rounded"
                                        >
                                            <Image
                                                src={params.chain === "arbitrum" ? "/logo-arbitrum.png" : "/logo-polygon.png"}
                                                alt={params.chain === "arbitrum" ? "Arbitrum" : "Polygon"}
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    ) : (
                                        <Image
                                            src={params.chain === "arbitrum" ? "/logo-arbitrum.png" : "/logo-polygon.png"}
                                            alt={params.chain === "arbitrum" ? "Arbitrum" : "Polygon"}
                                            width={20}
                                            height={20}
                                            className='animate-spin'
                                        />

                                    )}

                                </div>

                                <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-xs xl:text-xl font-semibold">
                                    {address}
                                </div>


                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-sm text-red-500'>
                                        {Wallet_Address_Description1}{' '}{params.chain}{' '}{Wallet_Address_Description2}
                                    </div>
                                </div>


                                {/* agreement checkbox */}
                                <div className='flex flex-row items-center gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={agreementCopy}
                                        onChange={() => setAgreementCopy(!agreementCopy)}
                                        className='w-6 h-6'
                                    />
                                    <div className='text-lg text-zinc-100 font-semibold'>
                                        {I_understand_that_I_should_never_deposit_any_other_tokens}
                                    </div>
                                </div>




                                <button
                                    disabled={!address || !agreementCopy}
                                    onClick={() => {
                                    navigator.clipboard.writeText(address || "");
                                    toast.success('Address copied to clipboard');
                                    }}
                                    className={`
                                        p-2 rounded text-black
                                        ${!address || !agreementCopy ? 'bg-gray-300 ' : 'bg-blue-500 text-white'}
                                    `}
                                    >
                                    {Copy}
                                </button>

                            </div>

                        </div>

                        {/* My Phone Number */}
                        <div className='flex flex-col xl:flex-row gap-2 items-center justify-between border border-gray-300 p-4 rounded-lg'>
                                
                            <div className="bg-green-500 text-sm text-zinc-100 p-2 rounded">
                                {My_Phone_Number}
                            </div>

                            <div className="p-2 bg-zinc-800 rounded text-zinc-100 text-2xl font-semibold">
                                {phoneNumber}
                            </div>

                            <button
                                disabled={!phoneNumber}
                                onClick={() => {
                                    navigator.clipboard.writeText(phoneNumber);
                                    toast.success('Phone number copied to clipboard');
                                }}
                                className="p-2 bg-blue-500 text-zinc-100 rounded"
                            >
                                {Copy}
                            </button>
                        
                        </div>

                        {/* Disconnect Wallet */}

                        {activeWallet && (
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <button
                                    disabled={!activeWallet}
                                    onClick={() => {
                                        confirm("로그아웃 하시겠습니까?") && disconnect(activeWallet);
                                    }}
                                    className="p-2 bg-red-500 text-zinc-100 rounded"
                                >
                                    {Disconnect_Wallet}
                                </button>


                                {/*
                                <iframe
                                    src='https://withpaper.com/sdk/2022-08-12/embedded-wallet/export?clientId=fbef5750f91259d17fc33469695bd744'


                                    width='100%'
                                    height='600px'
                                />
                                */}



                            </div>
                        )}









                    </div>


                </div>

            </div>

        </main>

    );

}

          
