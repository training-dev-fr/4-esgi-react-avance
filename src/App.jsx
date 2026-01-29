import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Count from './Count'
import User from './User.jsx'
import PasswordField from './PasswordField'
import UserDetail from './UserDetail'

let userList = [
  { id:1,firstname: "Aurélien", lastname: "Vaast" },
  { id:2,firstname: "Jean", lastname: "Dupond" },
  { id:3,firstname: "Céline", lastname: "Dupuis" },
  { id:4,firstname: "Julien", lastname: "Dupuis" }
]
function App() {


  return (
    <div>

      <BrowserRouter>
      {userList.map(user => <User user={user} />)}
        <Routes>
          <Route path="/password" element={<PasswordField/>} />
          <Route path="/count" element={<Count/>} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
