import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {connect} from 'react-redux'
import {openDialog} from '../../actions/studentAction.js'
import TextField from 'material-ui/TextField'
class EditDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            open:true
        }
    }
    componentWillReceiveProps(props){
        this.props=props
    }
    handleClose = ()=>{
        this.props.dialogValue(false)
    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ]
        return(
            <div>
                <Dialog
                    title={'Edit Student Information'}
                    actions={actions}
                    modal={false}
                    open={this.props.showDialog}
                    onRequestClose={this.handleClose}
                >{
                    Object.keys(this.props.studentInfo).forEach((index)=>{
                        console.log(this.props.studentInfo[index])
                       return(
                           <div> <TextField
                               floatingLabel={index}
                               defaultValue={this.props.studentInfo[index]}
                           /></div>
                       )
                    })
                }
                </Dialog>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        studentInfo:state.studentReducer.studentData.data,
        showDialog: state.studentReducer.dialogOpen
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        dialogValue: (show)=>{
            dispatch(openDialog(show))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditDialog)