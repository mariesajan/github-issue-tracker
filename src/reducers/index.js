const initialState = {
    isError: false,
    selectedRepo: '', // selected respository to track issues
    owner: '', 
    apiKey: '', // user entered token
    repositoryDetails: [], // fetched repository details based on token
    issueDetails: [] // fetched issue details based on selected repository
};

const allReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_KEY": 
            return Object.assign({}, state, {
                apiKey: action.data,
            });
        case "SET_REPOSITORY_DETAILS": 
            return Object.assign({}, state, {
                repositoryDetails: action.data.dataArr,
                owner: action.data.owner,
                isError: false
            });
        case "SET_ISSUES_ORDER":
            return Object.assign({}, state, {
                issueDetails: action.data
            });
        case "SET_ERROR":
            return Object.assign({}, state, {
                isError: action.data
            });
        case "SET_ACTIVE":
            let selectedRepo = '';
             const newRepDetails = state.repositoryDetails.map(item => {
                if(item.repository_id === action.data.id) {
                    selectedRepo = item.repository_name;
                     item.is_active = true;
                 } else {
                     item.is_active = false;
                 }
                return item;
            });
            return Object.assign({}, state, {
                repositoryDetails: newRepDetails,
                selectedRepo,
                issueDetails: action.data.issueArr
            });
        default:
          return state;
      }
};

export default allReducers;