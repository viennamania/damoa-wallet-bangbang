import { NextResponse, type NextRequest } from "next/server";

import {
    getPaymentByTid,
} from '@/lib/api/winpay';

import {
  ///getOneByWalletAddress
  upsertOneByWalletAddress,
} from '@lib/api/user';

import {
  insertOne,
  checkEscrowWalletAddressExists,
} from '@lib/api/transfer';



import {
  createThirdwebClient,
  eth_getTransactionByHash,
  getContract,
  sendAndConfirmTransaction,
  
  sendTransaction,
  sendBatchTransaction,
  eth_maxPriorityFeePerGas,


} from "thirdweb";

//import { polygonAmoy } from "thirdweb/chains";
import {
  ethereum,
  polygon,
  arbitrum,
  bsc,
 } from "thirdweb/chains";

import {
  privateKeyToAccount,
  smartWallet,
  getWalletBalance,
  
 } from "thirdweb/wallets";


import {
  mintTo,
  totalSupply,
  transfer,
  
  getBalance,

  balanceOf,

} from "thirdweb/extensions/erc20";



import {
  bscContractAddressUSDT,
  bscContractAddressMKRW,
} from "../../../../config/contractAddresses";
import { stat } from "fs";

/*
변수 휴대폰결제 뱅크페이 신용카드 네이버페이 설명 필수여부
van DAOU_HP BANKPAY DAOU_SHOP DAOU_NP 결제유형 필수
gid Van ID Van ID 필수
tmnId 터미널 ID 터미널 ID 필수
catId 터미널 ID
cancelYn 'N':승인, 'Y':취소, 'P':부분취소 취소여부 필수
amt 결제 금액 결제 금액 필수
tid 가맹점 주문번호 주문번호 필수
wTid 윈글로벌페이 거래번호 거래번호 필수
ordNm
*/

export const maxDuration = 300; // This function can run for a maximum of 300 seconds
export const dynamic = 'force-dynamic';


export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const van = searchParams.get('van');
    const gid = searchParams.get('gid');
    const tmnId = searchParams.get('tmnId');
    const catId = searchParams.get('catId');
    const cancelYn = searchParams.get('cancelYn');
    const amt = searchParams.get('amt');
    const tid = searchParams.get('tid');
    const wTid = searchParams.get('wTid');
    const ordNm = searchParams.get('ordNm');

    console.log("GET request received with params:", {
      van, gid, tmnId, catId, cancelYn, amt, tid, wTid, ordNm
    });



    try {

        if (!tid || !ordNm || !amt) {
            console.error("tid, ordNm, and amt are required");
            // Return an error response if tid, ordNm, or amt is missing
            return NextResponse.json({
                status: 'error',
                message: 'tid, ordNm, and amt are required',
            });
        }

        // get payment by tid
        const payment = await getPaymentByTid(tid);
        if (!payment) {
            return NextResponse.json({
                status: 'error',
                message: 'Payment not found',
            });
        }

        console.log("Payment found:", payment);



        const toWalletAddress = ordNm; // Use ordNm as the wallet address
        console.log("toWalletAddress", toWalletAddress);
        const amount = amt;
        console.log("amount", amount);




        const client = createThirdwebClient({
            secretKey: process.env.THIRDWEB_SECRET_KEY || "",
        });

        if (!client) {
            return NextResponse.json({
                status: 'error',
                message: 'Failed to create thirdweb client',
            });
        }

        const contractMMKRW = getContract(
            {
            client: client,
            chain: bsc,
            address: bscContractAddressMKRW,
            }
        );

        const adminSmartWalletPrivateKey = process.env.ADMIN_SMART_WALLET_PRIVATE_KEY || "";



        const personalAccount = privateKeyToAccount({
            client,
            privateKey: adminSmartWalletPrivateKey,
        });

        const wallet = smartWallet({
            chain: bsc,
            sponsorGas: true,
            ///factoryAddress: DEFAULT_ACCOUNT_FACTORY_V0_7, // 0.7 factory address

        });

        const account = await wallet.connect({
            client: client,
            personalAccount: personalAccount,
        });

        const adminSmartWalletAddress = account.address;

        console.log("adminSmartWalletAddress: ", adminSmartWalletAddress);



        /*
          const transactions = [] as any;



          const transactionMaster = transfer({
              contract: contractUSDT,
              to: toWalletAddress,
              amount: amount,
          });
          transactions.push(transactionMaster);



        
        const batchOptions: SendBatchTransactionOptions = {
          account: account,
          transactions: transactions,
        };
        
        const batchResponse = await sendBatchTransaction(
          batchOptions
        );
        console.log("batchResponse", batchResponse);
          */


        const response = await sendTransaction({
            account: account,
            transaction: transfer({
                contract: contractMMKRW,
                to: toWalletAddress,
                amount: amount,
            }),
        });


        if (!response) {
            return NextResponse.json({
            result: {
              status: "error",
              message: "Transaction failed",
              transactionHash: null,
              to: toWalletAddress,
              amount: amount,
            },
            });
        }


        console.log("transactionHash", response.transactionHash);

        return NextResponse.json({
            result: {
                status: "success",
                message: "Transaction successful",
                transactionHash: response.transactionHash,
                to: toWalletAddress,
                amount: amount,
            },
        });



    } catch (error) {
        console.error("error", error);
        return NextResponse.json({
            result: {
                status: "error",
                message: "Transaction failed",
                transactionHash: null,
            },
        });

    }


}