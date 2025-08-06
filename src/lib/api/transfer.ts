import { transfer } from 'thirdweb/extensions/erc20';
import clientPromise from '../mongodb';

/*
  console.log("transactionHash", transactionHash, "transactionIndex", transactionIndex,
    "fromAddress", fromAddress, "toAddress", toAddress, "value", value,
    "timestamp", timestamp);
  
*/

export interface TransferProps {
    transactionHash: string;
    transactionIndex: string;
    fromAddress: string;
    toAddress: string;
    value: string;
    timestamp: string;

    fromUser?: any; // Optional, can be user object
    toUser?: any; // Optional, can be user object
}




export async function insertOne(data: any) {

    if (!data.transactionHash || !data.transactionIndex || !data.fromAddress || !data.toAddress || !data.value || !data.timestamp) {
        return null;
    }


    const client = await clientPromise;


    const collectionUserTransfers = client.db('damoa').collection('userTransfers');

  
    await collectionUserTransfers.insertOne({
        user: {
            walletAddress: data.fromAddress,
        },
        sendOrReceive: "send", // or "receive" based on your logic
        fromUser: data.fromUser, // Optional, can be user object
        toUser: data.toUser, // Optional, can be user object
        transferData: {
            transactionHash: data.transactionHash,
            transactionIndex: data.transactionIndex,
            fromAddress: data.fromAddress,
            toAddress: data.toAddress,
            value: data.value,
            timestamp: data.timestamp,
        },
    });



    await collectionUserTransfers.insertOne({
        user: {
            walletAddress: data.toAddress,
        },
        sendOrReceive: "receive", // or "send" based on your logic
        fromUser: data.fromUser, // Optional, can be user object
        toUser: data.toUser, // Optional, can be user object
        transferData: {
            transactionHash: data.transactionHash,
            transactionIndex: data.transactionIndex,
            fromAddress: data.fromAddress,
            toAddress: data.toAddress,
            value: data.value,
            timestamp: data.timestamp,
        },
    });



    




    return {
        result: "success",
    };


}




// getTransferByWalletAddress
export async function getTransferByWalletAddress(data: any) {

    if (!data.walletAddress) {
        return null;
    }

    const client = await clientPromise;


    /*
    {
        "_id": {
            "$oid": "689233b8f707d87be96596a5"
        },
        "user": {
            "walletAddress": "0xDEe1E6E4F4b6eE8b9b11458D100DB990082ac787"
        },
        "sendOrReceive": "send",
        "toUser": {
            "user_id": "0xec6530e3cd76211F4b5114231F3f98AEA3F98Fe6",
            "nickname": "hithere",
            "profile_url": "/icon-default-avatar.png",
            "require_auth_for_profile_image": false,
            "metadata": {
            "font_color": "black",
            "font_preference": "times new roman"
            },
            "access_token": "9628432993e7c8278d54d28b7cafffb037f66010",
            "created_at": 1752825794,
            "discovery_keys": [],
            "is_hide_me_from_friends": false,
            "is_shadow_blocked": false,
            "session_tokens": [],
            "is_online": false,
            "last_seen_at": -1,
            "is_active": true,
            "has_ever_logged_in": false,
            "preferred_languages": [],
            "locale": "",
            "unread_channel_count": 0,
            "unread_message_count": 0
        },
        "transferData": {
            "transactionHash": "0x4660caf732c097fc933a6373ad86ff4bc9229226232b50b87768eea60df3deb7",
            "transactionIndex": 57,
            "fromAddress": "0xDEe1E6E4F4b6eE8b9b11458D100DB990082ac787",
            "toAddress": "0xec6530e3cd76211F4b5114231F3f98AEA3F98Fe6",
            "value": "1200000000000000000000",
            "timestamp": 1754411957000
        }
        }
    */

    const collectionUserTransfers = client.db('damoa').collection('userTransfers');

    const userTransfers = await collectionUserTransfers
    .find({ "user.walletAddress": data.walletAddress })
    .sort({ "transferData.timestamp": -1 })
    .toArray();

    // totalTransfers
    const totalCount = await collectionUserTransfers.countDocuments({ "user.walletAddress": data.walletAddress });


    return {
        transfers: userTransfers,
        totalCount: totalCount,
    }

}




// getTransferByMint
// transferData.fromAddress is '0x0000000000000000000000000000000000000000'
export async function getTransferByMintAddress({
    walletAddress,
    page = 1,
    limit = 10,
}: {
    walletAddress: string;
    page?: number;
    limit?: number;
}) {



    const client = await clientPromise;

    const collectionUserTransfers = client.db('damoa').collection('userTransfers');

    const userTransfers = await collectionUserTransfers
    .find({ "transferData.fromAddress": '0x0000000000000000000000000000000000000000', })
    .sort({ "transferData.timestamp": -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

    // totalTransfers
    const totalCount = await collectionUserTransfers.countDocuments({ "transferData.fromAddress": '0x0000000000000000000000000000000000000000', });

    
    return {
        transfers: userTransfers,
        totalCount: totalCount,
    }

}







// insert escrowWalletAdddress collection
export async function insertEscrowWalletAddress(walletAddress: string) {

    if (!walletAddress) {
        return null;
    }

    const client = await clientPromise;

    const collectionEscrowWallets = client.db('damoa').collection('escrowWallets');

    // Check if the wallet address already exists
    const existingWallet = await collectionEscrowWallets.findOne({ walletAddress });

    if (existingWallet) {
        return { result: "wallet address already exists" };
    }

    // Insert the new wallet address
    await collectionEscrowWallets.insertOne({ walletAddress });

    return { result: "success" };
}

// check if escrowWalletAddress exists
export async function checkEscrowWalletAddressExists(walletAddress: string) {

    if (!walletAddress) {
        return false;
    }

    const client = await clientPromise;

    const collectionEscrowWallets = client.db('damoa').collection('escrowWallets');

    // Check if the wallet address exists
    const existingWallet = await collectionEscrowWallets.findOne({ walletAddress });

    return !!existingWallet; // Returns true if exists, false otherwise
}
