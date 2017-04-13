import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";
import {getPost} from "./../../actions/blogActions.jsx";
import Auth from './../../Auth.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import TextField from 'material-ui/TextField';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconButton from 'material-ui/IconButton';

import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';

let loginStyle = require('./../../css/login.css');
class Post extends React.Component {
    componentWillMount() {
        this.props.getPost({
            id : 1
        })
    }
    componentDidMount() {
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidUpdate(prevProps, prevState) {
         // if(this.props.login.isLogin){
         //     browserHistory.push(this.props.login.prevPathName);
         //     Auth.authenticateUser(this.props.login.token);
         // }
    }
    showComments(){

    }
    handleTouchTap() {
        alert('You clicked the Chip.');
    }
    render(){
        const styles = {
            chip: {
                marginLeft: 342,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            block: {
                maxWidth: 50,
            },
            checkbox: {
                marginBottom: 16,
            },
        };
        return (
            <div className={loginStyle.mymain}>
                <div className="post">
                    <div className="postHeader">
                        <List>
                            <ListItem
                                disabled={true}
                                leftAvatar={
                                    <Avatar src="https://cdn-images-1.medium.com/fit/c/54/54/0*WgY9B-Lm4DnCEHlO.jpeg" />
                                }
                            >
                                {this.props.blogReducer.post.by}
                            </ListItem>
                        </List>
                    </div>
                    <div className="postHeader">
                        {this.props.blogReducer.post.content}
                    </div>
                    <div className="postContent">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, magni molestiae obcaecati quibusdam quisquam quod ut voluptates. Aliquam numquam, ratione. Deserunt eaque ex inventore itaque minima optio sapiente, sed tempora.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda error id molestiae nihil quasi voluptatum? Aliquam atque autem dolore eos esse fugit incidunt inventore maiores mollitia nobis omnis, quos, ut.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, assumenda consectetur cumque eaque eligendi enim fugiat id in incidunt iste laborum molestiae, natus obcaecati omnis quisquam vel velit voluptatum?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi assumenda at dolores dolorum eligendi explicabo id iste nisi obcaecati, odit, provident qui quis quos rem repellat tempora ullam velit.
                        </p>

                    </div>
                    <div className="postFooter">
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            label="30"
                            className="left"
                            style={{...styles.checkbox,...styles.block}}
                        />
                        <br/><br/>
                        <div className="addComment">
                            <label className="headerFont">Responses</label>
                            <br/>
                            <TextField
                                hintText=""
                                floatingLabelText="Write your comment"
                                multiLine={true}
                                rows={3}
                            /><br /><br/>
                            <RaisedButton label="Post Comment" primary={true}/><br/><br/>
                        </div>
                        <div className="postComments">
                            <RaisedButton label="Show All responses" fullWidth={true} /><br/><br/>
                            {this.props.blogReducer.comments.map((data,index)=>{
                                return(
                                    <Card className="marginBottom">
                                    <CardHeader
                                        title="Yash Sharma"
                                        subtitle=""
                                        avatar="https://cdn-images-1.medium.com/fit/c/54/54/0*WgY9B-Lm4DnCEHlO.jpeg"
                                        actAsExpander={true}
                                        showExpandableButton={true}
                                    />
                                    {/*<CardActions>*/}
                                    {/*<FlatButton label="Action1" />*/}
                                    {/*<FlatButton label="Action2" />*/}
                                    {/*</CardActions>*/}
                                    <CardText className = 'commentFont'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                    </CardText>
                                </Card>
                                )

                            })}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Post.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
Post.contextTypes = {
    router: React.PropTypes.object.isRequired
};
const mapStateToProps= (state) => {
    return{
        login: state.login,
        blogReducer : state.blogReducer
    };
};
const mapDispatchToProps= (dispatch) => {
    return{
        loginUser: (credential) =>{
            dispatch(loginUser(credential));
        },
        checkLogin: () =>{
            dispatch(checkLogin());
        },
        getPost :(data) =>{
            dispatch(getPost(data));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Post);

