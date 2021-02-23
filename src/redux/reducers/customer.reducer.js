const customerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CUSTOMERS':
            const newState = action.payload;
            return newState;
        case 'UNSET_CUSTOMERS':
            return [];
        default:
            return state;
    }
};

export default customerReducer;