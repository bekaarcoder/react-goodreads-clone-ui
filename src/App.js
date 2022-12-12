import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<WithoutNav />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<WithNav />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/manage/books/add" element={<AddBook />} />
                    </Route>
                </Routes>
            </Router>
            <ToastContainer position="bottom-center" theme="colored" />
        </>
    );
}

export default App;
