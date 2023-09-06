import React, { useRef, useState } from 'react';
import upload from '../../../../../Assets/uploadSymbole.svg';
import xsl from '../../../../../Assets/xslImg.svg';
import xcel from "../../../../../Assets/vscode-icons_file-type-excel.png";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import download from '../../../../../Assets/Group.svg';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import PreviewFile from './PreviewFile';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import completedImg from '../../../../../Assets/completedImg.svg'

import './mainUpload.css';

export const generateDummyXLSX = () => {
    const data = [['AccountHolder', 'TransactionType', 'Amount', 'TransactionDate']];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return blob;
};

const MainUpload = () => {
    const [fileData, setFileData] = useState({
        file: null,
        progress: 0,
        isBigFile: false,
    });
    const [fileKey, setFileKey] = useState(Math.random().toString(36));
    const inputFileRef = useRef(null);
    const [previewShow, setPreviewShow] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [showProgressApiSucces, setShowProgressApiSucces] = useState(false);

    const [rowCount, setRowCount] = useState(0);
    const [colCount, setColCount] = useState(0);

    const deleteBox = () => {
        setFileData({
            file: null,
            progress: 0,
            isBigFile: false,
        });
        setFileKey(Math.random().toString(36));
        inputFileRef.current.value = '';
        setShowProgress(false);
        setRowCount(0);
        setColCount(0);
    };

    const handlePreview = (e, btn) => {
        if (btn === 'back') {
            setPreviewShow(false);
            setFileData({
                file: null,
                progress: 0,
                isBigFile: false
            });
        } else {
            setPreviewShow(e);
            setShowProgress(true);
        }

        console.log("the modal", e, btn)
    }


    const downloadFile = () => {
        if (file) {
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
        }
    };

    const handleDownload = () => {
        const blob = generateDummyXLSX();
        FileSaver.saveAs(blob, 'sample.xlsx');
    };

    const handleChange = (e) => {
        setFileData({
            file: null,
            progress: 0,
            isBigFile: false,
        });

        if (e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const x = e.target.files[0].size;
            const filesize = Math.trunc(x / 1000);

            const uploadTask = setInterval(() => {
                setFileData((prevFileData) => {
                    const newProgress = prevFileData.progress + 10;
                    if (newProgress >= 100) {
                        clearInterval(uploadTask);
                    }
                    return {
                        ...prevFileData,
                        progress: newProgress,
                    };
                });
            }, 1000);

            const isBigFile = filesize > 1024;
            setFileData({
                file: e.target.files[0],
                progress: 0,
                isBigFile,
            });

            setPreviewShow(true);
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const range = XLSX.utils.decode_range(sheet['!ref']);
                const rowCount = range.e.r + 1;
                const colCount = range.e.c + 1;
                setRowCount(rowCount);
                setColCount(colCount);
            };
            reader.readAsBinaryString(e.target.files[0]);
        } else {
            alert('Select a valid file type.');
        }
    };

    const { file, progress, isBigFile } = fileData;

    return (
        <div>
            {previewShow === false ? (
                <div className="importModalBody">
                    <input
                        type="file"
                        id="upload-button"
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            zIndex: 5,
                            opacity: 0,
                            cursor: "pointer",
                        }}
                        onChange={handleChange}
                        onMouseDown={(e) => (e.target.value = null)}
                        ref={inputFileRef}
                        key={fileKey}
                    />
                    <div className="uploadsec">
                        <img src={upload} alt='upload' className='uploadImg'></img>
                        <p>Click To Upload</p>
                    </div>
                </div>
            ) : (
                <div>
                    <ErrorBoundary>
                        <PreviewFile
                            handlePreview={(e, text) => handlePreview(e, text)}
                            progressbarHandler={(e) => setShowProgressApiSucces(e)}
                            file={file}
                        />
                    </ErrorBoundary>
                </div>
            )}

            {(file === null || isBigFile) && <p className="notes"> Note: File Should Only Be Uploaded In xlsx Format</p>}

            {file === null && (
                <div className="filesSamplebox">
                    <img src={xsl} alt='file pic' height={50} width={50} style={{ marginTop: "1vh", marginLeft: "0.5vw" }} className='fileImg'></img>
                    <p className="invalidtext">Sample Tamplate.xlsx</p>
                    <div className='downloadbutton'>
                        <img src={download} alt='download' height={15} width={15} onClick={handleDownload} />
                    </div>
                </div>
            )}

            {file !== null && !isBigFile && showProgress === true && (
                <div className="progressContent">

                    <div style={{ display: "flex", flexDirection: "row", width: "100%", marginBottom: "2vh" }}>
                        <div style={{ display: "flex", flexDirection: "row", position: 'relative', right: '-1vw', top: '1vh', width: "95%" }}>
                            <div style={{ marginLeft: "-1vw" }}>
                                <img src={xsl} alt='file pic' className='custom-image' />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", marginLeft: "6vw" }}>
                                <div className="filename">
                                    <p>{file.name}</p>
                                </div>
                                <div className="fileSize">
                                    <p>{`${parseInt((file.size) / 1000)} kb  Rows: ${rowCount}  Columns: ${colCount}`}</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: "5vh" }}>
                                    <div class="progress" style={{ width: "73vw", marginLeft: "1vw", height: "1.4vh", marginTop: "-3.5vh" }}>
                                        <div
                                            style={{
                                                width: `${progress}%`,
                                                background: 'linear-gradient(270.11deg, rgb(104 44 165) 0%, rgb(22 47 248 / 71%) 100%)',
                                                borderRadius: '34px',
                                            }}
                                        ></div>
                                    </div>
                                    <div style={{ marginTop: "-4vh", marginLeft: "1vw" }}>
                                        {progress < 100 && <span>{`${progress}%`}</span>}
                                        {progress >= 100 && (
                                            <span style={{ display: "flex", flexDirection: "row", gap: "0.3vw" }}>
                                                <img src={completedImg} alt='complete' />
                                                <p className='completedText'>Completed</p>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {file !== null && isBigFile && (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="filesInvalidbox">
                        <img src={xsl} alt='file pic' height={50} width={50} style={{ marginTop: "1vh", marginLeft: "0.5vw" }}></img>
                        <p className="invalidtext">{file.name}</p>
                    </div>
                    <div className="invalidP">
                        <p >Error : File size exceeding 1MB </p>
                    </div>
                </div>
            )}

            {file !== null && showProgress === true && (
                <div style={{ display: "flex", justifyContent: "left", marginLeft: "1vw", marginTop: "10vh" }} >
                    <button className="downloadButton" onClick={downloadFile} >
                        <img src={xcel} className='sourceImg' alt="" />  <p> {file.name}</p> <FileDownloadOutlinedIcon />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MainUpload;

