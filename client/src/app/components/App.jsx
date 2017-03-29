import React from 'react';
import SideBarMenu from './SideBarMenu.jsx';
import TopBar from './TopBar.jsx'; 

var style = {

   "MainContentStyle":{
       marginLeft: 70 ,
       transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' 
   },

   "ContentTitle":{
       marginTop:10, 
       marginLeft: 70,
       transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' 
   }
}




export default class App extends React.Component {

    constructor(props){
        super(props);
       
        this.state = {
          open: true,        
        };
    }
   
    handleToggle = () => { 
      this.setState({open: !this.state.open});
    }

   render(){

    if (this.state.open) {
      style.MainContentStyle.marginLeft = 230;
      style.ContentTitle.marginLeft =  250;
    }else{
      style.MainContentStyle.marginLeft = 70;
      style.ContentTitle.marginLeft =  70;

    }
    return(       
      <div className = "mymain">         
     
        <div style={style.MainContentStyle}>
            <TopBar handleToggle = {this.handleToggle} open = {this.state.open}/>
       </div>
     
        <SideBarMenu handleToggle = {this.handleToggle} open = {this.state.open} />   
      
        <div style={style.ContentTitle}>
               
               <h1>Student Management system</h1>
               {this.props.children}  
        
        </div>
     
     </div>
    );         
  }
}

