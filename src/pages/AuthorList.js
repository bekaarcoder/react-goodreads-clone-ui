import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthors, reset } from "../features/author/authorSlice";
import noImage from "../noImage.png";

const AuthorList = () => {
    const dispatch = useDispatch();
    const { loading, content, isSuccess, isError } = useSelector(
        (state) => state.author
    );

    const fetchAuthors = (pageNumber = 0) => {
        dispatch(getAuthors(pageNumber));
    };

    useEffect(() => {
        dispatch(getAuthors());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-12">
                    <Link
                        className="btn btn-outline-success"
                        to="/manage/authors/add"
                    >
                        Create Author
                    </Link>
                    <table className="table table-striped table-hover table-responsive my-4 align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Author Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content?.authors?.map((author) => (
                                <tr key={author.id}>
                                    <td>{author.firstName}</td>
                                    <td>{author.lastName}</td>
                                    <td>
                                        <img
                                            src={
                                                author.image
                                                    ? author.image
                                                    : noImage
                                            }
                                            alt={author.firstName}
                                            width="50"
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-warning">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger ms-3">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                        <nav>
                            <ul className="pagination">
                                <li className="page-item">
                                    <span
                                        className={
                                            content.hasPrevious
                                                ? "page-link"
                                                : "page-link disabled"
                                        }
                                        onClick={() =>
                                            fetchAuthors(
                                                content?.currentPage - 1
                                            )
                                        }
                                        role="button"
                                    >
                                        Previous
                                    </span>
                                </li>
                                <li className="page-item">
                                    <span
                                        className={
                                            content.hasNext
                                                ? "page-link"
                                                : "page-link disabled"
                                        }
                                        onClick={() =>
                                            fetchAuthors(
                                                content?.currentPage + 1
                                            )
                                        }
                                        role="button"
                                    >
                                        Next
                                    </span>
                                </li>
                            </ul>
                        </nav>
                        <p>
                            Page {content?.currentPage + 1} of{" "}
                            {content?.totalPages}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorList;
