import clientPromise from '../mongodb';

// object id
import { ObjectId } from 'mongodb';




export async function createBankPay({
    tid,
    amount,
    goodsName,
    ordNm,
    email,
    productType = '00', // Default product type
    cashReceipt = 0, // Default cash receipt value
    isMandatoryIssuer = false, // Default issuer requirement
    returnUrl = '', // Default return URL
    }: {
    tid: string;
    amount: number;
    goodsName: string;
    ordNm: string;
    email: string;
    productType?: string;
    cashReceipt?: number;
    isMandatoryIssuer?: boolean;
    returnUrl?: string;
    }) {
    const client = await clientPromise;
    const db = client.db('winpay');
    
    const result = await db.collection('bankpayPayments').insertOne({
        tid,
        amount,
        goodsName,
        ordNm,
        email,
        productType,
        cashReceipt,
        isMandatoryIssuer,
        returnUrl,
        createdAt: new Date(),
    });

    return result.insertedId.toString();
}


// get payment by tid
export async function getPaymentByTid(tid: string) {
    const client = await clientPromise;
    const db = client.db('winpay');

    const payment = await db.collection('bankpayPayments').findOne({
        tid: tid,
    });

    return payment;
}