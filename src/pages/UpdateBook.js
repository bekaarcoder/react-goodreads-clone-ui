import React from "react";
import { useParams } from "react-router-dom";

const UpdateBook = () => {
    const { id } = useParams();
    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Update Book {id}</h2>
                </div>
            </div>
        </div>
    );
};

export default UpdateBook;
