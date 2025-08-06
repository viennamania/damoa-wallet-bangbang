import { NextResponse, type NextRequest } from "next/server";

import {
    getTransferByMintAddress,
} from '@lib/api/transfer';

export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    walletAddress,
    page,
    limit,
  } = body;

  //console.log("walletAddress", walletAddress);


  const result = await getTransferByMintAddress({
    walletAddress,
    page,
    limit,
  });

  console.log("result", result);



  return NextResponse.json({

    result,
    
  });
  
}
