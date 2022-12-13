import * as React from 'react' ;
import {useParams} from 'react-router-dom';
import { Player } from 'video-react';
import ReactPlayer from "react-player";
export function FilePage() {
    const {filename} = useParams() ;
    const renderTxt = () => {
        
        return <></>
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