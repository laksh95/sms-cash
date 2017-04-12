import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {connect} from 'react-redux'
import {getInitialData} from '../../actions/studentAction.jsx'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'

class StudentInformation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            studentID:0,
            department:'',
            semester:0,
            batch:0
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
    handleDeleteTap = (event)=>{
        event.preventDefault()
    }
    handleEditTap = (event)=>{
        event.preventDefault()
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
                break
            case 'semester':
                break
            case 'batch':
                break
        }

    }
    render(){
        const HANDLE_CODES={
            "DEPARTMENT":"department",
            "SEMESTER":"semester",
            "BATCH":"batch"
        }
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ]
        return(
            <div>
                <div id="studentFilter">
                    <DropDownMenu
                        value={this.state.department}
                        onChange={this.handleChange.bind(this,HANDLE_CODES.DEPARTMENT)}
                    >
                        <MenuItem primaryText="Department" value = {'Department'}/>{
                         this.props.filterData.initialData.data.departments.map((data,index)=>{
                         return(
                         <MenuItem
                         id={index}
                         primaryText={data.abbreviatedName}
                         value={data.abbreviatedName}
                         />
                         )
                         })
                     }
                    </DropDownMenu>
                    <DropDownMenu>
                        <MenuItem primaryText="Semester"/>{
                         this.props.filterData.initialData.data.semesters.map((data,index)=>{
                         return(
                             <MenuItem
                             id={index}
                             primaryText={data.name}
                             value={data.name}
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
                                                <FlatButton primary={true} label="EDIT" onHandleTouchTap={()=>{

                                                }}/>
                                                <FlatButton secondary={true} label="DELETE" onHandleTouchTap={this.handleDeleteTap} />
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                })
                            }


                           {/* <TableRow>
                                <TableRowColumn>
                                    1
                                </TableRowColumn>
                                <TableRowColumn>
                                    Laksh
                                </TableRowColumn>
                                <TableRowColumn>
                                    CSE
                                </TableRowColumn>
                                <TableRowColumn>
                                    8
                                </TableRowColumn>
                                <TableRowColumn>
                                    2013-2017
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton primary={true} label="EDIT"/>
                                    <FlatButton secondary={true} label="DELETE"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    2
                                </TableRowColumn>
                                <TableRowColumn>
                                    Yash
                                </TableRowColumn>
                                <TableRowColumn>
                                    CSE
                                </TableRowColumn>
                                <TableRowColumn>
                                    8
                                </TableRowColumn>
                                <TableRowColumn>
                                    2013-2017
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton primary={true} label="EDIT"/>
                                    <FlatButton secondary={true} label="DELETE"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    3
                                </TableRowColumn>
                                <TableRowColumn>
                                    Sarthak
                                </TableRowColumn>
                                <TableRowColumn>
                                    CSE
                                </TableRowColumn>
                                <TableRowColumn>
                                    7
                                </TableRowColumn>
                                <TableRowColumn>
                                    2013-2017
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton primary={true} label="EDIT"/>
                                    <FlatButton secondary={true} label="DELETE"/>
                                </TableRowColumn>
                            </TableRow>*/}
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
        studentInfo:state.studentReducer.studentData
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getInitialData: (course)=>{
            dispatch(getInitialData(course))
        },
        getAllStudents: ()=>{
            dispatch()
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(StudentInformation)
