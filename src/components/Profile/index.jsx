import React from "react";

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            heading: 'React component!',
            counter: 0,
            showHeading: true,
            headingValue: 'List Item'
        }
    }

    componentDidMount = () => {
        console.log("Component Mounted!")
    }

    componentDidUpdate = () => {
        console.log("Component Updated!")
    }



    incrementCounter = () => {

        this.setState((prevState, prevProps) => ({ counter: prevState.counter + 1 }))



        // this.setState({ counter: this.state.counter + 1 })

        this.setState((prevState, prevProps) => ({ counter: prevState.counter + 4 }))


        // this.setState({ counter: this.state.counter + 3 })

    }

    decrementCounter = () => {
        this.setState({ counter: this.state.counter - 1 })
        this.setState({ counter: this.state.counter - 1 })
        this.setState({ counter: this.state.counter - 2 })


    }


    showHeadingHandler = () => {

        this.setState({ showHeading: !this.state.showHeading })

    }

    headingChangeHandler = (value) => {
        this.setState({ headingValue: value })
    }

    render() {

        const { heading, showHeading, counter, headingValue } = this.state

        return <div>
            {showHeading && <Heading value={headingValue} headingChangeHandler={this.headingChangeHandler} />}

            <button onClick={this.showHeadingHandler} > Show/Hide </button>

            <div> Counter value:- {counter} </div>
            <button onClick={this.incrementCounter}  > + </button>
            <button onClick={this.decrementCounter} > - </button>

        </div>

    }


}

export default Profile


class Heading extends React.Component {

    state = {
        headingValue: ''
    }

    componentWillUnmount = () => {
        console.log("Component unmounted!")
    }

    headingChangeHandler = (event) => {
        this.setState({ headingValue: event.target.value })
        this.props.headingChangeHandler(event.target.value)

    }

    render() {

        return <h3>
            {this.props.value}
            <input value={this.state.headingValue} onChange={this.headingChangeHandler} />
        </h3>

    }

}