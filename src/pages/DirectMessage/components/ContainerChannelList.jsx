import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { SearchChannel, ChannelTeamList, ChannelTeamPreview } from './';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';
import { Cookie } from '@mui/icons-material';

const cookies = new Cookies();

const SideBar = ({logout}) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={HospitalIcon} alt="Hospital" width="30"/>
            </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
            <div className='icon2__inner' onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30"/>
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>PickMyClasses</p>
    </div>
)

const ContainerChannelList = () => {
    // log out simply by clearing the cookie
    const logout = () => {
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("username");
        cookies.remove("fullName");
        cookies.remove("avatarURL");
        cookies.remove("hashedPassword");
        cookies.remove("phoneNumber");
        
        window.location.href = "/";
    }

    return(
        <>
            <SideBar logout={logout}/>
            <div className='channel-list__list__wrapper'>
                <CompanyHeader/>
                <SearchChannel/>
                <ChannelList 
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => (
                        <ChannelTeamList
                            {...listProps}
                            type="team"
                        />
                    )}
                    Preview = {(previewProps) => (
                        <ChannelTeamPreview
                            {...previewProps}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => (
                        <ChannelTeamList
                            {...listProps}
                            type="messaging"
                        />
                    )}
                    Preview = {(previewProps) => (
                        <ChannelTeamPreview
                            {...previewProps}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    )
}

export default ContainerChannelList