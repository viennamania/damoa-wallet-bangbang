'use client';
import React, { useEffect, useState, Suspense } from "react";

import { toast } from 'react-toastify';



import { client } from "../../../client";

import {
    getContract,
    sendTransaction,
    sendAndConfirmTransaction,
} from "thirdweb";

import { deployERC721Contract } from 'thirdweb/deploys';

import {
    getOwnedNFTs,
    mintTo,
    transferFrom,
} from "thirdweb/extensions/erc721";


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

    useConnectedWallets,
    useSetActiveWallet,


} from "thirdweb/react";


import { shortenAddress } from "thirdweb/utils";
import { Button } from "@headlessui/react";

import Link from "next/link";



import Image from 'next/image';

//import Uploader from '@/components/uploader';

import { balanceOf } from "thirdweb/extensions/erc20";



import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";


import {
    useRouter,
    useSearchParams,
} from "next//navigation";


const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon






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
    const { lang, chain } = params;

    const searchParams = useSearchParams();

    const center = searchParams.get('center');


    const start = searchParams.get('start') || "0x0276aE1b0768bBfe47d3Dd34493A225405aDB6AA_134";

    const agent = start?.split('_')[0];
    const agentNumber = start?.split('_')[1];
  



    /*
    const [params, setParams] = useState({ center: '' });

  
    useEffect(() => {
        const center = searchParams.get('center') || '';
        setParams({ center });
    }, [searchParams]);
    */
 

    const account = useActiveAccount();


    const contract = getContract({
        client,
        chain: bsc,
        address: contractAddress,
    });
    

    


    const router = useRouter();



    const address = account?.address;
  
    // test address
    //const address = "0x542197103Ca1398db86026Be0a85bc8DcE83e440";
  









    const [balance, setBalance] = useState(0);
    useEffect(() => {
  
      // get the balance
      const getBalance = async () => {

        if (!address) {
            return;
        }
  
        ///console.log('getBalance address', address);
  
        
        const result = await balanceOf({
          contract,
          address: address,
        });
  
    
        //console.log(result);
  
        if (!result) return;
    
        setBalance( Number(result) / 10 ** 6 );
  
      };
  
      if (address) getBalance();
  
      const interval = setInterval(() => {
        if (address) getBalance();
      } , 1000);
  
      return () => clearInterval(interval);
  
    } , [address, contract]);


    ///console.log("balance", balance);



    
    const [nickname, setNickname] = useState("");
    const [editedNickname, setEditedNickname] = useState("");

    const [avatar, setAvatar] = useState("/profile-default.png");



    

    const [userCode, setUserCode] = useState("");


    const [nicknameEdit, setNicknameEdit] = useState(false);



    const [avatarEdit, setAvatarEdit] = useState(false);



    const [seller, setSeller] = useState(null) as any;


    const [isAgent, setIsAgent] = useState(false);

    const [referralCode, setReferralCode] = useState("");

    const [erc721ContractAddress, setErc721ContractAddress] = useState("0x0276aE1b0768bBfe47d3Dd34493A225405aDB6AA");

    const [userCenter, setUserCenter] = useState("");

    const [isCenterOwner, setIsCenterOwner] = useState(false);

    const [loadingUserData, setLoadingUserData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingUserData(true);
            const response = await fetch("/api/user/getUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    //center: center,
                }),
            });

            const data = await response.json();

            //console.log("data", data);


            if (data.result) {
                setNickname(data.result.nickname);
                
                data.result.avatar && setAvatar(data.result.avatar);
                

                setUserCode(data.result.id);

                setSeller(data.result.seller);

                setIsAgent(data.result.agent);

                ///setReferralCode(data.result.erc721ContractAddress);
                ////setErc721ContractAddress(data.result.erc721ContractAddress);

                setUserCenter(data.result.center);

                setIsCenterOwner(
                    data.result.centerOwner === true
                );

            } else {
                setNickname('');
                setAvatar('/profile-default.png');
                setUserCode('');
                setSeller(null);
                setEditedNickname('');
                
                //setAccountHolder('');

                //setAccountNumber('');
                //setBankName('');

                setIsAgent(false);

                setReferralCode('');

                setErc721ContractAddress('');

                setUserCenter('');
            }
            setLoadingUserData(false);

        };

        address &&
        fetchData();

    }, [address]);
    



    // check user nickname duplicate


    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

    const checkNicknameIsDuplicate = async ( nickname: string ) => {

        const response = await fetch("/api/user/checkUserByNickname", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickname: nickname,
            }),
        });


        const data = await response?.json();


        //console.log("checkNicknameIsDuplicate data", data);

        if (data.result) {
            setIsNicknameDuplicate(true);
        } else {
            setIsNicknameDuplicate(false);
        }

    }




    const [loadingSetUserData, setLoadingSetUserData] = useState(false);

    const setUserData = async () => {


        // check nickname length and alphanumeric
        //if (nickname.length < 5 || nickname.length > 10) {

        if (editedNickname.length < 5 || editedNickname.length > 10) {

            //toast.error("아이디는 5자 이상 10자 이하로 입력해주세요");
            return;
        }
        
        ///if (!/^[a-z0-9]*$/.test(nickname)) {
        if (!/^[a-z0-9]*$/.test(editedNickname)) {
            //toast.error("아이디는 영문 소문자와 숫자만 입력해주세요");
            return;
        }


        setLoadingSetUserData(true);

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

            ///console.log("updateUser data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                //toast.success('Nickname saved');

            } else {

                //toast.error('You must enter different nickname');
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
                    userType: "",
                    mobile: "",
                    telegramId: "",
                }),
            });

            const data = await response.json();

            //console.log("data", data);

            if (data.result) {

                setUserCode(data.result.id);
                setNickname(data.result.nickname);

                setNicknameEdit(false);
                setEditedNickname('');

                //toast.success('Nickname saved');

            } else {
                //toast.error('Error saving nickname');
            }
        }

        setLoadingSetUserData(false);

        
    }




    const [loadingDeployErc721Contract, setLoadingDeployErc721Contract] = useState(false);
    const deployErc721Contract = async () => {

        console.log("deployErc721Contract=====================");

        console.log("address", address);
        console.log("userCode", userCode);
        console.log("loadingDeployErc721Contract", loadingDeployErc721Contract);
        console.log("balance", balance);

  
        if (!address) {
            //toast.error('지갑을 먼저 연결해주세요');
            return;
        }

        if (!userCode) {
            //console.log("userCode=====", userCode);
            //toast.error('아이디를 먼저 설정해주세요');
            return;
        }

        if (loadingDeployErc721Contract) {
            //toast.error('이미 실행중입니다');
            return;
        }
        
        //if (confirm("Are you sure you want to deploy ERC721 contract?")) {
        // chinese confirm
        if (confirm("NFT 계약주소를 생성하시겠습니까?")) {

            setLoadingDeployErc721Contract(true);


            try {

                /*
                const contractAddress = await deployERC721Contract({
                        chain,
                        client,
                        account,
                        type: "DropERC721",
                        params: {
                        name: "MyNFT",
                        description: "My NFT contract",
                        symbol: "NFT",
                        });
                                        */


                const erc721ContractAddress = await deployERC721Contract({
                    chain: bsc,
                    client: client,
                    account: account as any,
            
                    /*  type ERC721ContractType =
                    | "DropERC721"
                    | "TokenERC721"
                    | "OpenEditionERC721";
                    */
            
                    ///type: "DropERC721",
            
                    type: "TokenERC721",
                    
                    
                    params: {
                        name: "AI Agent",
                        description: "This is AI Agent",
                        symbol: "AGENT",
                    },
            
                });

                ///console.log("erc721ContractAddress", erc721ContractAddress);

                // save the contract address to the database
                // /api/user/updateUser
                // walletAddress, erc721ContractAddress

                if (!erc721ContractAddress) {
                    throw new Error('Failed to deploy ERC721 contract');
                }


                ///console.log("erc721ContractAddress", erc721ContractAddress);



                const response = await fetch('/api/user/updateUserErc721Contract', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        walletAddress: address,
                        erc721ContractAddress: erc721ContractAddress,
                        //center: center,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save ERC721 contract address');
                }

                ///const data = await response.json();

                ///console.log("data", data);


                //setReferralCode(erc721ContractAddress);

                setErc721ContractAddress(erc721ContractAddress);
                
                ///toast.success('NFT 계약주소 생성 완료');

            } catch (error) {
                console.error("deployErc721Contract error", error);

                if (error instanceof Error) {
                    alert('NFT 계약주소 생성 실패.' + error.message);
                } else {
                    alert('NFT 계약주소 생성 실패: 알 수 없는 오류');
                }


            }

            setLoadingDeployErc721Contract(false);

        }
  
    };



   /* my NFTs */
   const [myNfts, setMyNfts] = useState([] as any[]);

   const [loadingMyNfts, setLoadingMyNfts] = useState(false);

   
   useEffect(() => {


       const getMyNFTs = async () => {

              if (!address) {
                return;
              }

              setLoadingMyNfts(true);

            
           try {

                /*
                const contract = getContract({
                     client,
                     chain: bsc,
                     address: erc721ContractAddress,
                });


                
                const nfts = await getOwnedNFTs({
                    contract: contract,
                    owner: address as string,
                });

                console.log("nfts=======", nfts);

                setMyNfts( nfts );
                */
                

                /*
                setMyNfts([
                    {
                         name: "AI Agent",
                         description: "This is AI Agent",
                         image: "https://owinwallet.com/logo-aiagent.png",
                    },
                ]);
                */


                // api /api/agent/getAgentNFTByWalletAddress
                
                const response = await fetch("/api/affiliation/getAgentNFTByWalletAddress", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        walletAddress: address,
                        erc721ContractAddress: erc721ContractAddress,
                    }),
                });

                if (!response.ok) {

                    setLoadingMyNfts(false);
                    throw new Error('Failed to get NFTs');

                }

                const data = await response.json();

                //console.log("myOwnedNfts====", data.result);




                if (data.result) {
                    /*
                    // exclude name is "MasgerBot"
                    const filteredNfts = data.result.ownedNfts.filter((nft : any) => {

                        if (nft.name === "MasterBot") {
                            return false;
                        }

                        return true;
                    });
                    */
                    // sort by nft.mint.timestamp desc
                    
                    const filteredNfts = data.result.ownedNfts.sort((a: any, b: any) => {
                        return b.mint.timestamp - a.mint.timestamp;
                    });

                    //console.log("filteredNfts", filteredNfts);

                    setMyNfts(filteredNfts);



                    //setMyNfts(data.result.ownedNfts);
                } else {
                    setMyNfts([]);
                }

                
                setLoadingMyNfts(false);
   


           } catch (error) {
               console.error("Error getting NFTs", error);
           }
           

           setLoadingMyNfts(false);

       };

       if (address ) {
           getMyNFTs();
       }

   }
   , [ address ]);

   
    const [agentName, setAgentName] = useState("");
    const [agentDescription, setAgentDescription] = useState("");


    const [agentImage, setAgentImage] = useState("");
    const [ganeratingAgentImage, setGeneratingAgentImage] = useState(false);


    const [mintingAgentNft, setMintingAgentNft] = useState(false);
    const [messageMintingAgentNft, setMessageMintingAgentNft] = useState("");
    const mintAgentNft = async () => {


        if (mintingAgentNft) {
            //toast.error('이미 실행중입니다');
            setMessageMintingAgentNft('이미 실행중입니다');
            return;
        }

        if (!address) {
            //toast.error('지갑을 먼저 연결해주세요');
            setMessageMintingAgentNft('지갑을 먼저 연결해주세요');
            return;
        }

        if (!erc721ContractAddress) {
            //toast.error('NFT 계약주소를 먼저 생성해주세요');
            setMessageMintingAgentNft('NFT 계약주소를 먼저 생성해주세요');
            return;
        }

        /*
        if (agentName.length < 5 || agentName.length > 15) {
            //toast.error('에이전트 이름은 5자 이상 15자 이하로 입력해주세요');
            setMessageMintingAgentNft('에이전트 이름은 5자 이상 15자 이하로 입력해주세요');
            return;
        }

        if (agentDescription.length < 5 || agentDescription.length > 100) {
            //toast.error('에이전트 설명은 5자 이상 100자 이하로 입력해주세요');
            setMessageMintingAgentNft('에이전트 설명은 5자 이상 100자 이하로 입력해주세요');
            return;
        }
        */

        if (
            confirm("추천코드 NFT를 발행하시겠습니까?") === false
        ) {
            return;
        }


        setMessageMintingAgentNft('NFT 발행중입니다');


        setMintingAgentNft(true);

        try {


            setGeneratingAgentImage(true);


            setMessageMintingAgentNft('NFT 이미지 생성중입니다');

            // genrate image from api
            // /api/ai/generateImage

            const responseGenerateImage = await fetch("/api/ai/generateImageAgentWallet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    englishPrompt: "",
                }),
            });

            const dataGenerateImage = await responseGenerateImage.json();

            const imageUrl = dataGenerateImage?.result?.imageUrl;
        
            if (!imageUrl) {

                setGeneratingAgentImage(false);

                throw new Error('Failed to generate image');
            }


            setGeneratingAgentImage(false);
            setAgentImage(imageUrl);


            setMessageMintingAgentNft('NFT 발행중입니다');


            /*
            const contract = getContract({
                client,
                chain: bsc,
                address: erc721ContractAddress,

              });

            
            //const nftName = "Affiliate AI Agent";
            // nftName is random number and lower character mixed, length is 10 characters
            // nftName is 10 characters

            const nftName = Math.random().toString(36).substring(2, 12);

            //const nftName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


            const nftDesscription = "This is Affiliate AI Agent";
            const transaction = mintTo({
                contract: contract,
                to: address as string,
                nft: {
                    name: nftName,
                    description: nftDesscription,

                    ////image: agentImage,
                    image: imageUrl,

                },
            });
            

            
            //const transaction = mintTo({
            //    contract: contract,
            //    to: address as string,
            //    nft: {
            //        name: agentName,
            //        description: agentDescription,

                    ////image: agentImage,
            //        image: imageUrl,

            //    },
            //});
            

            //await sendTransaction({ transaction, account: activeAccount as any });



            //setActiveAccount(smartConnectWallet);

            const transactionResult = await sendAndConfirmTransaction({
                account: account as any,
                transaction: transaction,

                ///////account: smartConnectWallet as any,
            });

            */


            // api call

            const nftName = Math.random().toString(36).substring(2, 12);

            const nftDesscription = "This is Affiliate AI Agent";


            const response = await fetch("/api/affiliation/mintAgentNft", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    erc721ContractAddress: erc721ContractAddress,
                    name: nftName,
                    description: nftDesscription,
                    image: imageUrl,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to mint NFT');
            }

            const data = await response.json();

            const transactionHash = data.result;


            console.log("transactionHash", transactionHash);


            if (!transactionHash) {
                throw new Error('NFT 발행 실패. 관리자에게 문의해주세요');
            }

            setMessageMintingAgentNft('NFT 발행 완료');


            // fetch the NFTs again
            const responseNft = await fetch("/api/affiliation/getAgentNFTByWalletAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                    //erc721ContractAddress: erc721ContractAddress,
                }),
            });

            if (responseNft.ok) {
                const data = await responseNft.json();
                if (data.result) {
                    // exclude name is "MasgerBot"
                    const filteredNfts = data.result.ownedNfts.filter((nft : any) => {

                        if (nft.name === "MasterBot") {
                            return false;
                        }

                        return true;
                    });

                    setMyNfts(filteredNfts);



                } else {
                    setMyNfts([]);
                }
            }

            setAgentName("");
            setAgentDescription("");

            ///toast.success('AI 에이전트 NFT 발행 완료');




        } catch (error) {
            //console.error("mintAgentNft error", error);

            ///toast.error('AI 에이전트 NFT 발행 실패');

            if (error instanceof Error) {
                setMessageMintingAgentNft('NFT 발행 실패:' + error.message);
            } else {
                setMessageMintingAgentNft('NFT 발행 실패: 알 수 없는 오류');
            }
        }

        setMintingAgentNft(false);

        setAgentImage("");

    }




    // transfer NFT
    const [transferingNftList, setTransferingNftList] = useState([] as any[]);

    // initailize transferingNftList for myNfts
    useEffect(() => {
        if (myNfts) {
            setTransferingNftList(myNfts.map((nft) => {
                return {
                    contractAddress: nft.contract.address,
                    tokenId: nft.tokenId,
                    transferring: false,
                };
            }));
        }
    }, [myNfts]);


    ///console.log("transferingNftList", transferingNftList);


    // toAddress array
    const [toAddressList, setToAddressList] = useState([] as any[]);
    useEffect(() => {
        if (myNfts) {
            setToAddressList(myNfts.map((nft) => {
                return {
                    contractAddress: nft.contract.address,
                    tokenId: nft.tokenId,
                    to: "",
                };
            }));
        }
    } , [myNfts]);



    const transferNft = async (contractAddress: string, tokenId: string) => {

        if (transferingNftList.find((item) =>
            item.contractAddress === contractAddress && item.tokenId === tokenId
        ).transferring) {
            return;
        }

        


        if (confirm(
            "NFT를 다른 사용자에게 전송하시겠습니까?"
        ) === false) {
            return;
        }



        setTransferingNftList(transferingNftList.map((item) => {
            if (item.contractAddress === contractAddress && item.tokenId === tokenId) {
                return {
                    ...item,
                    transferring: true,
                };
            }
        }));

        const to = toAddressList.find((item) => 
            item.contractAddress === contractAddress && item.tokenId === tokenId
        ).to;

        try {

            const contract = getContract({
                client,
                chain: bsc,
                address: contractAddress,
            });

            const transaction = transferFrom({
                contract: contract,
                from: address as string,
                to: to,
                tokenId: BigInt(tokenId),
            });

            const transactionResult = await sendAndConfirmTransaction({
                account: account as any,
                transaction: transaction,

            });

            if (!transactionResult) {
                throw new Error('Failed to transfer NFT');
            }

            setTransferingNftList(transferingNftList.map((item) => {
                if (item.contractAddress === contractAddress && item.tokenId === tokenId) {
                    return {
                        ...item,
                        transferring: false,
                    };
                }
            }));

            alert('NFT 전송 완료');


            // fetch the NFTs again
            const response = await fetch("/api/affiliation/getAgentNFTByWalletAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) {
                    
                    //setMyNfts(data.result.ownedNfts);
                    // exclude name is "MasgerBot"
                    const filteredNfts = data.result.ownedNfts.filter((nft : any) => {
                        

                        if (nft.name === "MasterBot") {
                            return false;
                        }

                        return true;
                    });

                    setMyNfts(filteredNfts);



                } else {
                    setMyNfts([]);
                }
            }

        } catch (error) {
            console.error("transferNft error", error);

            setTransferingNftList(transferingNftList.map((item) => {
                if (item.contractAddress === contractAddress && item.tokenId === tokenId) {
                    return {
                        ...item,
                        transferring: false,
                    };
                }
            }));

            if (error instanceof Error) {
                alert('Failed to transfer NFT:' + error.message);
            } else {
                alert('Failed to transfer NFT: unknown error');
            }
        }



    }


    // call api /api/sendbirds/getAllUsers
    const [sendbirdUsers, setSendbirdUsers] = useState([] as any[]);
    const [pageToken, setPageToken] = useState("");
    const getSendbirdUsers = async () => {
        try {
            const response = await fetch("/api/sendbird/getAllUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    limit: 10, // limit the number of users to fetch
                    pageToeken: pageToken, // use pageToken for pagination
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get Sendbird users');
            }

            const data = await response.json();

            //console.log("sendbirdUsers", data.result);

            //setSendbirdUsers(data.result.users || []);

            setSendbirdUsers((prevUsers) => [
                ...prevUsers,
                ...(data.result.users || []),
            ]);



            setPageToken(data.result.next || "");

        } catch (error) {
            console.error("getSendbirdUsers error", error);
        }
    }

    useEffect(() => {
        if (address) {
            getSendbirdUsers();
        }
    }, [address]);


    /*
    {
        "users": [
            {
                "user_id": "Craig",
                "nickname": "Shopperholic",
                "profile_url": "https://sendbird.com/main/img/profiles/profile_06_512px.png",
                "is_active": true,
                "is_online": true,
                "created_at": 1542123432,
                "last_seen_at": 0,
                "has_ever_logged_in": true,
                "metadata": {
                    "font_preference": "times new roman",
                    "font_color": "black"
                }
            },
            {
                "user_id": "Doris",
                "nickname": "Dojung",
                "profile_url": "https://sendbird.com/main/img/profiles/profile_05_512px.png",
                "is_active": true,
                "is_online": false,
                "created_at": 1540285244,
                "last_seen_at": 1540285396142,
                "has_ever_logged_in": true,
                "metadata": {
                    "font_preference": "times new roman",
                    "font_color": "black"
                }
            },
            {
                "user_id": "Young",
                "nickname": "Sportsman",
                "profile_url": "https://sendbird.com/main/img/profiles/profile_07_512px.png",
                "is_active": true,
                "is_online": true,
                "created_at": 1502403479,
                "last_seen_at": 0,
                "has_ever_logged_in": true,
                "metadata": {
                    "font_preference": "times new roman",
                    "font_color": "black"
                }
            }
        ],
        "next": "YXEZR1VVQVErEUBXWFNeF2p3FkFVVA~~"
    }
    */




    return (

        <main className="
        p-4 min-h-[100vh] flex-col items-start justify-center container max-w-screen-lg mx-auto
        bg-[#E7EDF1]
        ">

            <div className=" py-0 w-full">



               {/* list of sendbird users */}
                <div className="w-full mb-5">
                    <h2 className="text-xl font-semibold mb-3">Sendbird Users</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sendbirdUsers.map((user) => (
                            <div key={user.user_id} className="p-4 bg-white rounded-lg shadow-md">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={user.profile_url || "/profile-default.png"}
                                        alt={user.nickname}
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{user.nickname}</h3>
                                        <p className="text-sm text-gray-600">ID: {user.user_id.length > 10 ? user.user_id.slice(0, 10) + '...' : user.user_id}</p>
                                        <p className="text-sm text-gray-500">Online: {user.is_online ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {pageToken && (
                        <Button
                            onClick={getSendbirdUsers}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Load More
                        </Button>
                    )}
                </div>






            </div>

        </main>

    );

}

          

function Header(
    {
        center,
        agent,
        tokenId,
    } : {
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
                    router.push('/?center=' + center + '&agent=' + agent + '&tokenId=' + tokenId);
                }}
            >            
                <div className="flex flex-row gap-2 items-center">
                    <Image
                    src="/logo-aiagent.png"
                    alt="Circle Logo"
                    width={35}
                    height={35}
                    className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
                    />
                    <span className="text-lg xl:text-3xl text-gray-800 font-semibold">
                    AI Agent
                    </span>
                </div>
            </button>

            {/*}
            <div className="flex flex-row gap-2 items-center">
                <button
                onClick={() => {
                    router.push(
                        "/tbot?center=" + center + "agent=" + agent + "&tokenId=" + tokenId
                    );
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
                >
                TBOT
                </button>
                <button
                onClick={() => {
                    router.push('/profile?center=' + center + 'agent=' + agent + '&tokenId=' + tokenId);
                }}
                className="text-gray-600 hover:underline text-xs xl:text-lg"
                >
                SETTINGS
                </button>
            </div>
            */}


        </div>
        
      </header>
    );
  }



  // export default function SettingsPage({ params }: any) {

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