import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers,fetchSelectedUsers, setSelectedUser,removeUserSelection, updateCandidatesList } from '../actions/userActions';


class Shortlisted extends Component {

    constructor(props) {
      super(props);

      this.state = {
        userFetchNeeded : true
      }
    }
    componentWillMount() {
      if(this.state.userFetchNeeded) {
        this.props.fetchUsers(this.state.userFetchNeeded);
        this.setState({
          userFetchNeeded: false
        });
      }
      this.props.fetchSelectedUsers();
    }
   render() {
     const showingCandidates = this.props.candiatesList.slice(0,10);
     const userCount = this.props.candiatesList.length;
     const userRecs = showingCandidates.map( candidate => (
             <div className="row" key={candidate.id}>
               <ul>
                 <li>{ candidate.id }</li>
                 <li>{ candidate.name }</li>
                 <li>{ candidate.email }</li>
                 <li><button onClick={ e=> {
                   this.props.removeUserSelection(candidate.id);
                 }}>
                   Remove</button>
                 </li>
               </ul>
             </div>
           ));
      return (
         <div>
            <h2>Shortlisted</h2>
            <div className="grid">
              <div className="header">
                <ul>
                  <li>ID</li>
                  <li>Name</li>
                  <li>Email</li>
                  <li>Selected</li>
                </ul>
              </div>
              <div className="body">
              { userCount == 0 ? 'No records found!' : null }
              { userRecs }
              </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => ({
  candiatesList: state.users.selectedCandidates,
  isUpdate:state.users.isUpdate,
  userFetchNeeded: state.userFetchNeeded
})

export default connect(mapStateToProps, {fetchUsers,fetchSelectedUsers, removeUserSelection})(Shortlisted);
