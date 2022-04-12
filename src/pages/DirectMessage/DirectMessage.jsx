import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ContainerChannel, ContainerChannelList, Auth } from './components';

import './DirectMessage.css';

const API_KEY = '9z6vzf5r88js';

const client = StreamChat.getInstance(API_KEY);

const authToken = false;

const DirectMessage = () => 
{
    if(!authToken) return <Auth/>
    return (
        <div className='app_wrapper'>
            <Chat client={client} theme="team light">
                <ContainerChannelList/>
                <ContainerChannel/>
            </Chat>
        </div>
    )
}

export default DirectMessage;