import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import { saveState } from '../localStorage';
import styled from 'styled-components';

const StyledAvatarImage = styled.img`
    width: 50px;
    height: 50px;
    float: right;
    border-radius: 50%;
`;

const StyledIssueContainerDiv = styled.div`
    border: 1px solid gray;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    user-select: none;
    background: white;
`;

const StyledDateText = styled.p`
    font-size: 10px;
`;
function IssueDetails(props) {
    const  issueDetails = useSelector(state => state.issueDetails);
    const state = useSelector(state => state)
    useEffect(() => {
        saveState(state);
    });
    return issueDetails.map((issue, index) => {
        let createdDate = moment(issue.created_at).format('MM/DD/YY'),
            lastUpdated = moment(issue.updated_at).fromNow();  
                return (
                    <Draggable
                        key={index}
                        draggableId={index+''}
                        index={index}>
                            {(provided) => (
                                <StyledIssueContainerDiv 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                    id={issue.id}
                                    key={issue.url}
                                    >
                                    <StyledAvatarImage alt="Avatar" src={issue.user.avatar_url} />
                                    <p>Title:<span>{issue.title}</span></p>
                                    <StyledDateText>Created: <span>{createdDate}</span></StyledDateText>
                                    <StyledDateText>Last Updated: <span>{lastUpdated}</span></StyledDateText>
                                    
                                </StyledIssueContainerDiv>
                            )}
                    </Draggable>
                );
    })
}

export default IssueDetails;