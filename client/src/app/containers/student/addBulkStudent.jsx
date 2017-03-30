import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import DropZone from 'react-dropzone'
import {connect} from 'react-redux'
import {addBulkStudent} from '../../actions/addBulkStudentAction'
import axios from 'axios'
class AddBulkStudent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            completed:0,
            files:[]
        }
    }
    componentWillReceiveProps(nextProps){
        this.props=nextProps
    }
    componentWillMount(){
        clearTimeout(this.timeout)
    }
    componentDidMount(){
        console.log('component did mount')
    }
    onDrop = (acceptedFiles,rejectedFiles)=>{
        this.timer = setTimeout( () =>this.progress(5), 500)
        this.props.addStudent(acceptedFiles)
    }
    progress=(completed) =>{
        if (completed > 100) {
            this.setState({completed: 100});
        } else {
            this.setState({completed});
            const diff = Math.random() * 35;
            this.timer = setTimeout(() => this.progress(completed + diff), 1000);
        }
    }
    displayLabel=()=>{
        console.log('---------------label--------------',this.props.file)
    }
    render(){
        let styles = {
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
                width: '100%',
                opacity: '0'
            }
        }
        return(
            <div className="addBulk">
                <form>
                    <DropZone
                        multiple={false}
                        onDrop={this.onDrop}
                        accept='text/csv'
                    />
                    <LinearProgress mode="determinate" value={this.state.completed} />
                </form>{
                        this.displayLabel()
            }
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        file:state.addBulkStudent
    }
}
const mapDispatchtoProps = (dispatch)=>{
    return{
        addStudent: (file)=>{
            dispatch(addBulkStudent(file))
        }
    }


}
export default connect(mapStateToProps,mapDispatchtoProps)(AddBulkStudent)
