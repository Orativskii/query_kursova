import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import CreateNewTestForm from "./CreateNewTestForm";
import {useHistory} from "react-router-dom";
import {loadTests} from "./MainPageApi";
import EditIcon from '@mui/icons-material/Edit';



export default function MainPage() {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const history = useHistory();
    const [tests, setTests] = useState([])

    useEffect(() => {loadAllTests(localStorage.getItem("userId")).then(r => {
        setTests(r)
    })}, [])

    const loadAllTests = (id) => {
        return loadTests(id)
    }

    const copyTestLink = (uuid) => {
        navigator.clipboard.writeText('localhost:3000/tests/' + uuid + '/pass')
        setShowSnackbar(true)
    }

    const goToTestDetail = (uuid) => {
        history.push(`/tests/${uuid}/editing`)
        history.go(`/tests/${uuid}/editing`)
    }


    return (
        <>
            <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                <nav aria-label="main mailbox folders">

                    <List>
                        {tests.map(test => {
                                return (
                                    <>
                                        <ListItem key={test.id}>
                                            <ListItemButton onClick={() => copyTestLink(test.guid)}>
                                                <ListItemIcon>
                                                    <EditIcon onClick={() => goToTestDetail(test.guid)}/>
                                                </ListItemIcon>
                                                <ListItemText primary={test.title}/>
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider/>
                                    </>)
                            }
                        )}

                    </List>
                </nav>
            </Box>
            <CreateNewTestForm
            setTests={setTests}
            loadAllTests={loadAllTests}
            />
            <Snackbar
                open={showSnackbar}
                autoHideDuration={2000}
                onClose={() => setShowSnackbar(false)}
                message="Link copied!"
            />
        </>
    )
}