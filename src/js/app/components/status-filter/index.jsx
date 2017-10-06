import React from 'react';
// import PropTypes from 'prop-types';

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

const StatusFilterState = {
  ALL: {
    text: 'Show All Streamers'
  },
  ONLINE: {
    text: 'Show Online Streamers'
  },
  OFFLINE: {
    text: 'Show Offline Streamers'
  }
};

class StatusFilter extends React.Component {
  constructor() {
    super();

    this.state = {
      dropdownVisible: false,
      filterState: StatusFilterState.ALL
    };

    this._closeDropdown = this._closeDropdown.bind(this);

    this.showDropdown = this.showDropdown.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggleOffline = this.toggleOffline.bind(this);
    this.toggleOnline = this.toggleOnline.bind(this);

    document.body.addEventListener('click', this._closeDropdown, false);
  }

  _closeDropdown(event) {
    if (getEventTarget(event).id !== 'StatusFilter') {
      this.setState({ dropdownVisible: false });
    }
  }

  showDropdown(event) {
    this.setState({ dropdownVisible: !this.state.dropdownVisible });
  }

  toggleAll() {
    this.setState({
      filterState: StatusFilterState.ALL,
      dropdownVisible: false
    });
  }

  toggleOffline() {
    this.setState({
      filterState: StatusFilterState.OFFLINE,
      dropdownVisible: false
    });
  }

  toggleOnline() {
    this.setState({
      filterState: StatusFilterState.ONLINE,
      dropdownVisible: false
    });
  }

  render() {
    const options = {
      all: {
        filterState: StatusFilterState.ALL,
        handler: this.toggleAll
      },
      online: {
        filterState: StatusFilterState.ONLINE,
        handler: this.toggleOnline
      },
      offline: {
        filterState: StatusFilterState.OFFLINE,
        handler: this.toggleOffline
      }
    };

    let activeOption = options.all;
    let option1 = options.online;
    let option2 = options.offline;

    if (this.state.filterState === StatusFilterState.ONLINE) {
      activeOption = options.online;
      option1 = options.all;
      option2 = options.offline;
    } else if (this.state.filterState === StatusFilterState.OFFLINE) {
      activeOption = options.offline;
      option1 = options.all;
      option2 = options.online;
    }

    const dropdown = (
      <ul
        id="StatusFilter-dropdown"
        className={this.state.dropdownVisible ? 'visible' : 'hidden'}
      >
        <li onClick={option1.handler}>
          <a>{option1.filterState.text}</a>
        </li>
        <li onClick={option2.handler}>
          <a>{option2.filterState.text}</a>
        </li>
      </ul>
    );

    const button = (
      <a
        id="StatusFilter"
        onClick={this.showDropdown}
        href="#!"
        title="Filter by status."
      >
        {activeOption.filterState.text}
      </a>
    );

    return (
      <div className="dropdown">
        {button}
        {dropdown}
      </div>
    );
  }
}

// StatusFilter.propTypes = {
//   filter: PropTypes.string,
//   onChangedCallback: PropTypes.func,
// };
//
// StatusFilter.defaultProps = {
//   filter: 'all',
//   onChangedCallback: null,
// };

module.exports = StatusFilter;
