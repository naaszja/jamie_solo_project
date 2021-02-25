const singleWorkOrderReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SINGLE_WORKORDER':
            const newState = action.payload;
            return newState;
        case 'UNSET_SINGLE_WORKORDER':
            return [];
        default:
            return state;
    }
};

export default workOrderReducer;