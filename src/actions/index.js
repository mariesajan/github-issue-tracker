export function getRepositories() {
    return {
        type: 'GET_REPOSITORY'
    };
}

export function setAPIKey(data) {
    return {
        type: 'SET_KEY',
        data
    }
}

export  function setRepositoryDetailsAndRemoveError(dataArr, owner) {
    return {
        type: 'SET_REPOSITORY_DETAILS',
        data: {dataArr, owner}
    }
}

export function setActiveAndIssueDetails(id, issueArr) {
    return {
        type: 'SET_ACTIVE',
        data: {
            id,
            issueArr
        }
    }
}

export function setError(isError) {
    return {
        type: 'SET_ERROR',
        data: isError
    }
}
export function setOrderOfIssues(issueArr) {
    return {
        type: 'SET_ISSUES_ORDER',
        data: issueArr
    };
}

