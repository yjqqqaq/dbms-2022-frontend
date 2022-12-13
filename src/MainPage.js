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

const collectionList = ["user", "article", "read", "be_read"] ;

function MainPage() {
    const [dialogOpen, setDialogOpen] = useState(false) ;
    const [collection, setCollection] = useState("user") ;
    const [condition, setCondition] = useState("{}") ;
    const [newv, setNewv] = useState("{}");
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
                    value={collection}
                    label="collection"
                    onChange={(e) => setCollection(e.target.value)}
                >
                    {collectionList.map((uname) => {
                        return <MenuItem value={uname}>{uname}</MenuItem>
                    })}
                </Select>
                </FormControl>
            </div>
            <div style={{marginTop:"2%"}}>
                    <TextField
                        id="standard-condition-text"
                        label="Condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        variant="standard"
                        style={{width : "45%"}}
                    />
                    <TextField
                        id="standard-newv-text"
                        label="NewValue"
                        value={newv}
                        onChange={(e) => setNewv(e.target.value)}
                        variant="standard"
                        style={{marginLeft : "5%", width : "45%"}}
                    />
            </div>
            <div>
                <Button variant="contained" style={{margin:"2%", marginLeft:"0%"}} onClick={() => {
                    let formData = new FormData()
                    formData.append('skip', 0)
                    formData.append('limit', 10)
                    formData.append('collection', collection)
                    formData.append('condition', condition)
                    fetch("http://101.132.107.142/query", {
                        method: 'post',
                        body : formData
                    }).then((res) => {
                        if (res.status === 200) res.json().then((json) => {
                            console.log(json)
                            setDocuments(json)
                        })
                        else res.text().then((json) => alert(json))
                    })

                }}>Query</Button>
                <Button variant="contained" style={{margin:"2%"}} onClick={() => {
                    let formData = new FormData()
                    formData.append('collection', collection)
                    formData.append('newv', newv)
                    fetch("http://101.132.107.142/insert", {
                        method: 'post',
                        body : formData
                    }).then((res) => {
                        if (res.status === 200) res.text().then((json) => {
                            alert(json)
                        })
                        else res.text().then((json) => alert(json))
                    })

                }}>Insert</Button>
                <Button variant="contained" style={{margin:"2%"}} onClick={() => {
                    let formData = new FormData()
                    formData.append('newv', newv)
                    formData.append('collection', collection)
                    formData.append('condition', condition)
                    fetch("http://101.132.107.142/update", {
                        method: 'post',
                        body : formData
                    }).then((res) => {
                        if (res.status === 200) res.text().then((json) => {
                            alert(json)
                        })
                        else res.text().then((json) => alert(json))
                    })

                }}>Update</Button>
                <Button variant="contained" style={{margin:"2%"}} onClick={() => {
                    let formData = new FormData()
                    formData.append('collection', collection)
                    formData.append('condition', condition)
                    fetch("http://101.132.107.142/delete", {
                        method: 'post',
                        body : formData
                    }).then((res) => {
                        if (res.status === 200) res.text().then((json) => {
                            alert(json)
                        })
                        else res.text().then((json) => alert(json))
                    })

                }}>Delete</Button>

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

export default MainPage