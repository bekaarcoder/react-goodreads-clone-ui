import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAuthor, reset } from "../features/author/authorSlice";

const initialState = {
    firstName: "",
    lastName: "",
    image: "",
    bio: "",
};

const AddAuthor = () => {
    const [formData, setFormData] = useState(initialState);
    const { firstName, lastName, image, bio } = formData;

    const dispatch = useDispatch();
    const { loading, isError, isSuccess, message } = useSelector(
        (state) => state.author
    );

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const authorData = {
            firstName,
            lastName,
            image,
            bio,
        };
        dispatch(createAuthor(authorData));
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
            dispatch(reset());
            setFormData({ ...initialState });
        }
    }, [isSuccess, dispatch, message]);

    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-6">
                    <h2 className="text-center">Create Author</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className={
                                    isError && isError.firstName
                                        ? "is-invalid form-control"
                                        : "form-control"
                                }
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
                                name="lastName"
                                className="form-control"
                                value={lastName}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Author Image</label>
                            <input
                                type="text"
                                name="image"
                                className="form-control"
                                value={image}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bio</label>
                            <textarea
                                name="bio"
                                className="form-control"
                                cols="30"
                                rows="10"
                                value={bio}
                                onChange={onChange}
                            ></textarea>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">
                                Create Author
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAuthor;
