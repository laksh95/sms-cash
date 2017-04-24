import React from 'react';
import {connect} from "react-redux";
import {loginUser, checkLogin} from "./../../actions/loginActions";

import {getPost,addComment,editComment,deleteComment,setLikes,setCurrentLike} from "./../../actions/blogActions.js";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import TextField from 'material-ui/TextField';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Snackbar from 'material-ui/Snackbar';
import LazyLoad from 'react-lazyload';
let loginStyle = require('./../../css/login.css');
class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            errorText :"",
            value : "",
            open : false,
            showEdit : false,
            showDelete : false ,
            comment : {},
            editComment: "",
            validateEditComment : true,
            showComments : false,
            likes: 0
        }
        this.handleChange= this.handleChange.bind(this)
    }
    componentWillMount() {
        this.props.getPost({
            id : this.props.params.postid,
            user_id : this.props.blogReducer.userId
        })
    }
    componentWillReceiveProps(props){
        this.props= props
    }
    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    // handleTouchTap() {
    //     alert('You clicked the Chip.');
    // }
    handleChange(type,event) {
        switch(type){
            case "COMMENT":
                this.setState({value: event.target.value});
                break
            case "EDIT_COMMENT":
                this.setState({editComment:event.target.value})
                if(event.target.value.trim()!=""){
                    this.setState({validateEditComment: true })
                }
                else {
                    this.setState({validateEditComment: false })
                }
                break
            default : break
        }
    }
    postComment(){
        let comment = this.state.value
        if(comment.trim()==''){
            this.setState({
                errorText : "Comment can't be empty"
            })
        }
        else{
            this.props.addComment({
                content : this.state.value ,
                post_id : this.props.blogReducer.post.id,
                comment_by : 1
            })
            this.setState({
                open: true,
                value : "",
                errorText : ""
            });
        }
    }
    handleClose = (type) => {
        // to be changed
        switch(type){
            case "SUBMIT_EDIT":
                this.setState({showEdit: false});
                var comment = this.state.comment
                comment.content = this.state.editComment
                this.props.editComment(comment)
                break
            case "CANCEL_EDIT":
                this.setState({showEdit:false});
                break
            case "SUBMIT_DELETE":
                this.setState({showDelete : false });
                var comment = this.state.comment
                this.props.deleteComment(comment)
                break
            case "CANCEL_DELETE":
                this.setState({showDelete:false});
                break
            default:break
        }

    };
    editComment(data){
        this.setState({showEdit: true});
        this.setState({
            comment: data
        })
    }
    deleteComment(data){
        this.setState({showDelete:true})
        this.setState({comment:data})
    }
    handleCheck=(event,checked)=> {
        let likes = this.props.blogReducer.post.likes
        console.log(checked)
        if(checked===false){
            let data = {
                liked : false ,
                likes : likes-1
            }
            this.props.setCurrentLike(data)
            let data1 = {
                post : this.props.blogReducer.post,
                liked : false ,
                user_id : this.props.blogReducer.userId
            }

            this.props.setLikes(data1)
        }
        else{
            let data = {
                liked : true ,
                likes : likes+1
            }
            this.props.setCurrentLike(data)
            let data1 = {
                post :this.props.blogReducer.post ,
                liked :true ,
                user_id : this.props.blogReducer.userId
            }
            this.props.setLikes(data1)

        }

        // if(checked==true) {
        //     let data = {
        //         post : this.props.blogReducer.post,
        //         likes : likes+1
        //     }
        //     this.props.setLikes(data)
        // }
        // else {
        //     let data = {
        //         post : this.props.blogReducer.post,
        //         likes : likes-1
        //     }
        //     this.props.setLikes(data)
        // }
    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"CANCEL_EDIT")}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={!(this.state.validateEditComment)}
                onTouchTap={this.handleClose.bind(this,"SUBMIT_EDIT","SUBMIT")}
            />,
        ];
        const deleteActions = [
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"CANCEL_DELETE")}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onTouchTap={this.handleClose.bind(this,"SUBMIT_DELETE")}
            />,
        ];
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
                                {this.props.blogReducer.post.user_name}
                            </ListItem>
                        </List>
                    </div>
                    <div className="postHeader">
                        {this.props.blogReducer.post.heading}
                        {/*Cracking the Coding Interview*/}
                    </div>
                    <div className="postImage">
                        <img src="https://cdn-images-1.medium.com/max/1260/1*3lZYFSUsa1S-l8X5HjTvfg.jpeg" width={700} alt=""/>
                    </div>
                    <div className="postContent">
                        <p>
                            {/*{this.props.blogReducer.post.content}*/}
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                    <div className="postFooter">
                        <Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            label={this.props.blogReducer.post.likes}
                            className="left"
                            onCheck={this.handleCheck.bind(this)}
                            style={{...styles.checkbox,...styles.block}}
                            checked={this.props.blogReducer.post.liked}
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
                                value={this.state.value}
                                onChange={this.handleChange.bind(this,"COMMENT")}
                                errorText={this.state.errorText}
                            /><br /><br/>
                            <RaisedButton label="Post Comment" onClick={()=>this.postComment()} primary={true}/><br/><br/>
                        </div>
                        <div className="postComments">
                            <RaisedButton label="Show All responses" onClick={()=>{
                                this.setState({showComments:true})
                            }} fullWidth={true} /><br/><br/>
                            {this.state.showComments?
                                this.props.blogReducer.comments.map((data,index)=>{
                                    return(
                                    <LazyLoad height={200} offset={100}>
                                        <Card className="marginBottom">
                                            <CardHeader
                                                title={data.user_name}
                                                subtitle=""
                                                avatar="https://cdn-images-1.medium.com/fit/c/54/54/0*WgY9B-Lm4DnCEHlO.jpeg"
                                                actAsExpander={true}
                                                showExpandableButton={true}
                                            />
                                            <CardText className = 'commentFont'>
                                                {data.content}
                                            </CardText>
                                            {this.props.blogReducer.username==data.user_name?
                                                <CardActions>
                                                    <FlatButton onClick = {()=>this.editComment(data)} label="Edit" />
                                                    <FlatButton onClick = {()=>this.deleteComment(data)} label="Delete" />
                                                </CardActions>
                                                :null}
                                        </Card>
                                    </LazyLoad>
                                    )
                                })
                                : null}
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={this.state.open}
                    message="Comment Added"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={true}
                    open={this.state.showEdit}
                >
                    <TextField
                        id="text-field-default"
                        defaultValue={this.state.comment.content}
                        onChange={this.handleChange.bind(this,"EDIT_COMMENT")}
                    /><br />
                </Dialog>
                <Dialog
                    title="Delete your comment"
                    actions={deleteActions}
                    modal={true}
                    open={this.state.showDelete}
                >
                </Dialog>
            </div>
        );
    }
}

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
        },
        addComment:(data)=>{
            dispatch(addComment(data));
        },
        editComment:(data)=>{
            dispatch(editComment(data));
        },
        deleteComment:(data)=>{
            dispatch(deleteComment(data));
        },
        setLikes:(data)=>{
            dispatch(setLikes(data));
        },
        setCurrentLike:(data)=>{
            dispatch(setCurrentLike(data))
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Post);
