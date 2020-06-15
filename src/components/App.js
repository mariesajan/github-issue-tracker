import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RepositoryList from './RepositoryList';
import EnterKey from './EnterKey';

const StyledRepositoryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin: auto;
  max-width: 1200px;
`;


const RepositoryWrapper = () => {
    return (
        <React.Fragment>
            <StyledRepositoryWrapper>
                <h2 className="center">Repository Details</h2>
                <RepositoryList />
            </StyledRepositoryWrapper>
        </React.Fragment>
    );
}

function App() {
  return (
      <Router>
          <div>
            <h1 className="center">Github Issue Tracker</h1>
            
              <Switch>
                <Route path="/" exact component={EnterKey} />
                <Route path="/repositories" component={RepositoryWrapper} />
              </Switch>
        </div>
      </Router>
  );
}

export default App;
