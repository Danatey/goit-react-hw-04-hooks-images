import PropTypes from 'prop-types'; 

import { Component } from 'react'

class Searchbar extends Component {
    static prtpTypes = {
        search: PropTypes.string
    }
    state = {
        search: '',
    }

    handleChange = event => {
    this.setState({ search: event.currentTarget.value });
  };

    handleSubmit = event => {
        event.preventDefault();
        console.log(`Signed up as: ${this.state.search}`);

        // Проп который передается форме для вызова при сабмите
        this.props.onSubmit(this.state.search);
        this.reset();
    };

    reset = () => {
        this.setState({ search: '', });
    }

    render() {
        const { search } = this.state;

        return <header className="Searchbar">
         <form className="SearchForm" onSubmit = {this.handleSubmit}>
             <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
             </button>

             <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={this.handleChange}
            />
        </form>
    </header>
    }
}



export default Searchbar