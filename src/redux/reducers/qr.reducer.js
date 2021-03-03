const qrReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_QR':
            const newState = action.payload;
            return newState;
        case 'UNSET_QR':
            return [];
        default:
            return state;
    }
};

export default qrReducer;