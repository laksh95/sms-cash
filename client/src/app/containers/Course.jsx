import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'react-bootstrap'
import cookie from 'react-cookie'
import {Link} from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};
class Course extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }
    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
    componentWillReceiveProps(props){
        this.props = props
    }
    componentWillMount(){
    }
    render(){
        const contentStyle = { marginTop:10, marginLeft: 90 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)' };
        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="View" value="a">
                        <div>
                            <h2 style={styles.headline}>Controllable Tab A</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn>Course_Name</TableHeaderColumn>
                                        <TableHeaderColumn>No of Department</TableHeaderColumn>
                                        <TableHeaderColumn>Total Students</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableRowColumn><FlatButton label="Btech"/></TableRowColumn>
                                        <TableRowColumn>10</TableRowColumn>
                                        <TableRowColumn>250</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn><FlatButton label="Btech"/></TableRowColumn>
                                        <TableRowColumn>10</TableRowColumn>
                                        <TableRowColumn>250</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn><FlatButton label="Btech"/></TableRowColumn>
                                        <TableRowColumn>10</TableRowColumn>
                                        <TableRowColumn>250</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn><FlatButton label="Btech"/></TableRowColumn>
                                        <TableRowColumn>10</TableRowColumn>
                                        <TableRowColumn>250</TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab label="Add" value="b">
                        <div>
                            <h2 style={styles.headline}>Controllable Tab B</h2>
                            <p>
                                This is another example of a controllable tab. Remember, if you
                                use controllable Tabs, you need to give all of your tabs values or else
                                you wont be able to select them.
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
export default Course