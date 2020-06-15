import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IssueDetails from './IssueDetails';
import { setActiveAndIssueDetails, setOrderOfIssues } from '../actions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'; 
import styled from 'styled-components';

const StyledButtonLink = styled.button`
    border: none;
    text-decoration: underline;
    margin: 20px;
    min-width: 30%;
    background: none;
    outline: none;
    cursor: pointer;
`;

const StyledRepositoryContainerDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start; 
    /* for mobile screens */
    @media only screen and (max-width: 600px) {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

function Repository(props) {
    const dispatch = useDispatch();
    const  {repository_id, is_active } = props;
    let issueDetails =  useSelector(state => state.issueDetails); 

    // To handle reordering of issues using drag and drop
    const onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if(!destination || reason === 'CANCEL') {
            return;
        }
        if(destination.droppableId === source.droppableId && 
                destination.index === source.index) {
            return;
        }
       const droppedUser = issueDetails[source.index];
       issueDetails.splice(source.index, 1);
       issueDetails.splice(destination.index, 0, droppedUser);
       dispatch(setOrderOfIssues(issueDetails)); // set new order of issues in state
    }
     
    const RepositoryDetails = () => {
        const issueDetailsArr = useSelector(state => state.issueDetails);
        const issueDet = (issueDetailsArr && issueDetailsArr.length > 0) ? 
            <IssueDetails /> : 
            <span>No Issues to display</span>
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="issue-column">
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <h3 className="center">Issues</h3>
                            
                            {issueDet}
                            {provided.placeholder}
                        </div>
                    )}
                    
                </Droppable>
            </DragDropContext>
        );
    };
    
    // To handle display of repository issues. 
    // is_active is false if user not selected any repository
    const details = is_active ? <RepositoryDetails /> : <span></span>;
    const owner = useSelector(state => state.owner);

    // set the active repository and also fetch issue details when user selects repository
    async function setActiveAndGetIssueDetails(repoName, isActive) {
        
        if(isActive===true) { // if user selecting the already selected repo, then do nothing (to avoid fetching same data)
            return;
        }
        let repositoryArr = [];
         const issueUrl = `https://api.github.com/repos/${owner}/${repoName}/issues`;

         await fetch(issueUrl)
            .then(data => {
                return data.json()
            })
            .then(responseArr => {
                dispatch(setActiveAndIssueDetails(repository_id, responseArr ));
            })
            .catch((err)=> {
                console.log('error occured: ',err)
            });
        return repositoryArr;
    }
    return (
        
        <StyledRepositoryContainerDiv>
            <StyledButtonLink
                onClick={() => setActiveAndGetIssueDetails(props.repository_name, props.is_active)}>
                {props.repository_name} 
            </StyledButtonLink>
           {details} 
        </StyledRepositoryContainerDiv>
    )
}

export default Repository;