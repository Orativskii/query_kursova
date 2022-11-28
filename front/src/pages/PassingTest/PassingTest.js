import * as React from 'react';
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {useLocation} from "react-router-dom";
import {loadQueries} from "../QueriesEditing/QueriesApi";
import {Checkbox} from "@mui/material";
import {getResults, passTest} from "./PassingTestApi";

const loadAllQueries = async (guid) => {
    let result = await loadQueries(guid);
    return result
}

const loadResults = async (guid) => {
    let result = await getResults(localStorage.getItem("userId"), guid);
    return result
}

export default function PassingTestPage() {

    const location = useLocation()
    const [uuid] = useState(location.pathname.split('/')[2])
    const [questions, setQuestions] = useState({})
    const [answers, setAnswers] = useState([])
    const [isRerender, setIsRerender] = useState(false)
    const [isTestPassed, setIsTestPassed] = useState(false);
    const [results, setResults] = useState({})

    useEffect(() => {
        loadResults(uuid).then(r => {
            if (!!r) {
                setResults(r)
                setIsTestPassed(true)
            }
        })
        loadAllQueries(uuid).then(r => {
            setQuestions(r)
        })
    }, [])

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setResults(await passTest({guid: uuid, userId: localStorage.getItem("userId"), answers: answers}));
        setIsTestPassed(true)
    };


    const handleCheckBox = (event, questionId, option) => {
        let newAnswers = answers;

        let currQuestion = newAnswers.find(ans => ans.questionId === questionId)

        if (currQuestion) {
            delete currQuestion.option
            currQuestion.option = option
            currQuestion.optId = option + questionId
        } else {
            newAnswers.push({questionId: questionId, option: option, optId: option + questionId})
        }

        setAnswers(newAnswers)
        setIsRerender(!isRerender)
    }
    const GetOptions = (props) => {
        const {quest} = props;
        return JSON.parse(quest.options).map((option) => {
            return (
                <div>

                    <Checkbox
                        key={isRerender + option.option}
                        style={{width: 50}}
                        aria-disabled={true}
                        value={!!answers.find(ans => ans.optId === option.option + quest.id)}
                        checked={null != answers.find(ans => ans.optId === option.option + quest.id)}
                        onChange={(event) => handleCheckBox(event, quest.id, option.option)}
                    />
                    <TextField
                        style={{margin: 8, width: '90%'}}
                        placeholder="Option"
                        fullWidth
                        margin="normal"
                        disabled={true}
                        value={option.option}
                    />
                </div>
            )
        })
    }

    const GetExistingQuestions = (props) => {
        const {questionsList} = props;
        return questionsList.queryList?.map((quest) => {
            return (
                <>
                    <TextField
                        style={{margin: 8}}
                        placeholder="Title"
                        helperText="Test Title"
                        fullWidth
                        margin="normal"
                        disabled={true}
                        value={quest.query}
                        variant="outlined"
                    />
                    {
                        <GetOptions
                            quest={quest}
                            answers={answers}
                            setAnswers={setAnswers}
                        />
                    }
                    <Divider/>
                </>
            )
        })
    }


    return (
        <>
            {!isTestPassed ?
                <form
                    onSubmit={onSubmitHandler}
                >
                    {questions && <GetExistingQuestions questionsList={questions}/>}
                    <Divider color={'black'} style={{marginBottom: 20, marginTop: 20}}/>
                    <Button type="submit" variant="outlined" size="small">
                        Finish Test
                    </Button>
                </form>
                : <div style={{
                    width: 300,
                    height: 200,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    margin: '-100px 0 0 -150px'
                }}>
                    <h1 style={{width: '100%', textAlign: 'center'}}>RESULTS:</h1>
                    <h1 style={{width: '100%', textAlign: 'center'}}>{results ? results.percentage : 0}%</h1>
                    <h2 style={{width: '100%', textAlign: 'center'}}>{results ? results.result : 0}</h2>
                </div>
            }
        </>
    )
}