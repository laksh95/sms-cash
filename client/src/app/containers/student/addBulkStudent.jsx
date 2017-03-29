import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
class AddBulkStudent extends React.Component{
    constructor(props){
        super(props)
    }
    fileLoadHandler=(event)=>{
        console.log('---------loading-------')
        let csv=event.target.value
        console.log(csv)
        processData(csv)
        console.log(csv)
    }
    fileErrorHandler=(event)=>{

    }
    handleFileUpload=()=>{
        let file = this.refs.bulkStudentFile.files[0]
        console.log(this.refs.bulkStudentFile)
        console.log(file)
        let reader=new FileReader()
        reader.readAsText(file)
        console.log(reader)
        reader.onLoad=(event)=>{
            console.log('----------')
            console.log(event.target.value)

        }
        reader.onError=(error)=>{
            console.log(event.target.model,error)

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
                <RaisedButton label="Choose file" labelPosition="before">
                    <input type="file" style={styles.exampleImageInput} ref="bulkStudentFile" onChange={this.handleFileUpload} />
                </RaisedButton>
            </div>
        )
    }
}
export default AddBulkStudent