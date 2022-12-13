import * as React from 'react' ;
import {useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import copy from 'copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    Button,
    FormControl, IconButton,
    InputLabel,
    MenuItem, Paper,
    Select,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    TextField
} from "@mui/material";

const temporaryList = ["daily", "weekly", "monthly"] ;

function TopPage() {
    const [temporary, setTemporary] = useState("daily") ;
    const [documents, setDocuments] = useState([]) ;
    const [fields, setFields] = useState([]) ;
    useEffect(() => {
        let array_ = [] ;
        documents.forEach((d) => {
            for (const key in d) {
                array_.push(key)
            }
        })
        setFields(Array.from(new Set(array_)))
    }, [documents])

    const renderDocuments = () => {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table aria-label="simple document table">
                        <TableHead>
                            <TableRow>
                                {fields.map((f) => <TableCell>{f}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.map((row) => (
                                <TableRow key={row.id}>
                                    {fields.map((f) => <TableCell>{row[f] || ""}</TableCell>)}
                                    <TableCell>
                                        <IconButton onClick = {() => {
                                            copy(JSON.stringify(row))
                                        }}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
    const renderSelector = () => {
        return (
            <>
                <div>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Collection</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={temporary}
                            label="temporary"
                            onChange={(e) => setTemporary(e.target.value)}
                        >
                            {temporaryList.map((uname) => {
                                return <MenuItem value={uname}>{uname}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Button variant="contained" style={{margin:"2%", marginLeft:"0%"}} onClick={() => {
                        fetch("http://101.132.107.142/top5/"+temporary).then((res) => {
                            if (res.status === 200) res.json().then((json) => {
                                console.log(json)
                                setDocuments(json)
                            })
                            else res.text().then((json) => alert(json))
                        })
                    }}>Query</Button>
                </div>
            </>
        )
    }
    return (
        <>
            <div style={{margin : "2%"}}>
                {renderSelector()}
            </div>
            <div style={{margin : "2%"}}>
                {renderDocuments()}
            </div>
        </>
    )

}

export default TopPage