import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";
import Auth from './../../Auth.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
let loginStyle = require('./../../css/login.css');
class Blog extends React.Component {
    componentWillMount() {
    }
    componentDidMount() {
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.login.isLogin){
            browserHistory.push(this.props.login.prevPathName);
            Auth.authenticateUser(this.props.login.token);
        }
    }
    render(){
        return (
            <div className={loginStyle.mymain} >
                <RaisedButton label="Add your Post" primary={true}/>
                <Card>
                    <CardHeader
                        title="BLOG HEADING"
                        subtitle="By Yash Sharma"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    {/*<CardActions>*/}
                        {/*<FlatButton label="Likes" />*/}
                        {/*<FlatButton label="Comments" />*/}
                    {/*</CardActions>*/}
                    <CardText expandable={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        <br/>
                        {0}<FlatButton label="Likes" />
                        <FlatButton label="Comments" />
                    </CardText>
                </Card>
            </div>
        );
    }
}
Blog.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
Blog.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps= (state) => {
    return{
        login: state.login
    };
};
const mapDispatchToProps= (dispatch) => {
    return{
        loginUser: (credential) =>{
            dispatch(loginUser(credential));
        },
        checkLogin: () =>{
            dispatch(checkLogin());
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Blog);

