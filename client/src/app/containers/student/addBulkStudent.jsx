import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
class AddBulkStudent extends React.Component{
    constructor(props){
        super(props)
    }
    handleFileUpload=(event)=>{
        console.log(event)
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
                    <input type="file" style={styles.exampleImageInput} onChange={this.handleFileUpload} />
                </RaisedButton>
            </div>
        )
    }
}
export default AddBulkStudent