import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import {connect} from 'react-redux'
import {syncHistoryWithStore,routerReducer} from 'react-router-redux'
import store from './store.jsx'
import {Router, Route , browserHistory} from 'react-router'
class App extends React.Component {
    constructor(props){
        super(props)
        injectTapEventPlugin();
    }
    componentWillReceiveProps(props){
        this.props= props
    }
    render(){
        return(
                <div>
                    <h1>hello</h1>
                </div>
            )
    }
}