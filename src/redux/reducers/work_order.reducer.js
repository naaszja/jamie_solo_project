const workOrderReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORKORDERS':
            const newState = action.payload;
            return newState;
        case 'USET_WORKORDERS':
            return [];
        default:
            return state;
    }
};

export default workOrderReducer;