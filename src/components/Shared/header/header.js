import React, { Component } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import WorldBankLogo from '../../../assets/World_Bank_Group_logo.svg';
import './header.css';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { activeElem: "shortlist-automation" };
  }

  componentDidMount(){
    if(localStorage.getItem("activeElem")!==null){
      this.setState({activeElem:localStorage.getItem("activeElem")})
    }
  }
  changeActiveElem = (activeElem) => {
    localStorage.setItem("activeElem",activeElem);
    this.setState({ activeElem: activeElem });
    if(activeElem==="talent-pool"){
      this.props.navigate("/create-vacancy")
    }
    if(activeElem==="shortlist-automation"){
      this.props.navigate("/dashboard");
    }
  }

  render() {

    // console.log(this.state.activeElem);

    return (
      <div className="header-wrapper row">
        <div className="col-lg-2">
          <img src={WorldBankLogo} className="p-3" alt="" />
        </div>
        <div className="col-lg-6">
          <ul className="header-tabs-bar h-100">
            <li className={this.state.activeElem === 'shortlist-automation' ? 'tab-item my-auto mx-3 active' : 'tab-item my-auto mx-3'} onClick={() => this.changeActiveElem('shortlist-automation')}>Shortlist Automation</li>
            <li className={this.state.activeElem === 'talent-pool' ? 'tab-item my-auto mx-3 active' : 'tab-item my-auto mx-3'} onClick={() => this.changeActiveElem('talent-pool')}>Talent Pool</li>
          </ul>
        </div>
      </div >
    );
  }
}
function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return <Header {...props} navigate={navigate} location={location} />
}

export default WithNavigate;
