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
import AddAuthor from "./pages/AddAuthor";
import Protected from "./components/Protected";
import BookList from "./pages/BookList";
import AuthorList from "./pages/AuthorList";
import UpdateBook from "./pages/UpdateBook";
import UpdateAuthor from "./pages/UpdateAuthor";

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
                        <Route element={<Protected />}>
                            <Route path="/manage">
                                <Route path="books">
                                    <Route path="" element={<BookList />} />
                                    <Route path="add" element={<AddBook />} />
                                    <Route
                                        path="update/:id"
                                        element={<UpdateBook />}
                                    />
                                </Route>
                                <Route path="authors">
                                    <Route path="" element={<AuthorList />} />
                                    <Route path="add" element={<AddAuthor />} />
                                    <Route
                                        path="update/:id"
                                        element={<UpdateAuthor />}
                                    />
                                </Route>
                                <Route
                                    path="dashboard"
                                    element={<Dashboard />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </Router>
            <ToastContainer position="bottom-center" theme="colored" />
        </>
    );
}

export default App;
