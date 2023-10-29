import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mainUpload.css';
import axios from 'axios';
import Statecontext from '../../../../Context/Statecontext';

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
    const [prv, setPrev] = useState(true);
    const [dataForFile, setDataForFile] = useState([]);

    const { fileNameForUpload, isUploadTrue,apiBaseurl } = useContext(Statecontext);
    const [rowCount, setRowCount] = useState(0);
    const [colCount, setColCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ApiToFetch = `${apiBaseurl}api/ReportingModule/GetColumnNamesAndDataTypes?tableName=${fileNameForUpload}`;

                const response = await axios.get(ApiToFetch, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    setDataForFile(response.data);
                } else {
                    console.log('API response error', response.status);
                }
            } catch (err) {
                console.log('Error in API', err);
            }
        };

        fetchData();
    }, [])

    const generateDummyXLSX = () => {
        const columnNameValues = dataForFile.map(column => column.columnName)
        const data = [columnNameValues]
        console.log("upload-download data",data);
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        return blob;
    };

    const handlePreview = (e, btn) => {
        if (btn === 'back') {
            setPreviewShow(false);
            setFileData({
                file: null,
                progress: 0,
                isBigFile: false
            });
            setPrev(true)
        } else {
            if (isUploadTrue) {
                console.log("isUploadTrue",isUploadTrue)
                setPreviewShow(e);
                setShowProgress(true);
                setPrev(false);
                toast.success("uploaded successfully...", { theme: "colored", })
            } else {
                console.log("isUploadFalse",isUploadTrue)
                setPrev(true);
                setPreviewShow(e);
                setShowProgress(false);
                toast.error("something went wrong...", { theme: "colored", })
            }

        }

       // console.log("the modal", e, btn)
    }

    console.log("the modal", isUploadTrue)
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
        setPrev(true)

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
            <ToastContainer />
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
                            columnForPrev={dataForFile}
                        />
                    </ErrorBoundary>
                </div>
            )}

            {(file === null || isBigFile) && <p className="notes"> Note: File Should Only Be Uploaded In xlsx Format</p>}

            {(file === null || isUploadTrue === false) && (
                <div className="filesSamplebox">
                    <img src={xsl} alt='file pic' height={50} width={50} style={{ marginTop: "1vh", marginLeft: "0.5vw" }} className='fileImg'></img>
                    <p className="invalidtext">Sample Tamplate.xlsx</p>
                    <div className='downloadbutton'>
                        <img src={download} alt='download' height={15} width={15} onClick={handleDownload} />
                    </div>
                </div>
            )}

            {file !== null && !isBigFile && showProgress === true && prv === false && (
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
                                    <p>{`${parseInt((file.size) / 1000)} kb  Rows: ${rowCount - 1}  Columns: ${colCount}`}</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: "5vh" }}>
                                    <div className="progress" style={{ width: "73vw", marginLeft: "1vw", height: "1.4vh", marginTop: "-3.5vh" }}>
                                        <div
                                            style={{
                                                width: `${progress}%`,
                                                background: '#21A366',
                                                borderRadius: '34px',
                                            }}
                                        ></div>
                                    </div>
                                    <div style={{ marginTop: "-4vh", marginLeft: "1vw" }}>
                                        {progress < 100 && <span style={{marginTop:"-1vh",position: "absolute"}}>{`${progress}%`}</span>}
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

            {file !== null && showProgress === true && prv === false && (
                <div style={{ display: "flex", justifyContent: "left", marginLeft: "1vw", marginTop: "10vh" }} >
                    <button className="downloadButton" onClick={downloadFile} >
                        <img src={xcel} className='sourceImg' alt="" height={100} width={100} />
                        <p style={{marginLeft:"4vw"}}> {file.name}</p>
                        <FileDownloadOutlinedIcon />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MainUpload;

