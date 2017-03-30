import React from 'react'
import ReactDOM from 'react-dom'
import TeacherList from './TeacherList.jsx'
import Dialog from 'material-ui/Dialog'
import axios from 'axios'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AllTeacher extends React.Component{
    constructor(props) {
    	super(props);
    	this.props = props
    	this.state = {
    		openTeacherDialog: false,
        allDepartments: [{
          name: "CSE"
        },
        {
          name: "MECH"
        }],
    		allTeacherList: [{
    			name: "shilpa",
    			designation: "intern",
          department: "CSE"
    		},
        {
          name: "Mukherjee",
    			designation: "intern",
          department: "MECH"
        }
      ],
        departmentSelected: []
       	}
    }
    handleChangeDepartment = (event, index, value) => {
      this.setState({
        departmentSelected: value
      })
    }

    componentWillUnmount() {
    /*	axios.put('',data).then((response)=>{
            console.log(response)

            this.setState({

            })
        })
        .catch((response)=>{
            console.log(response)
        })*/
    }

    render(){
    	return(
    		<div>
          <SelectField
          floatingLabelText="Department"
          value={this.state.departmentSelected}
          onChange={this.handleChangeDepartment}
          multiple={true}
          >
          {
            this.state.allDepartments.map((data,index)=>{
              return(
                  <MenuItem value={data.name} primaryText={data.name}/>
              )
            })
          }
          </SelectField>
    			{
    				this.state.allTeacherList.map((data,index)=>{
                if(this.state.departmentSelected.length==0){
                  return(
                    <Card>
                        <CardHeader
                          title={data.name}
                          subtitle={data.designation}
                          avatar="images/ok-128.jpg"
                          actAsExpander={true}
                        />
                        <CardText expandable={true}>

                      </CardText>
                      </Card>
                  )
                }
                else{
                  for(let index=0; index <this.state.departmentSelected.length; index++)
                  {
                    if(data.department==this.state.departmentSelected[index]){
                      return(
                        <Card>
                            <CardHeader
                              title={data.name}
                              subtitle={data.designation}
                              avatar="images/ok-128.jpg"
                              actAsExpander={true}
                            />
                            <CardText expandable={true}>
                          </CardText>
                          </Card>
                      )
                    }
                  }
                }
    				})
    			}
    		</div>
    	)
    }
}
export default AllTeacher
