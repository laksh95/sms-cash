import {Link} from 'react-router';
import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";
import {openModal,getPosts} from "./../../actions/blogActions.jsx";
import AddPost from "./addPost.jsx"
import Auth from './../../Auth.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
let loginStyle = require('./../../css/login.css');
class Blog extends React.Component {
    componentWillMount() {
        this.props.getPosts()
    }
    componentDidMount() {
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    componentDidUpdate(prevProps, prevState) {
    }
    handleTouchTap() {
        alert('You clicked the Chip.');
    }
    openModal(event,data){
        console.log("---------",data)
        this.props.openModal(data)
    }
    handleCheck=(event,checked, data)=> {
        console.log(event)
        console.log(checked)
        console.log(data)
    }
    render(){

        const styles = {
            chip: {
                marginLeft: 290,
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
                <div className="leftContent">
                    <FloatingActionButton className="addPost" onClick={this.openModal.bind(this ,true)}>
                        <ContentAdd />
                    </FloatingActionButton>
                    <AddPost/>
                    <br/><br/>
                    {
                        this.props.blogReducer.posts.map((data,index)=>{
                            return(
                                <Paper className="card" zDepth={2} >
                                    <div>
                                        <Chip
                                            onTouchTap={this.handleTouchTap}
                                            style={styles.chip}
                                        >
                                            <Avatar src="https://cdn-images-1.medium.com/fit/c/32/32/1*owmCbcxxEOLbfF_XGDjxnQ.jpeg" />
                                            {data.user_name}
                                        </Chip>
                                        {/*<label className="font">Posted At {data.created_at}</label><br/>*/}
                                    </div>
                                    <h5 className="cardHeader">{data.heading}</h5>
                                    <img src="https://cdn-images-1.medium.com/max/900/1*-8-mWUXKqq6Fk3AfxGpA7w.jpeg" alt="Image" height={200} width={700}/>
                                    <Link to="/post/1"><h6 className="readMore">Read More</h6></Link>
                                    <div className="footer">
                                        <div className="checkbox">
                                            <Checkbox
                                                checkedIcon={<ActionFavorite />}
                                                uncheckedIcon={<ActionFavoriteBorder />}
                                                label={data.likes}
                                                className="left"
                                                style={{...styles.checkbox,...styles.block}}
                                                onCheck={this.handleCheck.bind(this,data)}
                                            />
                                        </div>

                                        <i className="material-icons left">comment</i><label className="left">{data.comments} responses</label>
                                        <div className="editDelete">
                                            <i className="material-icons right" >mode_edit</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i className="material-icons right">delete</i>&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                    </div>
                                </Paper>
                            )
                        })
                    }
                </div>
                <div className="rightContent">
                    <label>Statistics about your posts</label><br/><br/>
                    <div className="center">
                        <Chip >
                            <Avatar size={32}>10</Avatar>
                            Total Number of posts
                        </Chip><br/><br/>
                        <Chip >
                            <Avatar size={32}>5</Avatar>
                            Total Posts Liked
                        </Chip><br/><br/>
                        <Chip >
                            <Avatar size={32}>9</Avatar>
                            Total Comments Posted
                        </Chip><br/><br/>
                        <Chip >
                            <Avatar size={32}>23</Avatar>
                            Total Rating
                        </Chip>
                    </div>
                </div>
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
        login: state.login,
        blogReducer : state.blogReducer
    };
};
const mapDispatchToProps= (dispatch) => {
    return{
        loginUser: (credential) =>{
            dispatch(loginUser(credential))
        },
        checkLogin: () =>{
            dispatch(checkLogin())
        },
        openModal :(data) =>{
            dispatch(openModal(data))
        },
        getPosts:()=>{
            dispatch(getPosts())
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Blog);