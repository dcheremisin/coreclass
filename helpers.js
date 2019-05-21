function renderNotes(params) {
    const {
        db=[],
        sortBy = 'id',
        tablePage = 1,
        search=''
    } = params;
    if (db.length === 0) {return {tableValues: [], listLength: 0, searchVal: search,
        countPage: 0, sortBy, activePage: 1}}
    const pageRang = 5;
    let newList = db;
    if (search !== '') {
        newList = newList.filter(item => {
            return item.name.includes(search) || item.value.includes(search);
        });
    }
    newList = newList.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
        return 0;
    });

    let countPage = Number(Math.ceil(newList.length / pageRang));
    let activePage = tablePage;
    if (activePage > countPage) {
        activePage = countPage;
    }
    newList = newList.slice((pageRang * (activePage - 1)), (pageRang * (activePage - 1) + pageRang));
    return {tableValues: newList, countPage, searchVal: search, sortBy, activePage: Number(activePage)};
}

module.exports = {
    renderNotes,
};
