const getNotes = () => ({
    type: 'GET_NOTES',
});

const addNote = ({name, value, search, sortBy, tablePage}) => ({
    type: 'ADD_NOTE',
    name,
    value,
    search,
    sortBy,
    tablePage
});

const deleteNote = ({id, search, sortBy, tablePage}) => ({
    type: 'DELETE_NOTE',
    id,
    search,
    sortBy,
    tablePage
});

const setSortBy = ({search, sortBy, tablePage}) => ({
    type: 'SET_SORT',
    search,
    sortBy,
    tablePage
});

const searchBy = ({search, sortBy, tablePage}) => ({
    type: 'SET_SEARCH_VAL',
    search,
    sortBy,
    tablePage
});

const setPage = ({search, sortBy, tablePage}) => ({
    type: 'SET_PAGE',
    search,
    sortBy,
    tablePage
});

export default {
    getNotes,
    addNote,
    deleteNote,
    setSortBy,
    searchBy,
    setPage,
}