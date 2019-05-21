import React, {Component} from "react";
import {connect} from 'react-redux';
import actions from './actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            value: '',
        }
    }

    componentDidMount() {
        this.props.getNotes();
    }

    handleChange = (e, type) => {
        let val = e.target.value;
        this.setState({[type]: val});
    };

    addNewNote = () => {
        const {
            addNote,
            searchByVal: search,
            sortBy,
            tablePage,
        } = this.props;
        addNote({
            name: this.state.name,
            value: this.state.value,
            search,
            sortBy,
            tablePage,
        });
        this.setState({name: '', value: ''})
    };

    searchValues = (e) => {
        const {
            searchBy,
            sortBy,
        } = this.props;
        let val = e.target.value;
        searchBy({search: val, sortBy, tablePage: 1});
    };

    renderPagination = () => {
        const {
            listLength,
            tablePage,
            sortBy,
            searchByVal: search,
            setPage
        } = this.props;
        let items = [];
        for (let number = 1; number <= listLength; number++) {
            const buttonClass = `btn btn-primary ${tablePage === number ? 'active' : ''}`;
            items.push(
                <button
                    key={number}
                    type="button"
                    className={buttonClass}
                    onClick={() => setPage({tablePage: number, search, sortBy})}
                >
                    {number}
                </button>
            );
        }
        return items;
    };

    render() {
        const {
            tableValues,
            deleteNote,
            sortBy,
            tablePage,
            setSortBy,
            searchByVal,
            listLength
        } = this.props;
        return (
            <div className="container mx-auto mt-4 p-3 bg-light">
                <div
                    className="header mb-3"
                >
                    CoreClass
                </div>
                <div
                    className="mb-3"
                >
                    <label>
                        Имя
                        <input
                            className="form-control"
                            onChange={(e) => {
                                this.handleChange(e, 'name')
                            }}
                            value={this.state.name}
                        />
                    </label>
                    <br/>
                    <label>
                        Значение
                        <input
                            className="form-control"
                            onChange={(e) => {
                                this.handleChange(e, 'value')
                            }}
                            value={this.state.value}
                        />
                    </label>
                    <br/>
                    <button
                        className="btn btn-primary"
                        onClick={this.addNewNote}>
                        Добавить запись
                    </button>
                </div>
                <div
                    className="row mb-3"
                >
                    <p className="col-3">
                        Сортировка:
                    </p>
                    <select
                        className="form-control col-3"
                        onChange={(e) => setSortBy({
                            sortBy: e.target.value,
                            tablePage,
                            search: searchByVal
                        })}
                    >
                        <option
                            value="id"
                        >
                            Id
                        </option>
                        <option
                            value="name"
                        >
                            Имя
                        </option>
                        <option
                            value="value"
                        >
                            Значение
                        </option>
                    </select>
                </div>
                <div className="row">
                    <p className="col-2">
                        Поиск:
                    </p>
                    <input
                        className="form-control col-4"
                        value={searchByVal}
                        onChange={(e) => this.searchValues(e)}
                    />
                </div>
                <nav aria-label="Page navigation example" className="m-2">
                    {listLength > 0 && (
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            {this.renderPagination()}
                        </div>
                    )}
                </nav>
                <div>
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Value
                            </th>
                            <th>

                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.values(tableValues).map(item => (
                            <tr key={item.id}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.value}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => deleteNote({
                                            id: item.id,
                                            search: searchByVal,
                                            sortBy,
                                            tablePage,
                                        })}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tableValues: state.tableValues,
    tablePage: state.tablePage,
    searchByVal: state.searchByVal,
    listLength: state.listLength,
    sortBy: state.sortBy,
});

const mapDispatchToProps = {
    getNotes: actions.getNotes,
    addNote: actions.addNote,
    deleteNote: actions.deleteNote,
    setSortBy: actions.setSortBy,
    searchBy: actions.searchBy,
    setPage: actions.setPage,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);