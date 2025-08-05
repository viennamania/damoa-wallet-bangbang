import { NextResponse, type NextRequest } from "next/server";



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    storecode,
    walletAddress,
  } = body;


  //console.log("getUser Request body:", body);

  try {

  

    const apiUrl = `${process.env.STABLE_API_URL}/api/user/getUser`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode,
        walletAddress,        
      }),
    });



    if (!response.ok) {
      
      console.error("Failed to fetch user:", response.status, response.statusText);
      return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }

    const data = await response.json();
    
    ///console.log("GetUser API response:", data);

    return NextResponse.json({
      result: data.result,
    });


  }  catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }


  
}
