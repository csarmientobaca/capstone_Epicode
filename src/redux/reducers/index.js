const initialState = {
    city: {
        cityContent: []
    },
    dataCity: {
        main: []
    }
}
const mainReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_CITY":
            return {
                ...state,
                city: {
                    ...state.city,
                    cityContent: [action.payload]
                }
            }

        case "ADD_MAIN":
            return {
                ...state,
                dataCity: {
                    ...state.dataCity,
                    main: [action.payload]
                }
            }
        default:
            return state
    }


}

export default mainReducer