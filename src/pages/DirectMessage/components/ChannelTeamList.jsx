import React from 'react';

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
      >+
      </button>
    );

}

// if error = true, means the parent component failed to get the list of channel
const ChannelTeamList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    if(error) {
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }

    // if loading = true, means the parent component is still loading the list of channel
    if(loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }

    // children are the members inside the Channels and Direct Message list
    // else{
    //     console.log(children);
    // }


    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                {/* if type === 'team', the label will be 'Channels', otherwise 'Direct Message' */}
                <p className="team-channel-list__header__title">
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