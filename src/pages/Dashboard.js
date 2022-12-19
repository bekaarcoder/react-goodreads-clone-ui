import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
    const { current } = useSelector((state) => state.auth);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Dashboard</h2>
                    <h3>
                        Hello {current?.firstName} {current?.lastName}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
