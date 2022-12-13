import * as React from 'react' ;
import {useParams} from 'react-router-dom';
import { Player } from 'video-react';
import ReactPlayer from "react-player";
import {useEffect, useState} from "react";
export function FilePage() {
    const {filename} = useParams() ;
    const [txt, setTxt] = useState("") ;
    useEffect(() => {
        if (filename.indexOf("txt") >= 0) {
            fetch("http://101.132.107.142/file/"+filename).then((res) => res.text()).then((text) => setTxt(text))
        }
    }, [])
    const renderTxt = () => {
        return <>{txt}</>
    }
    const renderImg = () => {
        return <><img src={"http://101.132.107.142/file/"+filename}/></>
    }
    const renderVideo = () => {
        return <><ReactPlayer url={"http://101.132.107.142/file/"+filename} playing={true} controls/></>
    }
    const renderFile = () => {
        if (filename.indexOf("txt") >= 0) return <>{renderTxt()}</>
        else if (filename.indexOf("jpg") >= 0) return <>{renderImg()}</>
        else return <>{renderVideo()}</>
    }
    return (
        <>
            {renderFile()}
        </>
    )
}