import { NextResponse, type NextRequest } from "next/server";




/*
Response body: {"result":null,"error":"Failed to insert buy order"}
*/

export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    storecode,
    walletAddress,
    nickname,
    mobile,
  } = body;



  console.log("setUser body:", body);


  // api call

  try {

  

    const apiUrl = `${process.env.STABLE_API_URL}/api/user/setUser`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode,
        walletAddress,
        nickname,
        mobile,
      }),
    });



    if (!response.ok) {
      
      console.error("Failed to insert user:", response.status, response.statusText);
      return NextResponse.json({ error: "Failed to insert user" }, { status: 500 });
    }
    const data = await response.json();

    console.log("API response:", data);

    return NextResponse.json({
      result: data.result,
    });


  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json({ error: "Failed to insert user" }, { status: 500 });
  }

  
}
