import * as React from 'react';
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from '@mui/icons-material/Delete';
import {useLocation} from "react-router-dom";
import {addQuery, loadQueries} from "./QueriesApi";
import {Checkbox} from "@mui/material";

const newQuestion = {
    title: "",
    ownerId: localStorage.getItem("userId"),
    options:
        [
            {option: '', isCorrect: false},
            {option: '', isCorrect: false},
            {option: '', isCorrect: false},
        ]
};

const loadAllQueries = async(guid) => {
    let result = await loadQueries(guid);
    console.log(result)
    return result
}

export default function EditingTestPage() {

    const location = useLocation()
    const [uuid] = useState(location.pathname.split('/')[2])
    const [currentQuestion, setCurrentQuestion] = useState(newQuestion);
    const [existingQuest, setExistingQuest] = useState({})

    useEffect(() => {loadAllQueries(uuid).then(r => {
        setExistingQuest(r)
    })}, [])

    const onSubmitHandler = (event) => {
        event.preventDefault();
        addQuery(currentQuestion, uuid).then(r => {
            loadAllQueries(uuid).then(res => setExistingQuest(res));
            setCurrentQuestion(newQuestion);
        })
    };

    const onChangeQuestionTitle = (event) => {
        setCurrentQuestion({...currentQuestion, title: event.target.value});
    };

    const handleCheckBox = (event, index) => {
        console.log(index)
        let options = currentQuestion.options;
        options[index].isCorrect = event.target.checked;
        setCurrentQuestion({...currentQuestion, options: options})
    }

    const onChangeOption = (event, index) => {
        let options = currentQuestion.options;
        options[index].option = event.target.value;
        setCurrentQuestion({...currentQuestion, options: options})
    };

    const getOptions = (quest) =>
        JSON.parse(quest.options).map((option, index) => {
            return (
                <div>

                    <Checkbox
                        style={{width: 50}}
                        checked={option.isCorrect}
                        disabled={true}

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

    const getExistingQuestions = () => {
        return existingQuest.queryList?.map((quest) => {
            return (
                <>
                    <ListItemIcon>
                        <DeleteIcon onClick={() => console.log('removeQuestion()')}/>
                    </ListItemIcon>
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
                        getOptions(quest)
                    }
                    <Divider />
                </>
            )
        })
    }



    return (
        <>
            {existingQuest && getExistingQuestions()}
            <Divider color={'black'} style={{marginBottom: 20, marginTop: 20}}/>
            <form
                onSubmit={onSubmitHandler}
            >
                <TextField
                    style={{margin: 8}}
                    placeholder="Title"
                    helperText="Test Title"
                    fullWidth
                    margin="normal"
                    onChange={onChangeQuestionTitle}
                    value={currentQuestion.title}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        form: {
                            autocomplete: 'off',
                        }
                    }}
                />
                {
                    currentQuestion.options.map((option, index) => {
                        return (
                            <span>
                                <Checkbox
                                    style={{width: 50}}
                                    checked={option.isCorrect}
                                    onChange={(event) => handleCheckBox(event, index)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <TextField
                                    style={{margin: 8, width: '90%'}}
                                    placeholder="Option"
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => onChangeOption(event, index)}
                                    value={currentQuestion.options[index].option}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        form: {
                                            autocomplete: 'off',
                                        }
                                    }}
                                />
                            </span>
                        )
                    })
                }
                <Button type="submit" variant="outlined" size="small">
                    Save query
                </Button>
            </form>
        </>
    )
}