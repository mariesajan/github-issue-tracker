import React from 'react';
import renderer from 'react-test-renderer';
import App from './components/App';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('App EnterKey Component', () => {
  const initialState = {
    isError: false,
    selectedRepo: '', 
    owner: '', 
    apiKey: '', 
    repositoryDetails: [], 
    issueDetails: [] 
};
  const mockStore = configureStore();
  let store, wrapper;
  it('matches the snapshot', () => {
    store = mockStore(initialState)
    const tree = renderer.create(<Provider store={store}><App /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
 
});





