import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
    });

    const { firstName, lastName, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        dispatch(reset());
        e.preventDefault();
        if (password !== password2) {
            toast.warn("Password does not match");
        } else {
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };
            dispatch(register(userData));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }

        if (isError && isError.message) {
            toast.error(isError.message);
        }

        if (isSuccess) {
            navigate("/login");
            toast.success(message);
            dispatch(reset());
        }
    }, [isError, isSuccess, message, navigate, dispatch, user]);

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
                    <h3 className="text-center my-3">Create Account</h3>
                    <form className="mt-5" onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className={
                                    isError && isError.firstName
                                        ? "is-invalid form-control"
                                        : "form-control"
                                }
                                name="firstName"
                                value={firstName}
                                onChange={onChange}
                            />
                            {isError && isError.firstName && (
                                <div className="invalid-feedback">
                                    {isError.firstName}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={lastName}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={
                                    isError && isError.email
                                        ? "is-invalid form-control"
                                        : "form-control"
                                }
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                            {isError && isError.email && (
                                <div className="invalid-feedback">
                                    {isError.email}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className={
                                    isError && isError.password
                                        ? "is-invalid form-control"
                                        : "form-control"
                                }
                                placeholder="At least 8 characters"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                            {isError && isError.password ? (
                                <div className="invalid-feedback">
                                    {isError.password}
                                </div>
                            ) : (
                                <div className="form-text">
                                    Password must be at least 8 characters.
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Re-enter Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                value={password2}
                                onChange={onChange}
                            />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">
                                Create Account
                            </button>
                        </div>
                    </form>
                    <p className="text-center my-4">
                        <small>
                            By creating an account, you agree to the BetterReads
                            Terms of Service and Privacy Policy.
                        </small>
                    </p>
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="link-dark">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
