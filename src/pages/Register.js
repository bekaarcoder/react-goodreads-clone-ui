import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-6">
                    <h1 className="display-6 text-center">BetterReads</h1>
                    <h3 className="text-center my-3">Create Account</h3>
                    <form className="mt-5">
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="At least 8 characters"
                            />
                            <div className="form-text">
                                Password must be at least 8 characters.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Re-enter Password
                            </label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark">
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
