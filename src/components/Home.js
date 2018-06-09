import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, setSelectedUser, updateCandidatesList } from '../actions/userActions';
class Home extends Component {

  constructor(props) {
    super(props);
    this.timer;
    this.scrollIndex = 0;
    this.lastScrollPostion= 0;
    this.state = {
      currIndex : 0,
      userFetchNeeded: true
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('Props changes');
  }
  componentDidMount() {
    console.log('userFetchNeeded' , this.state.userFetchNeeded)
    this.props.fetchUsers(this.state.userFetchNeeded);
    this.setState({
      userFetchNeeded: false
    })
  }
  scrollChange(e) {
    //console.log('scroll Change : ', e, e.target.scrollTop);
    e.persist();
    console.log('scroll Change : ', e.target.scrollTop, this.lastScrollPostion);
    clearTimeout(this.timer);
    if( e.target.scrollTop > this.lastScrollPostion) {
      this.scrollIndex++;
    } else {
      this.scrollIndex--;
    }
    this.timer = setTimeout(() => {
      console.log('Scroll stopped',  this.scrollIndex, e.target.scrollTop);
      this.lastScrollPostion = e.target.scrollTop;
      if(e.target) {
        this.setState({
          currIndex:this.scrollIndex// e.target.scrollTop
        });
      }
    }, 1000)
  }

  render() {
    console.log('list', this.props.candiatesList);
    const userCount = this.props.candiatesList.length;
    const selectedCandidatesCount = this.props.candiatesList.filter(d=> d.isSelected).length;
    let showingCandidates =[];
    showingCandidates = userCount > 0 ? [].concat(showingCandidates, this.props.candiatesList.slice(0, this.state.currIndex +10)) : [];
    console.log(showingCandidates);
    const userRecs = showingCandidates.map( candidate => (
            <div className="row" key={candidate.id}>
              <ul>
                <li>{ candidate.id }</li>
                <li>{ candidate.name }</li>
                <li>{ candidate.email }</li>
                <li><button onClick={ e=> {
                  this.props.setSelectedUser(candidate.id);
                  //this.props.fetchUsers(this.state.userFetchNeeded);
                }}>
                  {candidate.isSelected ? 'Un Select' : 'Select'}</button>
                </li>
              </ul>
            </div>
          ));
    const updateAction = (
      <div className="footer">
        <button onClick={ e=> {
            this.props.updateCandidatesList(this.props.candiatesList);
            this.setState({
              userFetchNeeded: true
            })
        }}>Update All</button>
      </div>
    );
    return (
      <div>
        <h2>Candidates List</h2>
        No. of users : {userCount} | No. if Selected candidates : { selectedCandidatesCount }
        <div className="grid">
          <div className="header">
            <ul>
              <li>ID</li>
              <li>Name</li>
              <li>Email</li>
              <li>Selected</li>
            </ul>
          </div>
          <div ref="gridBody" className="body" onScroll={ this.scrollChange.bind(this)}>
          { userCount == 0 ? 'No records found!' : null }
          {  userRecs }
          </div>
          {updateAction}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  candiatesList: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  candiatesList: state.users.candidates,
  isUpdate:state.users.isUpdate,
  userFetchNeeded: state.userFetchNeeded
})

export default connect(mapStateToProps, {fetchUsers, setSelectedUser, updateCandidatesList})(Home);
