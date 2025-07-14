import { NextResponse, type NextRequest } from "next/server";




import axios from "axios";
import sharp from "sharp";

////import { PutBlobResult } from '@vercel/blob'

import { put } from '@vercel/blob';


import { customAlphabet } from 'nanoid';

import {
  findOneByUrl,
	insertOne as insertOneImage,
} from '@/lib/api/image';



///export const runtime = 'edge'

// nextjs-app
export const maxDuration = 60; // This function can run for a maximum of 60 seconds





const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string



/*
export default async function handler(req, res) {

  const userid = req.body?.userid;

  const url = req.body.url;

  const prompt = req.body.prompt;

  const type = req.body.type;
*/


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { userid, url, prompt, type } = body;

    //console.log("userid", userid);
    //console.log("url", url);
    //console.log("prompt", prompt);
    //console.log("type", type);

    if (!url) {
      return NextResponse.json(
        { error: "Please provide a url" },
        { status: 400 }
      );
    }
    // check if the image already exists by url
    const existingImage = await findOneByUrl({
      url: url,
    });

    // return error if the image already exists
    if (existingImage) {
      return NextResponse.json(
        { error: "Image already exists" },
        { status: 400 }
      );
    }

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const base64 = Buffer.from(response.data, "binary").toString("base64");

    const contentType = type || 'image/png';
    
    //const filename = `${nanoid()}.${contentType.split('/')[1]}`

    const filename = `${nanoid()}.${type}`;

    const blob = await put(
      filename,
      Buffer.from(base64, "base64"),
      {
        contentType: "image/png",
        access: 'public',
      }
    );

    console.log('blob?.url', blob?.url);

    const image = blob.url;
    const erc721ContractAddress = '';
    const tokenid = 0;

    const result = await insertOneImage({
      userid: userid,
      prompt: prompt,
      url: url,
      image: image,
      erc721ContractAddress: erc721ContractAddress,
      tokenid: tokenid,
    });

    console.log("result", result);

    console.log("download url", url);
    console.log("download type", type);

    const png = await sharp(Buffer.from(base64, "base64")).png().toBuffer();
    const pngBase64 = png.toString('base64');

    return NextResponse.json({
      status: 200,
      result: 'data:image/png;base64,' + pngBase64,
    });

  } catch (error) {
    console.error('Error in /api/ai/download:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
