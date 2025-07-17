import { NextResponse, type NextRequest } from "next/server";




export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    user_id1,
    user_id2,
  } = body;



        // group_channels
        /*
      const url = `https://api-${APPLICATION_ID}.sendbird.com/v3/group_channels`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Api-Token': apiToken,
          },
          body: JSON.stringify({
            name: "거래번호: #" + tradeId,
            channel_url: orderId,
            cover_url: 'https://stable.makeup/icon-trade.png',
            custom_type: 'trade',
            user_ids: [buyerWalletAddress, sellerWalletAddress],
            data: JSON.stringify({
              tradeId: tradeId,
              buyerWalletAddress: buyerWalletAddress,
              sellerWalletAddress: sellerWalletAddress,
              sellerStorecode: sellerStorecode,
            }),
            
          }),
        });
        */




  if (!user_id1 || !user_id2) {

    console.error("Missing user IDs:", user_id1, user_id2);

    return NextResponse.json(
      { error: 'Missing user IDs' },
      { status: 400 }
    );
  }

  const urlUser1 = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users/${user_id1}?include_unread_count=true`;

  const responseUser1 = await fetch(urlUser1, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
  });

  if (!responseUser1.ok) {
    console.error("Error fetching user 1:", responseUser1.statusText);
    return NextResponse.json(
      { error: 'Failed to fetch user 1' },
      { status: responseUser1.status }
    );
  }
  const dataUser1 = await responseUser1.json();
  console.log("Fetched user 1 data:", dataUser1);

  const urlUser2 = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users/${user_id2}?include_unread_count=true`;
  const responseUser2 = await fetch(urlUser2, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
  });
  if (!responseUser2.ok) {
    console.error("Error fetching user 2:", responseUser2.statusText);
    return NextResponse.json(
      { error: 'Failed to fetch user 2' },
      { status: responseUser2.status }
    );
  }
  const dataUser2 = await responseUser2.json();
  console.log("Fetched user 2 data:", dataUser2);



  const url = `https://api-${process.env.SENDBIRD_APPLICATION_ID}.sendbird.com/v3/group_channels`;

  console.log("Creating group channel with URL:", url);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': process.env.SENDBIRD_API_TOKEN || '',
    },
    body: JSON.stringify({
      user_ids: [user_id1, user_id2],
      
      //name: `${dataUser1.nickname} 와 ${dataUser2.nickname}의 채널`,
      name: `${dataUser1.nickname} - ${dataUser2.nickname}`,

      is_distinct: true,

      //cover_url: 'https://gold.goodtether.com/icon-trade.png',
      //custom_type: 'trade',

    }),
  });

  if (!response.ok) {
    console.error("Error creating user:", response.statusText);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: response.status }
    );
  }

  const data = await response.json();

  console.log("Created group channel data:", data);

  const channel_url = data.channel_url;

  console.log("Created group channel channel_url:", channel_url);

  return NextResponse.json({
    result: {
      channel_url: channel_url,
    }
  });
  
}
