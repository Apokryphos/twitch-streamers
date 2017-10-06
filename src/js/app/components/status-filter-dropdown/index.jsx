import React from 'react';
// import PropTypes from 'prop-types';
import StatusFilter from './../../status-filter.js';

const statusFilterText = {
  [StatusFilter.ALL]: 'Show All Streamers',
  [StatusFilter.ONLINE]: 'Show Online Streamers',
  [StatusFilter.OFFLINE]: 'Show Offline Streamers'
};

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

class StatusFilterDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false,
      filterState: StatusFilter.ALL
    };

    this._closeDropdown = this._closeDropdown.bind(this);

    this.showDropdown = this.showDropdown.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggleOffline = this.toggleOffline.bind(this);
    this.toggleOnline = this.toggleOnline.bind(this);

    document.body.addEventListener('click', this._closeDropdown, false);
  }

  _closeDropdown(event) {
    if (getEventTarget(event).id !== 'StatusFilterDropdown') {
      this.setState({ dropdownVisible: false });
    }
  }

  showDropdown(event) {
    this.setState({ dropdownVisible: !this.state.dropdownVisible });
  }

  toggleAll() {
    this.setState({
      filterState: StatusFilter.ALL,
      dropdownVisible: false
    });

    if (this.props.onChangedCallback) {
      this.props.onChangedCallback(StatusFilter.ALL);
    }
  }

  toggleOffline() {
    this.setState({
      filterState: StatusFilter.OFFLINE,
      dropdownVisible: false
    });

    if (this.props.onChangedCallback) {
      this.props.onChangedCallback(StatusFilter.OFFLINE);
    }
  }

  toggleOnline() {
    this.setState({
      filterState: StatusFilter.ONLINE,
      dropdownVisible: false
    });

    if (this.props.onChangedCallback) {
      this.props.onChangedCallback(StatusFilter.ONLINE);
    }
  }

  render() {
    const options = {
      all: {
        filterState: StatusFilter.ALL,
        handler: this.toggleAll,
        text: statusFilterText[StatusFilter.ALL]
      },
      online: {
        filterState: StatusFilter.ONLINE,
        handler: this.toggleOnline,
        text: statusFilterText[StatusFilter.ONLINE]
      },
      offline: {
        filterState: StatusFilter.OFFLINE,
        handler: this.toggleOffline,
        text: statusFilterText[StatusFilter.OFFLINE]
      }
    };

    let activeOption = options.all;
    let option1 = options.online;
    let option2 = options.offline;

    if (this.state.filterState === StatusFilter.ONLINE) {
      activeOption = options.online;
      option1 = options.all;
      option2 = options.offline;
    } else if (this.state.filterState === StatusFilter.OFFLINE) {
      activeOption = options.offline;
      option1 = options.all;
      option2 = options.online;
    }

    const dropdown = (
      <ul
        id="StatusFilterDropdown-dropdown"
        className={this.state.dropdownVisible ? 'visible' : 'hidden'}
      >
        <li onClick={option1.handler}>
          <a>{option1.text}</a>
        </li>
        <li onClick={option2.handler}>
          <a>{option2.text}</a>
        </li>
      </ul>
    );

    const button = (
      <a
        id="StatusFilterDropdown"
        onClick={this.showDropdown}
        href="#!"
        title="Filter by status."
      >
        {activeOption.text}
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

module.exports = StatusFilterDropdown;
