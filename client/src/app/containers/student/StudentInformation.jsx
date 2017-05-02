import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {connect} from 'react-redux'
import {getInitialData,getFilteredData,deleteStudent,selectStudent} from '../../actions/studentAction.js'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import EditDialog from './EditDialog.jsx'
import {openDialog} from '../../actions/studentAction.js'
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
            openDelete:false,
            editStudent:{}
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
    /**********************************************
    Handles the drop down selects for all 3 filters
    ***********************************************/
    handleChange = (type,event,value)=>{
        switch(type){
            case 'department':
                if(value !== 0){
                    console.log('department------->',value)
                    this.setState({
                        department:value
                    })
                }
                if(this.state.semester !== 0 && this.state.batch !== 0){
                    this.props.getAllStudents(value,this.state.semester,this.state.batch)
                }
                break
            case 'semester':
                if(value !== 0){
                    console.log('Semester---------------->',value)
                    this.setState({
                        semester:value
                    })
                }
                if(this.state.department !== 0 && this.state.batch !== 0){
                    this.props.getAllStudents(this.state.department,value,this.state.batch)
                }
                break
            case 'batch':
                if(value !== 0){
                    console.log('batch---------->',value)
                    this.setState({batch:value})
               }
                if(this.state.department !== 0 && this.state.semester !== 0){
                    this.props.getAllStudents(this.state.department,this.state.semester,value)
                }
                break
        }

    }
     /****************************************
     Populates the Batch filter Drop down list
     ****************************************/
    getBatchList=()=>{
        return this.props.filterData.data?
            (
                this.props.filterData.data.batches.map((data, index) => {
                    return (
                        <MenuItem
                            id={index}
                            primaryText={data.name}
                            value={data.id}
                        />
                    )
                })
            ):null
    }
    /********************************************
     Populates the semester filter Drop down list
     *******************************************/
    getSemesterList=()=>{
        return this.props.filterData.data?
            (this.props.filterData.data.semesters.map((data,index)=>{
                return(
                    <MenuItem
                        id={index}
                        primaryText={data.name}
                        value={data.id}
                    />
                )
            })):null
    }
    /**********************************************
     Populates the department filter Drop down list
     *********************************************/
    getDepartmentList = ()=>{
        return this.props.filterData.data?
             (this.props.filterData.data.departments.map((data,index)=>{
                return(
                    <MenuItem
                        id={index}
                        primaryText={data.abbreviatedName}
                        value={data.id}
                    />
                )
            })):null
    }
    handleEdit = (data)=>{
        let response = {
            data,
            show:true
        }
        this.props.editSelectedStudent(response)
    }
    handleDeleteTap = (content)=>{
        let data = {
            studentId:content.studentId,
            parentId:content.parentId,
            sectionId:content.sectionId,
            username:content.username
        }
        console.log('-----------data-------',data)
        this.props.deleteStudent(data)
    }
    render(){
        const HANDLE_CODES={
            "DEPARTMENT":"department",
            "SEMESTER":"semester",
            "BATCH":"batch",
            "ACTION":"action"
        }
        console.log('-------student info------',this.props.studentInfo.data)
        return(
            <div>
                <div id="studentFilter">
                    <DropDownMenu
                        value={this.state.department}
                        onChange={this.handleChange.bind(this,HANDLE_CODES.DEPARTMENT)}
                    >
                        <MenuItem primaryText="Department" value = {0} />{
                            this.getDepartmentList()
                     }
                    </DropDownMenu>
                    <DropDownMenu
                        value={this.state.semester}
                        onChange={this.handleChange.bind(this,HANDLE_CODES.SEMESTER)}
                    >
                        <MenuItem
                            primaryText="Semester"
                            value={0}
                        />{
                            this.getSemesterList()
                     }
                    </DropDownMenu>
                    <DropDownMenu
                        value={this.state.batch}
                        onChange={this.handleChange.bind(this,HANDLE_CODES.BATCH)}
                    >
                        <MenuItem
                            primaryText="Batch"
                            value={0}
                        />{
                            this.getBatchList()
                        }
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
                        >{
                            this.props.studentInfo.data?
                                (this.props.studentInfo.data.map((data,index)=>{
                                        return (
                                            <TableRow id={data.id}>
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
                                                    <FlatButton primary={true} label="EDIT" onTouchTap={() => {
                                                        this.handleEdit(data)
                                                    }}/>
                                                    <FlatButton secondary={true} label="DELETE"
                                                                onTouchTap={
                                                                    this.handleDeleteTap.bind(this,data)}/>
                                                </TableRowColumn>
                                            </TableRow>
                                        )
                                })):null
                        }
                        </TableBody>
                    </Table>
                    {this.props.allStudents.dialogOpen ?
                        <EditDialog/> : null}
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state)=>{
    return {
        allStudents: state.studentReducer,
        filterData: state.studentReducer.initialData,
        studentInfo:state.studentReducer.students,

    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getInitialData: (course)=>{
            dispatch(getInitialData(course))
        },
        getAllStudents: (department,semester,batch)=>{
            dispatch(getFilteredData(department,semester,batch))
        },
        deleteStudent:(content)=>{
            dispatch(deleteStudent(content))
        },
        editSelectedStudent: (data)=>{
            dispatch(selectStudent(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(StudentInformation)
