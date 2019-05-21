const initialState = {
    sortBy: 'id',
    tablePage: 1,
    listLength: 0,
    tableValues: {},
    searchByVal: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'RENDER_NOTES_SUCCESS':
            return {
                ...state,
                tableValues: action.notes.tableValues,
                sortBy: action.notes.sortBy,
                searchByVal: action.notes.searchVal,
                listLength: action.notes.countPage,
                tablePage: action.notes.activePage,
            };
        default:
            return state;
    }
};