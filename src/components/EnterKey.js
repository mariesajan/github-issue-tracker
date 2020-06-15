import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setRepositoryDetailsAndRemoveError, setAPIKey, setError } from '../actions';
import '../App.css';


// To show error if invalid key is entered
const Error = () => {
  return (
    <p className="error">Error: Invalid Key</p>
  );
}
function EnterKey() {
  const dispatch = useDispatch();
  let apiKey = useSelector(state => state.apiKey);
  const history = useHistory();

  // to fetch repository details based on the submitted token
  async function getRepositoryDetails() {
       let repositoryArr = [];
        await fetch(`https://api.github.com/user/repos?access_token=${apiKey}`)
           .then(data => {
               return data.json()
           })
           .then(responseArr => {
               const owner = responseArr[0].owner.login;
               responseArr.forEach(item => {
                  let obj = {
                    repository_id: item.id, 
                    repository_name: item.name, 
                    is_active: false,
                    issues_url: item.issues_url,
                    issues_count: item.open_issues_count
                  }
                   repositoryArr.push(obj);
               });
               dispatch(setRepositoryDetailsAndRemoveError(repositoryArr, owner));
               history.push('/repositories'); // to redirect to priority interface after fetching repository details
               return repositoryArr;
           })
           .catch((err)=> {
               console.log('error occured: ', err);
               dispatch(setError(true));
           });
   }
   const isError = useSelector(state => state.isError);
   const error = isError ? <Error /> : '';
  return (
    <div className="center">
      <label>Enter the Key:</label>
      <input 
          type="text" 
          onChange={(e) => dispatch(setAPIKey(e.target.value))}/> 
      <button 
          onClick={() => getRepositoryDetails()}>Submit</button>
      {error}
    </div>
  );
}

export default EnterKey;
