import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

function* callGetNotes() {
    try {
        const { data: notes } =  yield call(axios, { method: 'get', url: `/notes`});
        yield put({type: "RENDER_NOTES_SUCCESS", notes});
    } catch (e) {
        console.log('err');
    }
}

function* callAddNote({name, value,  search, sortBy, tablePage}) {
    try {
        let data = {name, value, search, sortBy, tablePage };
        const { data: notes } =  yield call(axios, { method: 'post', url: `/note`, params: data });
        yield put({type: "RENDER_NOTES_SUCCESS", notes});
    } catch (e) {
        console.log('err');
    }
}

function* callDeleteNote({id, search, sortBy, tablePage}) {
    try {
        const data = {id, search, sortBy, tablePage};
        const { data: notes } =  yield call(axios, { method: 'delete', url: `/note`, params: data });
        yield put({type: "RENDER_NOTES_SUCCESS", notes});
    } catch (e) {
        console.log('err');
    }
}

function* callSortBy({search, sortBy, tablePage}) {
    try {
        const data = {search, sortBy, tablePage};
        const { data: notes } =  yield call(axios, { method: 'get', url: `/notes/sort`, params: data });
        yield put({type: "RENDER_NOTES_SUCCESS", notes});
    } catch (e) {
        console.log('err');
    }
}

function* callSetSearchVal({search, sortBy, tablePage}) {
    try {
        const data = {search, sortBy, tablePage};
        const { data: notes } =  yield call(axios, { method: 'get', url: `/notes/search`, params: data });
        yield put({type: "RENDER_NOTES_SUCCESS", notes});
    } catch (e) {
        console.log('err');
    }
}

function* callSetPage({search, sortBy, tablePage}) {
    try {
        const data = {search, sortBy, tablePage};
        const { data: notes } =  yield call(axios, { method: 'get', url: `/notes/page`, params: data });
        yield put({type: "RENDER_NOTES_SUCCESS", notes});
    } catch (e) {
        console.log('err');
    }
}

export default function* notesSaga() {
    yield takeLatest("GET_NOTES", callGetNotes);
    yield takeLatest("ADD_NOTE", callAddNote);
    yield takeLatest("DELETE_NOTE", callDeleteNote);
    yield takeLatest("SET_SORT", callSortBy);
    yield takeLatest("SET_SEARCH_VAL", callSetSearchVal);
    yield takeLatest("SET_PAGE", callSetPage);
}