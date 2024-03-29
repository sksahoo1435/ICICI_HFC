import React, { useEffect, useState,useContext } from 'react';
import './viewmodal.css';
import rightArrow from '../../../Assets/rightArrow.svg'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Statecontext from '../../Context/Statecontext';

function ViewModal({ data, modalOpen, setModalOpen }) {

    const [folderName, setFolderName] = useState([]);
    const [showFiles, setFiles] = useState(false);
    const [filesName, setFilesName] = useState([]);
    const [showColumns, setShowColumns] = useState(false);
    const [columnName, setColumnName] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchcolumnName, setSearchcolumnName] = useState([]);

    const [contentIdForsearch, SetcontentIdForsearch] = useState('');

    const [userNameForsearch, SetuserNameForsearch] = useState('');
const {apiBaseurl} = useContext(Statecontext);

const username=sessionStorage.getItem("userId");
    const getFolderName = async () => {
        try {
            const ApiToUse = `${apiBaseurl}api/Admin/GetFoldersWithPermissions`

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
            const ApiToUse = `${apiBaseurl}api/Admin/filesInFolder?folderName=${filename}`

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
    // const userName = sessionStorage.getItem('userId')

    const getColumns = async (items) => {
        console.log("-------------",data.username)
        try {
            const ApiToUse = `${apiBaseurl}api/Admin/GetFileFields?username=${data.username}&contentId=${items.contentId}`

            const response = await axios.get(ApiToUse, {
                withCredentials: true,
            })

            if (response.status === 200) {

                setColumnName(response.data);
                SetcontentIdForsearch(data.username);
                SetuserNameForsearch(items.contentId)
                setFiles(false);
                setSearchcolumnName(response.data);
                setShowColumns(true);
            } else {
                console.log("error", response)
            }

        } catch (error) {
            console.log("API ERROR", error)
        }
    }


    const handleCheckboxChange = async (item) => {

        const updatedItem = {
            username: item.usermame,
            contentId: item.contentId,
            fieldId: item.fieldId,
            view: item.view === 1 ? 0 : 1,
        };

        if (item.fieldName === "*") {
            // Update all checkboxes to the same value as the "Select All" checkbox
            const updatedItems = searchcolumnName.map((ele) => {
                if (ele.fieldName !== "*") {
                    return { ...ele, view: updatedItem.view };
                }
                return ele;
            });
            setSearchcolumnName(updatedItems);
        } else {
            // Update the individual checkbox
            const updatedItems = searchcolumnName.map((ele) =>
                ele.fieldId === item.fieldId ? { ...ele, view: updatedItem.view } : ele
            );
            setSearchcolumnName(updatedItems);
        }
    
        try {
            const ApiToUse = `${apiBaseurl}api/Admin/updatefieldsaccess`;

            const response = await axios.post(ApiToUse, JSON.stringify(updatedItem), {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success(`Access Successfully Updated`, { theme: "colored" });

                setSearchcolumnName((prevSearchcolumnName) =>
                prevSearchcolumnName.map((ele) =>
                    ele.fieldId === item.fieldId ? { ...ele, view: updatedItem.view } : ele
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

    

    useEffect(() => { fetchFilesBySearch(searchText) }, [searchText])

    const fetchFilesBySearch = async (searchText) => {
        if (searchText === '') {
            setSearchcolumnName(columnName);
        } else {
            try {
                const apiToFetch = `${apiBaseurl}api/AdminFilter/GetColumnNamesBySearch?username=${contentIdForsearch}&contentId=${userNameForsearch}&filter=${searchText}`;
                const response = await axios.get(apiToFetch, {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setSearchcolumnName(response.data);
                } else {
                    console.log("Something went wrong", response);
                }
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        }
    };


    const handleSave = () => {
        toast.success(`Access Successfully Updated`, { theme: "colored" });
        setModalOpen(false)
    }

    useEffect(() => { getFolderName() }, [])


    return (
        <div className={`modal ${modalOpen ? 'open' : ''}`}>
            <ToastContainer />
            <div className="modal-contents">

                <div className='headersSectionModal'>

                    <div className='headersSectionModalText'>
                        {showFiles === false ? showColumns === true ? <p>{`Select Columns`}</p> : <p>{`Select Folder`}</p> : <p>{`Select Files`}</p>}
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

                                <div style={{ paddingLeft: "1vw" }} onClick={() => getFilesName(ele)}>
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

                                <div style={{ paddingLeft: "1vw" }} onClick={() => getColumns(ele)}>
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
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            ></Input>
                        </div>

                        <div className='headersSectionModalBodysecColumnsOverflow'>

                            {searchcolumnName && searchcolumnName.length > 0 &&
                                Object.values(searchcolumnName).map((ele) =>
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
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>}
            </div>
        </div>
    );
}

export default ViewModal;
