import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="main vh-100">
            <div className="opacity-10">
                <div className="img-container"></div>
            </div>
            <div className="main-header container-fluid">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-md-6">
                        <h1 className="display-6 text-white">
                            Dicover & read more
                        </h1>
                        <h1 className="display-1 text-white">BetterReads</h1>
                        <p className="lead text-white">
                            Deciding what to read next? Find amazing books on
                            BetterReads and track your reading. Choose your next
                            book based on your favorite genre.
                        </p>
                        <Link to="/books" className="link-light">
                            Browse Books
                        </Link>
                        <div className="mt-4">
                            <Link
                                to="/register"
                                className="btn btn-outline-light"
                            >
                                Sign up
                            </Link>
                            <Link
                                to="/login"
                                className="btn btn-outline-light ms-3"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
