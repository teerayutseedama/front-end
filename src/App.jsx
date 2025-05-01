
import { useRoutes } from "react-router-dom";
import './index.css';
import LoginPage from "./pages/login.jsx";
import ProfilePage from "./pages/profile.jsx";
import RegisterPage from "./pages/register.jsx";
function App() {
const elements=useRoutes([{
    path:'/',element:<LoginPage />

},
    {
        path:'/profile',element: <ProfilePage />
    },
    {
        path:'/register',element: <RegisterPage />
    },
  ])

  return elements
}

export default App
