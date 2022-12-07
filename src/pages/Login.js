import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-6">
                    <h1 className="display-6 text-center">BetterReads</h1>
                    <h3 className="text-center my-3">Sign In</h3>
                    <form className="mt-5">
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark">Sign In</button>
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
