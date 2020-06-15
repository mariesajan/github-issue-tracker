import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Repository from './Repository';
import { saveState } from '../localStorage';

function RepositoryList() {
  const repositoryArr = useSelector(state => state.repositoryDetails);
  const state = useSelector(state => state);
  
  useEffect(() => {
    saveState(state);
  });
  
  if( repositoryArr && repositoryArr.length > 0) {
    return repositoryArr.map(repository => {
      return (
         <Repository 
            repository_name={repository.repository_name} 
            key={repository.repository_id} 
            repository_id={repository.repository_id}
            issues_url={repository.issues_url} 
            is_active={repository.is_active} />
      );
    })
  } else {
    return <p className="center">No repositories to display</p>;
  }
  
}

export default RepositoryList;
