import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from '../../store/actions/alertActions';
import { deleteQuestion, clrCodeDeleteSuccess } from "../../store/actions/codeActions";

const CodeTable = ({ code: { isDeleted },
    auth: { user },
    question,
    id,
    deleteQuestion, setAlert, clrCodeDeleteSuccess }) => {

    useEffect(() => {
        if (isDeleted) {
            clrCodeDeleteSuccess();
            setAlert('Question Deleted', 'success');
        }

        //eslint-disable-next-line
    }, [isDeleted]);

    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>
                <Link className="questTitle" to={`/code/${question.slug}`}>
                    {capitalize(question.title)}
                </Link>
            </td>
            <td className="">
                <span>
                    <i
                        className={`fa fa-book questSol cursor-pointer ml-3 ${question.solution === '' && 'deactivated'}`}

                        aria-hidden="true"
                    ></i>
                </span>
            </td>
            <td className="">
                {question.difficulty === "10" && (
                    <span className=" diffMod badge badgeSuccess ">
                        Easy
                    </span>
                )}
                {question.difficulty === "20" && (
                    <span className=" diffMod badge badgeWarning ">
                        Medium
                    </span>
                )}
                {question.difficulty === "30" && (
                    <span className=" diffMod badge badgeDanger ">
                        Hard
                    </span>
                )}
            </td>
            {user?.role === 'student' && <td>{question.author?.name}</td>}
            {(user.role === 'faculty' || user.role === 'admin') &&
                <td>
                    <Link to={`/codeSubmissions/${question._id}`} className='alert-link' style={{ color: '#775ecf' }} >
                        <i className="fa fa-chevron-circle-right operation-D ml-5 mt-1" aria-hidden="true" ></i>
                    </Link>
                </td>
            }

            {(user.role === 'faculty' || user.role === 'admin') && <td>
                <span>
                    <Link
                        className="fa fa-pencil-square operation-E mr-3 "
                        aria-hidden="true"
                        to={`/editCodeQuestion/${question.slug}`}
                    ></Link>
                </span>
                <span>
                    <i
                        className="fa fa-trash operation-D cursor-pointer"
                        aria-hidden="true"
                        onClick={() => deleteQuestion(question._id)}
                    ></i>
                </span>
            </td>}
        </tr>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    code: state.code
});

export default connect(mapStateToProps, { deleteQuestion, setAlert, clrCodeDeleteSuccess })(CodeTable);
