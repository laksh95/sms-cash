import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {connect} from 'react-redux'
import {getInitialData} from '../../actions/studentAction.jsx'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import EditDialog from './EditDialog.jsx'
import {openDialog} from '../../actions/studentAction.jsx'
class StudentInformation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            studentID:0,
            department:0,
            semester:0,
            batch:0,
            action:0,
            openEdit:false,
            openProfile:false,
            openDelete:false
        }
    }
    componentWillMount(){
        this.props.getInitialData({
            courseId:1
        })
    }
    componentWillReceiveProps(props){
        this.props=props
    }
    handleTouchTap = (event)=>{
        event.preventDefault()
        this.setState({
            open:true
        })
    }
    handleRequestChange = ()=>{
        this.setState({
            open:false
        })
    }

    handleChange = (type,event,value)=>{
        console.log(value)
        switch(type){
            case 'department':
                if(value !== 0){
                    this.setState({
                        department:value
                    })
                }
                if(this.state.semester !== 0){
                    this.props.getAllStudents(this.state.department,this.state.semester)
                }
                break
            case 'semester':
                if(value !== 0){
                    this.setState({
                        semester:value
                    })
                }
                if(this.state.department !== 0){
                    this.props.getAllStudents(this.state.department,this.state.semester)
                }
                break
            case 'action':
                if(value!==0){
                    this.setState({action:value})
                }
                if(value === 1){
                    this.setState({openEdit:true})
                }
                else if(value === 2){
                    this.setState({openProfile:true})
                }
                else if(value === 3){
                    this.setState({openDelete:true})
                }
                break
            case 'batch':
                break
        }

    }
    render(){
        const HANDLE_CODES={
            "DEPARTMENT":"department",
            "SEMESTER":"semester",
            "BATCH":"batch",
            "ACTION":"action"
        }
        return(
            <div>
                <div id="studentFilter">
                    <DropDownMenu
                        value={this.state.department}
                        onChange={this.handleChange.bind(this,HANDLE_CODES.DEPARTMENT)}
                    >
                        <MenuItem primaryText="Department" value = {0} />{
                         this.props.filterData.initialData.data.departments.map((data,index)=>{
                             return(
                                 <MenuItem
                                     id={index}
                                     primaryText={data.abbreviatedName}
                                     value={index+1}
                                 />
                             )
                         })
                     }
                    </DropDownMenu>
                    <DropDownMenu
                        value={this.state.semester}
                        onChange={this.handleChange.bind(this,HANDLE_CODES.SEMESTER)}
                    >
                        <MenuItem primaryText="Semester" value={0}/>{
                         this.props.filterData.initialData.data.semesters.map((data,index)=>{
                             return(
                                 <MenuItem
                                     id={index}
                                     primaryText={data.name}
                                     value={index+1}
                                 />
                             )
                         })
                     }
                    </DropDownMenu>
                    <DropDownMenu>
                        <MenuItem primaryText="Batch"/>
                        {/*  this.props.filterData.data.batch.map((data,index)=>{
                             return(
                                 <MenuItem
                                     id={index}
                                     primaryText={data}
                                     value={data}
                                 />
                             )
                             })
                         */}
                    </DropDownMenu>
                </div>
                <div>
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>
                                    Admission No.
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Name
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Department
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Semester
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    Batch
                                </TableHeaderColumn>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            stripedRows={true}
                        >
                            {
                                this.props.studentInfo.data.students.map((data)=>{
                                    return (
                                        <TableRow>
                                            <TableRowColumn>
                                                {data.admissionNo}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {data.name}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {data.deptName}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {data.semester}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {data.batchName}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <FlatButton primary={true} label="EDIT" onTouchTap={()=>{
                                                   this.props.showDialog(true)
                                                }}/>
                                                {this.props.dialogValue?<EditDialog currentStudent={data}/>:null}
                                                <FlatButton secondary={true} label="DELETE" onTouchTap={this.handleDeleteTap} />
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state)=>{
    return {
        allStudents: state.studentReducer,
        filterData: state.studentReducer,
        studentInfo:state.studentReducer.allStudentData,
        dialogValue:state.studentReducer.dialogOpen
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getInitialData: (course)=>{
            dispatch(getInitialData(course))
        },
        getAllStudents: (department,semester)=>{
            dispatch()
        },
        showDialog: (show)=>{
            dispatch(openDialog(show))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(StudentInformation)
