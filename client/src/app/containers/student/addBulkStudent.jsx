import React from 'react'
/*import RaisedButton from 'material-ui/RaisedButton'*/
import LinearProgress from 'material-ui/LinearProgress'
import DropZone from 'react-dropzone'
class AddBulkStudent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            completed:0
        }
    }
    componentDidMount(){
        /*this.timer = setTimeout( () =>this.progress(5), 1000)*/
    }
    componentWillMount(){
        clearTimeout(this.timeout)
    }
    onDrop = (acceptedFiles,rejectedFiles)=>{
        console.log(acceptedFiles)
        this.timer = setTimeout( () =>this.progress(5), 500)

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
        if(this.state.completed < 100){
            return (<span>Click Here/Drop the file to upload</span>)
        }
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
                    <DropZone multiple={false} onDrop={this.onDrop}/>
                    {
                        this.displayLabel()
                    }
                    <LinearProgress mode="determinate" value={this.state.completed} />
                </form>
            </div>
        )
    }
}
export default AddBulkStudent