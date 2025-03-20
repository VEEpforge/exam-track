import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import { Toaster } from "./components/ui/sonner"

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 ">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </div>
      {/* <Toaster /> */}
    </Router>
  )
}

export default App