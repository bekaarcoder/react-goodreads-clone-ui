import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import authorService from "../features/author/authorService";
import { reset, updateAuthor } from "../features/author/authorSlice";

const initialState = {
    firstName: "",
    lastName: "",
    image: "",
    bio: "",
};

const UpdateAuthor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, isError, isSuccess, message } = useSelector(
        (state) => state.author
    );

    const [formData, setFormData] = useState(initialState);
    const { firstName, lastName, image, bio } = formData;

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const authorData = {
            id,
            firstName,
            lastName,
            image,
            bio,
        };
        dispatch(updateAuthor(authorData));
    };

    const fetchData = useCallback(
        async (id) => {
            try {
                const data = await authorService.getAuthor(id);
                console.log(data);
                setFormData((prevData) => ({
                    firstName: data.firstName ? data.firstName : "",
                    lastName: data.lastName ? data.lastName : "",
                    image: data.image ? data.image : "",
                    bio: data.bio ? data.bio : "",
                }));
            } catch (error) {
                console.log(error.response.data);
                toast.error(error.response.data.message, {
                    toastId: id,
                });
                navigate("/manage/authors");
            }
        },
        [navigate]
    );

    useEffect(() => {
        fetchData(id);

        if (isSuccess && message !== "") {
            toast.success(message, {
                toastId: id,
            });
            navigate("/manage/authors");
        }

        return () => {
            dispatch(reset());
        };
    }, [id, dispatch, isSuccess, message, navigate, fetchData]);
    if (loading) return <p className="my-5 text-center">Loading...</p>;

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Update Author</h2>
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
                                Update Author
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateAuthor;
