import clientPromise from '../mongodb';





export interface SettlementProps {
    walletAddress: string;
    amount: string;
    bankInfo?: {
        accountNumber: string;
        bankName: string;
        accountHolderName: string;
    };
    settlementWalletAddress?: string; // Optional, if not provided, default will be used
}


export async function processSettlement(data: SettlementProps) {
    if (!data.walletAddress || !data.amount || !data.settlementWalletAddress) {
        return { error: "Missing required fields" };
    }

    const settlementData = {
        walletAddress: data.walletAddress,
        amount: data.amount,
        bankInfo: data.bankInfo || null,
        settlementWalletAddress: data.settlementWalletAddress,
    };

    const client = await clientPromise;
    const collection = client.db('damoa').collection('settlements');

    // Insert the settlement data into the database
    const result = await collection.insertOne(settlementData);

    return {
        message: "Settlement processed successfully",
        data: settlementData,
        insertedId: result.insertedId,
    };
}


// getAllSettlements function to retrieve all settlements
export async function getAllSettlementsByWalletAddress(walletAddress: string) {
    if (!walletAddress) {
        return { error: "Missing wallet address" };
    }

    const client = await clientPromise;
    const collection = client.db('damoa').collection('settlements');

    // Find all settlements for the given wallet address
    const settlements = await collection.find({ walletAddress }).toArray();

    return settlements;
}   