import React from 'react';
import './ChannelTeamList.css';

// + button to add Channel
const AddChannel = ({setCreateType, setIsCreating, setIsEditing, setToggleContainer, type}) => {
    return(
        <button
            onClick={() => {
                setCreateType(type);
                setIsCreating((prevState) => !prevState);
                setIsEditing(false);
                if(setToggleContainer) setToggleContainer((prevState) => !prevState) 
            }}
        >
            +
        </button>
    );

}

// if error = true, means the parent component failed to get the list of channel
const ChannelTeamList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    if(error) {
        return type === 'team' ? (
            <div className="list-of-channels">
                <p className="channels-error">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }

    // if loading = true, means the parent component is still loading the list of channel
    if(loading) {
        return (
            <div className="list-of-channels">
                <p className="channels-loading">
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }

    return (
        <div className="list-of-channels">
            <div className="list-of-channels-header">
                {/* if type === 'team', the label will be 'Channels', otherwise 'Direct Message' */}
                <p className="list-of-channels-header-title">
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <AddChannel 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    type={type === 'team' ? 'team' : 'messaging'}
                    setToggleContainer={setToggleContainer}
                />
            </div>
            {children}
        </div>
    )
}

export default ChannelTeamList;