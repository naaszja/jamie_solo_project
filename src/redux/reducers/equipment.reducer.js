const equipmentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EQUIPMENT':
            const newState = action.payload;
            return newState;
        case 'UNSET_EQUIPMENT':
            return [];
        default:
            return state;
    }
};

export default equipmentReducer;