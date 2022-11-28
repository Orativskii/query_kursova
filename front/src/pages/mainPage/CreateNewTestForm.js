import * as React from 'react';
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {addTest} from "./MainPageApi";


export default function CreateNewTestForm(props) {

    const newTest = {title: "", description: "", ownerId: ''};

    const [currentTest, setCurrentTest] = useState(newTest);


    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (currentTest.title.length > 0) {
            setCurrentTest({...currentTest, ownerId: localStorage.getItem("userId")});
            currentTest.ownerId = localStorage.getItem("userId")
            console.log(localStorage.getItem("userId"))
            console.log(currentTest)
            addTest(currentTest).then(r => {
                props.loadAllTests(localStorage.getItem("userId")).then(result => {
                    props.setTests(result)
                })
            })
            setCurrentTest(newTest);
        }
    };
    const onChangeTestTitle = (event) => {
        setCurrentTest({...currentTest, title: event.target.value});
    };
    const onChangeTestDescription = (event) => {
        setCurrentTest({...currentTest, description: event.target.value});
    };

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <TextField
                    style={{margin: 8}}
                    placeholder="Title"
                    helperText="Test Title"
                    fullWidth
                    margin="normal"
                    onChange={onChangeTestTitle}
                    value={currentTest.title}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        form: {
                            autocomplete: 'off',
                        }
                    }}
                />
                <TextField
                    style={{margin: 8}}
                    placeholder="Description"
                    helperText="Test Description"
                    fullWidth
                    margin="normal"
                    autoComplete="false"
                    onChange={onChangeTestDescription}
                    value={currentTest.description}
                    inputProps={{
                        form: {
                            autocomplete: 'off',
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" variant="outlined" size="small">
                    Create test
                </Button>
            </form>
        </>
    )
}