import React, { useEffect, useState } from 'react';
import './viewmodal.css';
import rightArrow from '../../../Assets/rightArrow.svg'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function ViewModal({ data, modalOpen, setModalOpen }) {

    const [folderName, setFolderName] = useState([]);
    const [showFiles, setFiles] = useState(false);
    const [filesName, setFilesName] = useState([]);
    const [showColumns, setShowColumns] = useState(false);
    const [columnName, setColumnName] = useState([])



    const getFolderName = async () => {
        try {
            const ApiToUse = `https://localhost:7062/api/ReportingModule/GetFoldersWithPermissions`

            const response = await axios.get(ApiToUse, {
                withCredentials: true,
            })

            if (response.status === 200) {
                const folderArr = Object.values(response.data)

                const folder = folderArr.map(ele => ele.folderName)
                setFolderName(folder);

            } else {
                console.log("error", response)
            }

        } catch (error) {
            console.log("API ERROR", error)
        }
    }

    const getFilesName = async (filename) => {
        try {
            const ApiToUse = `https://localhost:7062/api/Admin/filesInFolder?folderName=${filename}`

            const response = await axios.get(ApiToUse, {
                withCredentials: true,
            })

            if (response.status === 200) {

                setFilesName(response.data);
                setFiles(true);
            } else {
                console.log("error", response)
            }

        } catch (error) {
            console.log("API ERROR", error)
        }
    }
    const userName = sessionStorage.getItem('userId')

    const getColumns = async (items) => {
        try {
            const ApiToUse = `https://localhost:7062/api/Admin/GetFileFields?username=${userName}&contentId=${items.contentId}`

            const response = await axios.get(ApiToUse, {
                withCredentials: true,
            })

            if (response.status === 200) {

                setColumnName(response.data);
                setFiles(false);
                setShowColumns(true);
            } else {
                console.log("error", response)
            }

        } catch (error) {
            console.log("API ERROR", error)
        }
    }


    const handleCheckboxChange = async (items) => {

        const updatedItem = {
            username: items.usermame,
            contentId: items.contentId,
            fieldId: items.fieldId,
            view: items.view === 1 ? 0 : 1
        };
        try {
            const ApiToUse = `https://localhost:7062/api/Admin/updatefieldsaccess`;

            const response = await axios.post(ApiToUse, updatedItem, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success(`${items.fieldName === "*" ? 'all columns' : items.fieldName} access updated successfully.`, { theme: "colored" });

                setColumnName((prevColumnName) =>
                    prevColumnName.map((ele) =>
                        ele.fieldId === items.fieldId ? { ...ele, view: updatedItem.view } : ele
                    )
                );
            } else {
                console.log("error", response);
                toast.error(`Something went wrong.`, { theme: "colored" });
            }
        } catch (error) {
            console.log("API ERROR", error);
            toast.error(`Something went wrong.`, { theme: "colored" });
        }
    };




    const handleSave = () => {
        toast.success(`access updated successfuly..`, { theme: "colored" });
        setModalOpen(false)
    }

    useEffect(() => { getFolderName() }, [])


    return (
        <div className={`modal ${modalOpen ? 'open' : ''}`}>
            <ToastContainer />
            <div className="modal-contents">

                <div className='headersSectionModal'>

                    <div className='headersSectionModalText'>
                        {showFiles === false ? showColumns === true ? <p>{`< Select Columns`}</p> : <p>{`< Select Folder`}</p> : <p>{`< Select Files`}</p>}
                    </div>

                    <div style={{ marginTop: "-1vh" }}>
                        <button onClick={() => setModalOpen(false)} className="close-button">
                            &times;
                        </button>
                    </div>

                </div>

                {showFiles === false && showColumns === false && <div className='headersSectionModalBodysec' >

                    {folderName && folderName.length > 0 &&
                        folderName.map((ele) =>
                            <div className='headersSectionModalBodysecSubdiv'>

                                <div style={{ paddingLeft: "1vw" }}>
                                    <p>{ele}</p>
                                </div>

                                <div style={{ paddingRight: "1vw", paddingTop: "0.8vh" }} onClick={() => getFilesName(ele)} >
                                    <img src={rightArrow} alt='arrow' />
                                </div>

                            </div>)}

                </div>}

                {showFiles === true && showColumns === false && <div className='headersSectionModalBodysec' >

                    {filesName && filesName.length > 0 &&
                        Object.values(filesName).map((ele) =>
                            <div className='headersSectionModalBodysecSubdiv'>

                                <div style={{ paddingLeft: "1vw" }}>
                                    <p>{ele.filename}</p>
                                </div>

                                <div style={{ paddingRight: "1vw", paddingTop: "0.8vh" }} onClick={() => getColumns(ele)}>
                                    <img src={rightArrow} alt='arrow' />
                                </div>

                            </div>)}

                </div>}

                {showFiles === false && showColumns === true &&
                    <div className='headersSectionModalBodysecColumns' >

                        <div style={{ width: "100%" }}>
                            <Input
                                disableUnderline={true}
                                className="search-inputforHome"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon className="searchicon" sx={{ color: "gray" }} />
                                    </InputAdornment>
                                }
                                placeholder="Enter columns name here ...."
                                type="text"
                            ></Input>
                        </div>

                        <div className='headersSectionModalBodysecColumnsOverflow'>

                            {columnName && columnName.length > 0 &&
                                Object.values(columnName).map((ele) =>
                                    <div className='headersSectionModalBodysecSubdivColumns'>

                                        <div style={{ paddingLeft: "1vw", display: "flex", flexDirection: "row", gap: "0.5vw" }}>
                                            <input type='checkbox'
                                                checked={ele.view === 1}
                                                onChange={() => handleCheckboxChange(ele)}
                                            />
                                            <p style={{ paddingTop: "0vh" }}>{ele.fieldName === "*" ? "Select All" : ele.fieldName}</p>
                                        </div>

                                    </div>)}
                        </div>

                    </div>}

                {showFiles === false && showColumns === true &&
                    <div className='headersSectionModalBottomsec' >

                        <div className='cancelButton'>
                            <button onClick={() => { setShowColumns(false); setFiles(false); }}>Cancel</button>
                        </div>

                        <div className='saveButton'>
                            <button onClick={handleSave}>save</button>
                        </div>
                    </div>}


            </div>
        </div>
    );
}

export default ViewModal;
