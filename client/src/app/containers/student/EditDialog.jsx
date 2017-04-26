import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {connect} from 'react-redux'
import {openDialog,studentDetails} from '../../actions/studentAction.js'
import TextField from 'material-ui/TextField'
class EditDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            open:true
        }
    }
    componentWillMount(){
        console.log(this.props,'------------props received from studentInfo')
        this.props.getStudentData({studentId:this.props.studentId})
    }
    componentWillReceiveProps(props){
        this.props=props
    }
    handleClose = ()=>{
        this.props.dialogValue(false)
    }
    showEditDetails = ()=>{
        let studentData = this.props.studentInfo
        Object.keys(studentData).forEach((data)=>{
            console.log(data,'------->',studentData[data])
        })
    }
    render(){
        this.showEditDetails()
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
        const HANDLE_CODES={

        }
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
                               id={index}
                               floatingLabel={index}
                               defaultValue={this.props.studentInfo[index]}
                               onChange = {this.handleChange}
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
        studentInfo:state.studentReducer.studentData,
        showDialog: state.studentReducer.dialogOpen
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        dialogValue: (show)=>{
            dispatch(openDialog(show))
        },
        getStudentData:(data)=>{
            console.log('-----------action called on edit----------')
            dispatch(studentDetails(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditDialog)