const Dashboard = (props) => {

    return (
        <div>
            <h2> Profile </h2>
            <div>
                Name:-  {props.user.name}
            </div>
            <div>
                Email:-  {props.user.email}
            </div>
        </div>
    )

}

export default Dashboard