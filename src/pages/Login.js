import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, login, getCurrentUser } from "../features/auth/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        dispatch(reset());
        e.preventDefault();
        if (!email && !password) {
            setEmailValid(false);
            setPasswordValid(false);
        } else {
            const userData = {
                email: email,
                password: password,
            };
            setEmailValid(true);
            setPasswordValid(true);
            dispatch(login(userData));
        }
    };

    useEffect(() => {
        if (user) {
            dispatch(getCurrentUser());
            navigate("/manage/dashboard");
        }
        if (isError && isError.message) {
            toast.error(isError.message);
        }

        if (isSuccess) {
            navigate("/dashboard");
            toast.success(message);
            dispatch(reset());
        }
    }, [isError, message, navigate, isSuccess, dispatch, user]);

    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-6 col-lg-5">
                    <h1 className="display-6 text-center">
                        <Link
                            to="/"
                            className="text-reset text-decoration-none"
                        >
                            BetterReads
                        </Link>
                    </h1>
                    <h3 className="text-center my-3">Sign In</h3>
                    <form className="mt-5" onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={
                                    !emailValid
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                            {!emailValid && (
                                <div className="invalid-feedback">
                                    Enter your email
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className={
                                    !passwordValid
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                            {!passwordValid && (
                                <div className="invalid-feedback">
                                    Enter your password
                                </div>
                            )}
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="text-center my-4">
                        <small>
                            By signing in, you agree to the BetterReads Terms of
                            Service and Privacy Policy.
                        </small>
                    </p>
                    <p className="text-center">
                        New to BetterReads?{" "}
                        <Link to="/register" className="link-dark">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
