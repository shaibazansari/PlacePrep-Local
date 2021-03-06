import React, { useState, useEffect } from "react";
import "./quiz.css";
import { Button, Container, Form } from "react-bootstrap";
import QuizQuestion from "./CreateQuizQuestion";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import {
    getQuiz,
    updateQuiz,
    deleteQuizQuestion,
    setCurrentQuiz,
    clearQuizErrors,
    clrQuizCreateSuccess
} from "../../store/actions/quizActions";
import { setAlert } from "../../store/actions/alertActions";

const EditQuiz = (props) => {
    const {
        quiz: { current, error, isCreated, editable },
        getQuiz,
        updateQuiz,
        deleteQuizQuestion,
        setCurrentQuiz,
        clearQuizErrors,
        clrQuizCreateSuccess,
        setAlert,
        match,
    } = props;

    const slug = match.params.slug;
    useEffect(() => {
        getQuiz(slug, true);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isCreated) {
            clrQuizCreateSuccess();
            setAlert('Quiz has been updated', 'success');
        }

        // eslint-disable-next-line
    }, [isCreated]);

    useEffect(() => {
        if (error) {
            clearQuizErrors();
            setAlert(error, "danger");
        }
        if (current !== null) {
            // if User updates Quiz title then slug also updates
            // Hence updating slug in the url
            props.history.replace({ pathname: `/editQuiz/${current.slug}` });

            let tempDeepCopy = JSON.parse(JSON.stringify(current));
            setQuizLocal(tempDeepCopy);
        } else {
            setQuizLocal({
                title: '',
                category: '',
                topic: '',
                duration: '',
                questionWeightage: '',
                questions: [{
                    id: 0,
                    question: '',
                    answers: ['', '', '', ''],
                    correctAnswer: ''
                }]
            });
        }

        // eslint-disable-next-line
    }, [current, error]);

    // let tempDeepCopy = JSON.parse(JSON.stringify(current));
    const [quizLocal, setQuizLocal] = useState({
        title: '',
        category: '',
        topic: '',
        duration: '',
        questionWeightage: '',
        questions: [{
            id: 0,
            question: '',
            answers: ['', '', '', ''],
            correctAnswer: ''
        }]
    });

    const [lastId, setLastId] = useState(0);

    const handleAddQuesClick = () => {
        const newQuesObj = {
            id: lastId + 1,
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
        };

        setLastId(lastId + 1);

        const newQuesArray = [...quizLocal.questions, newQuesObj];
        setQuizLocal({
            ...quizLocal,
            questions: newQuesArray,
        });
    };

    const handleOnChange = (e) => {
        setQuizLocal({
            ...quizLocal,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeQues = (e, index) => {
        const quesArray = [...quizLocal.questions];
        if (e.target.name === "question" || e.target.name === "correctAnswer") {
            quesArray[index][e.target.name] = e.target.value;
            setQuizLocal({
                ...quizLocal,
                questions: quesArray,
            });
        } else {
            let optIndex = 0;
            if (e.target.name === "optionB") {
                optIndex = 1;
            } else if (e.target.name === "optionC") {
                optIndex = 2;
            } else if (e.target.name === "optionD") {
                optIndex = 3;
            }
            quesArray[index].answers[optIndex] = e.target.value;
            setQuizLocal({
                ...quizLocal,
                questions: quesArray,
            });
        }
    };

    const handleOnDelete = (eleId) => {
        const newQuesArray = quizLocal.questions.filter((ele) => {
            let tempId = ele.id || ele._id;
            return eleId !== tempId;
        });

        if (isNaN(eleId)) {
            deleteQuizQuestion(eleId);
        }

        setQuizLocal({
            ...quizLocal,
            questions: newQuesArray,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            quizLocal.title === "" ||
            quizLocal.topic === "" ||
            quizLocal.duration === "" ||
            quizLocal.questionWeightage === ""
        ) {
            setAlert("Please enter all fields", "danger");
        } else {
            updateQuiz(quizLocal);
            setCurrentQuiz(quizLocal);
        }
    };

    return (
        <>
            {current ? (<Container className="container-quiz">
                <h3 className="text-center  mb-2 pt-4 ">QUIZ DETAILS</h3>
                <div className="title-border mb-4">
                    <span></span>
                </div>
                <div className="createquizform pb-1">
                    <Form onSubmit={onSubmit} >
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <Form.Group controlId="quiztitle" >
                                    <Form.Label><b>Quiz title</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled" name="title" value={quizLocal.title} onChange={handleOnChange} type="" placeholder="Enter Title" />
                                </Form.Group>
                            </div>
                            <div className="col-sm-6">
                                <Form.Group controlId="category" >
                                    <Form.Label><b>Select Category</b></Form.Label>
                                    <Form.Group controlId="SelectRowsPerpage">
                                        <Form.Control as="select" className="quiz-inputFiled" name='category' value={quizLocal.category} onChange={handleOnChange} >
                                            <option className="optionSelect" value='quantitative analysis' >Quantitative Analysis</option>
                                            <option className="optionSelect" value='logical reasoning' >Logical Reasoning</option>
                                            <option className="optionSelect" value='verbal ability' >Verbal Ability</option>
                                            <option className="optionSelect" value='other topics' >Others</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-6 responsivelabel">
                                <Form.Group controlId="topics" >
                                    <Form.Label><b>Quiz topics</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled " name="topic" value={quizLocal.topic} onChange={handleOnChange} type="" placeholder="Example: Probability, Trains..." />
                                </Form.Group>

                            </div>
                            <div className="col-sm-3 responsivelabel">
                                <Form.Group controlId="duration" >
                                    <Form.Label><b >Duration</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled quizDuration " name="duration" value={quizLocal.duration} onChange={handleOnChange} type="number" placeholder="Minutes only" />
                                </Form.Group>
                            </div>
                            <div className="col-sm-3 responsivelabel">
                                <Form.Group controlId="weightage" >
                                    <Form.Label><b >Weightage</b></Form.Label>
                                    <Form.Control className="quiz-inputFiled quizDuration " name="questionWeightage" value={quizLocal.questionWeightage} onChange={handleOnChange} type="number" placeholder="Marks" />
                                </Form.Group>
                            </div>
                        </div>
                        <hr></hr>
                        <h3 className="text-center  mb-2 pt-2 ">ADD QUESTIONS</h3>
                        <div className="title-border mb-3">
                            <span></span>
                        </div>


                        {quizLocal.questions.map((ele, index) => <QuizQuestion
                            key={ele._id || ele.id}
                            index={index}
                            onDeleteFunc={() => handleOnDelete(ele.id || ele._id)}
                            onChangeFunc={(e) => handleOnChangeQues(e, index)}
                            quesObj={ele}
                            deletable={editable}
                        />
                        )}

                        <div className="row">
                            <div className="col-sm-6">
                                <Button
                                    className="addquestbtn mb-2"
                                    onClick={handleAddQuesClick}
                                    disabled={!editable}
                                > Add Next Question  </Button>
                            </div>
                            <div className="col-sm-6 text-center">
                                <Button className="createquiz mb-4" type="submit" >Update Quiz</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Container>) : <Spinner />
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        quiz: state.quiz,
    };
};

export default connect(mapStateToProps, {
    getQuiz,
    updateQuiz,
    deleteQuizQuestion,
    setCurrentQuiz,
    clearQuizErrors,
    clrQuizCreateSuccess,
    setAlert,
})(EditQuiz);
