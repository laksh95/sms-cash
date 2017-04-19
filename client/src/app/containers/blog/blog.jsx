import {Link} from 'react-router';
import React from 'react';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";
import {openModal,getPosts,getStats,setPost,deletePost,setShowEdit} from "./../../actions/blogActions.jsx";
import AddPost from "./addPost.jsx"
import EditPost from "./editPost.jsx"
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
let loginStyle = require('./../../css/login.css');
import Dialog from 'material-ui/Dialog';

import {blue300, indigo900} from 'material-ui/styles/colors';
class Blog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open : false
        }
    }
    componentWillMount() {
        this.props.getPosts()
        this.props.getStats({
            id : 1
        })
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
    deletePost = (data) =>{
        console.log(data)
        this.setState({open: true})
        this.props.setPost(data)
    }
    editPost = (data)=>{
        console.log(data)
        this.props.setShowEdit(true)
        this.props.setPost(data)

    }
    handleClose = (type) => {
        console.log(type)
        switch(type){
            case "CANCEL":
                this.setState({open: false});
                break
            case "DELETE":
                this.props.deletePost(this.props.blogReducer.post)
                this.setState({open:false});
                break
        }
    };
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"CANCEL")}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"DELETE")}
            />,
        ];
        const styles = {
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
                    {this.props.blogReducer.showEdit?<EditPost/>:null}
                    <br/><br/>
                    {
                        this.props.blogReducer.posts.map((data,index)=>{
                            var url = '/post/'+data.id
                            return(
                                <Paper className="card" zDepth={2} >
                                    <div>
                                        <Chip
                                            onTouchTap={this.handleTouchTap}
                                            className="cardChip"
                                        >
                                            <Avatar src="https://cdn-images-1.medium.com/fit/c/32/32/1*owmCbcxxEOLbfF_XGDjxnQ.jpeg" />
                                            {data.user_name}
                                        </Chip>
                                        {/*<label className="font">Posted At {data.created_at}</label><br/>*/}
                                    </div>
                                    <h5 className="cardHeader">{data.heading}</h5>
                                    <img className="image" src="https://cdn-images-1.medium.com/max/1260/1*3lZYFSUsa1S-l8X5HjTvfg.jpeg" alt="Image" height={250} width={600}/>
                                    <Link to={url}><h6 className="readMore">Read More</h6></Link>
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
                                            <i onClick={()=>this.editPost(data)} className="material-icons right" >mode_edit</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <i  onClick={()=>this.deletePost(data)} className="material-icons right">delete</i>&nbsp;&nbsp;&nbsp;&nbsp;
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
                            <Avatar color={blue300} backgroundColor={indigo900} size={32}>{this.props.blogReducer.stats.totalPosts}</Avatar>
                            Total Number of posts
                        </Chip><br/><br/>
                        <Chip >
                            <Avatar color={blue300} backgroundColor={indigo900} size={32}>{this.props.blogReducer.stats.totalLikes}</Avatar>
                            Total Posts Liked
                        </Chip><br/><br/>
                        <Chip >
                            <Avatar color={blue300} backgroundColor={indigo900} size={32}>{this.props.blogReducer.stats.totalComments}</Avatar>
                            Total Comments Posted
                        </Chip><br/><br/>
                        <Chip >
                            <Avatar color={blue300} backgroundColor={indigo900} size={32}>23</Avatar>
                            Total Rating
                        </Chip>
                    </div>
                </div>
                <Dialog
                    title="Delete Post"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    Are you sure you want to delete ?
                </Dialog>
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
        },
        getStats:(data)=>{
            dispatch(getStats(data))
        },
        setPost:(data)=>{
            dispatch(setPost(data))
        },
        deletePost : (data)=>{
            dispatch(deletePost(data))
        },
        setShowEdit:(data)=>{
            dispatch(setShowEdit(data))
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Blog);