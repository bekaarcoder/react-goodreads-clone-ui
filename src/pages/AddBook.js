import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addBook, reset } from "../features/book/bookSlice";
import { searchAuthor } from "../features/author/authorSlice";

const initialState = {
    bookName: "",
    pages: "",
    publishedDate: "",
    coverImage: "",
    description: "",
    authorId: "",
};

const AddBook = () => {
    const [showResult, setShowResult] = useState(false);
    const [author, setAuthor] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [formData, setFormData] = useState(initialState);

    const {
        bookName,
        pages,
        publishedDate,
        coverImage,
        description,
        authorId,
    } = formData;

    const dispatch = useDispatch();
    const { authors, loading } = useSelector((state) => state.author);
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.book
    );

    const onKeyUp = () => {
        if (author) {
            dispatch(searchAuthor(author));
            setShowResult(authors.length > 0);
            setSearchResults(authors);
        } else {
            setShowResult(false);
        }
    };

    const selectAuthor = (e) => {
        console.log(e.target.getAttribute("data-id"));
        console.log(e.target.value);
        setAuthor(e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            authorId: e.target.getAttribute("data-id"),
        }));
        setShowResult(false);
    };

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            name: bookName,
            pages: pages,
            publishedDate: publishedDate
                ? new Date(publishedDate).toLocaleDateString()
                : "",
            coverImage: coverImage,
            description: description,
            authorId: authorId,
        };
        console.log(bookData);
        dispatch(addBook(bookData));
        setFormData({ ...initialState });
        setAuthor("");
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
            dispatch(reset());
        }
    });

    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-6">
                    <h2 className="text-center">Add Book</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Book Name</label>
                            <input
                                type="text"
                                name="bookName"
                                className={
                                    isError && isError.name
                                        ? "is-invalid form-control"
                                        : "form-control"
                                }
                                value={bookName}
                                onChange={onChange}
                            />
                            {isError && isError.name && (
                                <div className="invalid-feedback">
                                    {isError.name}
                                </div>
                            )}
                        </div>
                        <div className="mb-3 author-search-container">
                            <label className="form-label">Author</label>
                            <input
                                type="text"
                                name="author"
                                className={
                                    isError && isError.authorId
                                        ? "is-invalid form-control"
                                        : "form-control"
                                }
                                onChange={(e) => setAuthor(e.target.value)}
                                value={author}
                                onKeyUp={onKeyUp}
                                placeholder="Enter author name to search"
                            />
                            {isError && isError.authorId && (
                                <div className="invalid-feedback">
                                    {isError.authorId}
                                </div>
                            )}
                            <div
                                className="search-result"
                                style={{
                                    display: showResult ? "block" : "none",
                                }}
                            >
                                {loading ? (
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-center">
                                            Loading...
                                        </li>
                                    </ul>
                                ) : (
                                    <div className="list-group list-group-flush">
                                        {searchResults.map((searchResult) => (
                                            <button
                                                type="button"
                                                className="list-group-item list-group-item-action"
                                                key={searchResult.id}
                                                data-id={searchResult.id}
                                                onClick={selectAuthor}
                                                value={`${searchResult.firstName} ${searchResult.lastName}`}
                                            >
                                                {`${searchResult.firstName} ${searchResult.lastName}`}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pages</label>
                            <input
                                type="text"
                                name="pages"
                                className="form-control"
                                value={pages}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Published Date</label>
                            <input
                                type="date"
                                name="publishedDate"
                                className="form-control"
                                value={publishedDate}
                                onChange={onChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Book Cover</label>
                            <input
                                type="text"
                                name="coverImage"
                                className="form-control"
                                value={coverImage}
                                onChange={onChange}
                                placeholder="Enter URL for the cover image"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={onChange}
                                placeholder="Enter book description"
                            ></textarea>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-dark" type="submit">
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
