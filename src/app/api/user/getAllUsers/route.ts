import { NextResponse, type NextRequest } from "next/server";

import {
	getAllUsers,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    walletAddress,
    limit,
    page,
    center,
    searchNickname,
  } = body;



  const result = await getAllUsers({
    limit,
    page,
    center,
    searchNickname,
  });


  //console.log("getAllUsers result", result);


 
  return NextResponse.json({

    result,
    
  });
  
}
