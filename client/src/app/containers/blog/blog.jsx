import {Link} from 'react-router';
import React from 'react';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";
import {openModal,getPosts,getStats,setPost,deletePost,setShowEdit,searchPost,setSnackbarOpen,setCurrentLike,setLikes,getMorePosts} from "../../actions/blogActions.js";
import AddPost from "./addPost.jsx"
import EditPost from "./editPost.jsx"
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
import Dialog from 'material-ui/Dialog';
import {blue300, indigo900} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
let loginStyle = require('./../../css/login.css');

class Blog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open : false,
            pageNumber :1
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    /*handler for checkbox*/
    handleCheck=(post,event,checked)=> {
        let likes = post.likes
        console.log(post)
        if(checked===false){
            let data = {
                liked : false ,
                likes : likes-1,
                post : post
            }
            this.props.setCurrentLike(data)
            let data1 = {
                post : post,
                liked : false ,
                user_id : this.props.blogReducer.userId
            }
            this.props.setLikes(data1)
        }
        else{
            let data = {
                liked : true ,
                likes : likes+1,
                post:post
            }
            this.props.setCurrentLike(data)
            let data1 = {
                post :post ,
                liked :true ,
                user_id : this.props.blogReducer.userId
            }
            this.props.setLikes(data1)
        }

    }
    /*infinite scrolling implementation*/
    handleScroll() {

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        console.log(windowBottom)
        console.log(docHeight)
        if (windowBottom >= docHeight) {
            if(this.props.blogReducer.isScrollActive){
                let pg= this.state.pageNumber
                pg = pg +1
                this.setState({
                    pageNumber:pg
                })
                this.props.getMorePosts({pageNumber:pg})
            }
            else {
                //do nothing
            }
        } else {
            // do nothing
        }
    }
    componentWillMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.props.getPosts({
            pageNumber : this.state.pageNumber,
            user_id : 1
        })
        this.props.getStats({
            id : 1
        })
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    componentWillReceiveProps(props){
        this.props= props
    }
    /*open up the user profile */
    handleTouchTap() {
        alert('You clicked the Chip.');
    }
    openModal(event,data){
        this.props.openModal(data)
    }
    /*delete a post*/
    deletePost = (data) =>{
        console.log(data)
        this.setState({open: true})
        this.props.setPost(data)
    }
    /*edit a post*/
    editPost = (data)=>{
        console.log(data)
        this.props.setShowEdit(true)
        this.props.setPost(data)

    }
    /*handler for dialog close*/
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
    /*handler for search after enter*/
    handleKeyPress = (e)=>{
        if(e.key==='Enter'){
            console.log("Haye",e.target.value)
            this.props.searchPost({
                heading : e.target.value
            })
        }
    }
    /*snackbar close*/
    handleRequestClose = () => {
        this.props.setSnackbarOpen(false);
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
                <TextField
                    className = 'searchBox'
                    hintText="Search"
                    onKeyPress={this.handleKeyPress}
                /><br />
                <div className="leftContent">
                    <FloatingActionButton className="addPost" onClick={this.openModal.bind(this ,true)}>
                        <ContentAdd />
                    </FloatingActionButton>
                    <AddPost/>
                    {this.props.blogReducer.showEdit?<EditPost/>:null}
                    <br/><br/>
                    {
                        this.props.blogReducer.posts.map((data,index)=>{
                            var url = '/blog/post/'+data.id
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
                                    <img className="image" src={data.image} alt="Image" height="auto" width={600}/>
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
                                                checked={data.liked}
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
                <Snackbar
                    open={this.props.blogReducer.snackbarOpen}
                    message={this.props.blogReducer.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

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
        getPosts:(data)=>{
            dispatch(getPosts(data))
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
        },
        searchPost:(data)=>{
            dispatch(searchPost(data))
        },
        setSnackbarOpen:(data)=>{
            dispatch(setSnackbarOpen(data))
        },
        setLikes:(data)=>{
            dispatch(setLikes(data));
        },
        setCurrentLike:(data)=>{
            dispatch(setCurrentLike(data))
        },
        getMorePosts:(data)=>{
            dispatch(getMorePosts(data))
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Blog);
