import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {connect} from 'react-redux'
import {getInitialData} from '../../actions/studentAction.jsx'
class StudentInformation extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.getInitialData({
            courseId:1
        })
    }
    componentWillReceiveProps(props){
        this.props=props
    }
    render(){
        console.log('student information tab rendered')
        return(
            <div>
               <DropDownMenu>{/*{
                    this.props.filterData.data.departments.map((data,index)=>{
                        return(
                            <MenuItem
                                id={index}
                                primaryText={data}
                                value={data}
                            />
                        )
                    })
               }*/}
                <MenuItem primaryText="Department"/>
               </DropDownMenu>
                <DropDownMenu>
                    <MenuItem primaryText="Semester"/>{/*{
                    this.props.filterData.data.semesters.map((data,index)=>{
                        return(
                            <MenuItem
                                id={index}
                                primaryText={data}
                                value={data}
                            />
                        )
                    })
                }*/}
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
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        allStudents:state.studentReducer,
        filterData:state.studentReducer
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
