import * as React from 'react' ;
import {useParams} from 'react-router-dom';
import { Player } from 'video-react';
import ReactPlayer from "react-player";
import {useEffect, useState} from "react";

export function ArticlePage() {
    const {aid} = useParams() ;
    const [txtFile, setTxtFile] = useState("") ;
    const [images, setImages] = useState([]) ;
    const [videos, setVideos] = useState([]) ;

    const [txt, setTxt] = useState("") ;
    useEffect(() => {
        const tmp = {"aid": aid}
        let formData = new FormData()
        formData.append('skip', 0)
        formData.append('limit', 1)
        formData.append('collection', 'article')
        formData.append('condition', JSON.stringify(tmp))
        fetch("http://101.132.107.142/query", {
            method: 'post',
            body : formData
        }).then((res) => {
            if (res.status === 200) res.json().then((json) => {
                setTxtFile(json[0].text)
                setImages(json[0].image.split(','))
                if (json[0].video.indexOf("flv") >= 0) setVideos(json[0].video.split(','))
            })
            else res.text().then((json) => alert(json))
        })
    }, [])
    useEffect(() => {
        if (txtFile.indexOf("txt") >= 0) {
            fetch("http://101.132.107.142/file/"+txtFile).then((res) => res.text()).then((text) => setTxt(text))
        }
    }, [txtFile])
    const renderTxt = () => {
        return <>{txt}</>
    }
    const renderImg = () => {
        return <>{images.map((filename) => <img src={"http://101.132.107.142/file/"+filename}/>)}</>
    }
    const renderVideo = () => {
        return <>
            {videos.map((filename) => <ReactPlayer url={"http://101.132.107.142/file/"+filename} playing={true} controls/>)}
        </>
    }
    return (
        <>
            {renderTxt()}
            {renderImg()}
            {renderVideo()}
        </>
    )
}