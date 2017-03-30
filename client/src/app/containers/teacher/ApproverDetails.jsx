import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class ApproverDetails extends React.Component{
    constructor(props) {
    	super(props);
    	this.props = props
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
    		    HELLO
    		</div>
    	)
    }
}
export default ApproverDetails
