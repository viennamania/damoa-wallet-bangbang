import { App as SendbirdApp } from '@sendbird/uikit-react';

import {router} from 'next/navigation';

const APP_ID = "CCD67D05-55A6-4CA2-A6B1-187A5B62EC9D";

///const USER_ID = "sendbirdian-200720";



import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelSettings from '@sendbird/uikit-react/ChannelSettings';
import ChatPage from '@/app/chat/page';
import Header from '@sendbird/uikit-react/ui/Header';


import Label from '@sendbird/uikit-react/ui/Label';

import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { GroupChannelProvider, useGroupChannelContext } from '@sendbird/uikit-react/GroupChannel/context';


import OpenChannel from '@sendbird/uikit-react/OpenChannel';

const ChannelSettingsPage = () => {

    return (
        <ChannelSettings
            renderHeader={() => (
                <Header
                    // Render nothing to hide the button.
                    renderLeft={() => { }}
                    // Change the header text string.
                    renderMiddle={() => (
                        <Header.Title
                            title={
                                <Label
                                    type=""
                                    color=""
                                >
                                    New title here
                                </Label>
                            }
                        />
                    )}
                    // Show or hide the right-top corner button.
                    renderRight={() => (
                        <Header.IconButton
                            type="INFO"
                            color="CONTENT"
                            renderIcon={(props) => (
                                <Header.Icon
                                    {...props}
                                    width="24px"
                                    height="24px"
                                />
                            )}
                            onClick={() => { }}
                        />
                    )}
                />
            )}
        />
    );
};



// /chat?channel=101168

export default function Chat({
    channel,
    userId,
    nickname,
    profileUrl,
}) {


    ///const { tradeId } = router.query;


    ///const smartAccount = useActiveAccount();
  
    ///const address = smartAccount?.address || "";

    // get params from url

    console.log("Chat channel========", channel);
    console.log("Chat userId==========", userId);



    return (
        <div
            //style={{ height: "100vw", width: "100vh" }}
            className='w-full h-[calc(80vh-4rem)]'
        >

            <h1 className='text-2xl font-bold text-center mb-4'>Chat</h1>
            <p className='text-center mb-4'>Channel: {channel}</p>
            <p className='text-center mb-4'>User ID: {userId}</p>
            <p className='text-center mb-4'>Nickname: {nickname}</p>
            <p className='text-center mb-4'>Profile URL: {profileUrl}</p>

        {/*
        <SendbirdProvider
            // Your Sendbird application ID can be found on Sendbird dashboard. 
            appId={APP_ID}
            // Specify the user ID you've created on the dashboard.
            // Or you can create a user by specifying a unique userId.  
            userId={userId}

        >
            
            <ChannelSettingsPage />
            

        </SendbirdProvider>
        */}



            {/*
            <SendbirdApp
                appId={APP_ID}
                userId={userId}
                nickname={nickname}

            />
            */}




        <SendbirdProvider
            appId={APP_ID}
            userId={userId}

            nickname={nickname}
            profileUrl={profileUrl}
        >

            
            <GroupChannel
                channelUrl={channel}

            />
            

            {/*
            <OpenChannel
                //channelUrl={'sendbird_open_channel_18053_3b9b531f3d94bb5b03b72bb8b5684eb7586db969'}

                channelUrl={channel}
            />
            */}



        </SendbirdProvider>
      






        </div>
    );

};