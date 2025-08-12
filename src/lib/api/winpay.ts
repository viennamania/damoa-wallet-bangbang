import clientPromise from '../mongodb';

// object id
import { ObjectId } from 'mongodb';



/*
            payMethod: 'BPAY',
            tid: tid,
            amt: amount,
            goodsName: goodsName,
            ordNm: ordNm,
            email: email,
            productType: '00',
            cashReceipt: 0, // No cash receipt
            isMandatoryIssuer: false, // Not mandatory issuer
            ///returnUrl: `https://discordapp.com/api/webhooks/1390514441380036638/YL10zmKNU9yOjmrjOMsEWiEDeoFmx58ht7UsnzGI7_z1MHnB_8Ux-lqnbsVHwzFfahfA`,

            ///////returnUrl: 'https://wallet.cryptopay.beauty/api/webhook/winpay/buyPoint',

            returnUrl: 'http://wallet.cryptopay.beauty/api/webhook/winpay/buyPoint',
            */

export async function createBankPay({
    tid,
    amount,
    goodsName,
    ordNm,
    email,
    productType = '00', // Default product type
    cashReceipt = 0, // Default cash receipt value
    isMandatoryIssuer = false, // Default issuer requirement
    returnUrl = 'http://wallet.cryptopay.beauty/api/webhook/winpay/buyPoint', // Default return URL
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
