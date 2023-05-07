import UserForm from "./components/UserForm"

const App = () => {

  const names = ['BMW', 'Audi', 'Ferrari']
  const showUserForm = false

  return <div>

    <h2> Introduction to reactjs. </h2>

        <UserForm heading={'Signup Form'} />

    </div>

}

export default App