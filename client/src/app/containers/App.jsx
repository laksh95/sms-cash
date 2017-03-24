import React from 'react';
import SideBarMenu from './SideBarMenu.jsx';
import TopBar from './TopBar.jsx';
export default class App extends React.Component {
   constructor(props) {
   super(props);
   this.handleToggle =  this.handleToggle.bind(this);
   this.state = {
        open: true
       };
   }
   componentWillReceiveProps(nextProps){
       this.props=nextProps
   }
   handleToggle(){
       this.setState({open: !this.state.open});
   }
  render(){

      const centerContent = { marginTop:10, marginLeft: 250 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' };
      if (this.props.open) {
          centerContent.marginLeft = 250;
      }
      const contentStyle = {
        marginLeft: 70 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)'
    };

    if (this.state.open) {
      contentStyle.marginLeft = 230;
    }
    return (
      <div className="mymain">
        <div style={contentStyle}>
            <TopBar handleToggle = {this.handleToggle} open = {this.state.open}/>
        </div>
        <SideBarMenu handleToggle = {this.handleToggle} open = {this.state.open}  />
          <div style={centerContent}>
              {this.props.children}
          </div>
      </div>
    );
  }
}
