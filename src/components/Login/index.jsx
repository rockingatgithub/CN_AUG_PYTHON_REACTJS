import Profile from "../Profile"

export const Login = (props) => {

    console.log("The props", props)

    return <> 
        <h3> {props.heading} </h3>
    <form>
        Email:-<input type="email" />
        <br/>
        Password:-<input type="password" />
        <br/>
        <button>Submit</button>
    </form>

    <Profile/>
    </>

}



export const Heading = () => {

    return <h3> Heading </h3>

}