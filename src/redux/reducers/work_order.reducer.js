const workOrderReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORKORDERS':
            return action.payload;
        default:
            return state;
    }
}

export default workOrderReducer;