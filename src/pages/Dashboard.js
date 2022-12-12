import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { current, user, isLoading, isSuccess } = useSelector(
        (state) => state.auth
    );
    const { firstName, lastName, email } = current;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Dashboard</h2>
                    <h3>
                        Hello {firstName} {lastName}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
