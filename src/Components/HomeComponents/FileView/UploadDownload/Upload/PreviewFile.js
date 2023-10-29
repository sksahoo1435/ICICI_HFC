import React, { useContext, useState } from 'react';
import './preview.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Statecontext from '../../../../Context/Statecontext';


const PreviewFile = ({ handlePreview, file, progressbarHandler, columnForPrev }) => {
    const [data, setData] = useState([]);

    const { fileNameForUpload, setIsUploadTrue, apiBaseurl } = useContext(Statecontext);

    const btnHandler = (e) => {
        const resultbtn = e === 'back' ? true : false;
        handlePreview(resultbtn, e);
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const formattedData = excelData.slice(1).map((row) => {
                const formattedRow = {};
                columnForPrev.forEach((column, index) => {
                    formattedRow[column.columnName] = row[index];
                });
                return formattedRow;
            });
            setData(formattedData);
        };
        reader.readAsBinaryString(file);
    }
    console.log("aaaa", columnForPrev)
    const dateColumns = columnForPrev

        .filter((column) => column.dataType === 'date')

        .map((column) => column.columnName);


    const handleConfirm = async () => {
        const filename = fileNameForUpload;
        const userId = sessionStorage.getItem('userId');

        const excludedColumns = ["Username", "UploadedDate"];

        const formattedDataWithoutExcludedColumns = data.map((item) => {
            const convertedItem = {};

            for (const key in item) {
                if (!excludedColumns.includes(key)) {
                    let convertedValue = item[key];
                    const column = columnForPrev.find((col) => col.columnName === key);

                    if (column) {
                        if (column.dataType === 'date') {
                           // const transactionDate = new Date(item[key]);
                            const date = new Date(1900, 0, item[key] - 1);
                            const days = date.getDate();
                            const month = date.getMonth() + 1; // Month is 0-based, so add 1
                            const year = date.getFullYear();
                            // Format the date as "DD/MM/YYYY"
                            const formattedDate = `${days}/${month}/${year}`;
                    
                           // const formattedTransactionDate = transactionDate.toISOString();

                           // convertedValue = `${formattedTransactionDate}`;
                           convertedValue=`${formattedDate}`;
                            console.log("confirmvalue",formattedDate)
                        } else if (column.dataType !== 'string') {
                            convertedValue = `${JSON.stringify(item[key])}`;
                        } else {
                            convertedValue = `${item[key]}`;
                        }
                    } else {
                        convertedValue = `${item[key]}`;
                    }

                    convertedItem[key] = convertedValue;
                }
            }

            return convertedItem;
        });
        const sendFileToDb = `${apiBaseurl}api/ReportingModule/InsertUploadData/${userId}/${filename}`;
console.log("msg",formattedDataWithoutExcludedColumns)
        try {
            const response = await axios.post(sendFileToDb, formattedDataWithoutExcludedColumns, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("msgoutput",response)
            if (response.status === 200) {
                console.log("going")
                progressbarHandler(true);
                setIsUploadTrue(true);
            } else {
                progressbarHandler(false);
                new Error('This file is not matched with the API');
                setIsUploadTrue(true)
            }
        } catch (error) {
            console.error('Error:', error);
            progressbarHandler(false);
            new Error('This file is not matched with the API');
            setIsUploadTrue(false);

        }
    };

    const formatDateFromString = (dateString) => {
        //  const date=new Date(dateString);
        const date = new Date(1900, 0, dateString - 1);
        const days = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-based, so add 1
        const year = date.getFullYear();
        // Format the date as "DD/MM/YYYY"
        const formattedDate = `${days}/${month}/${year}`;

        
        return formattedDate;
    }


    return (
        <div className="previewContainer">
            <div className="previewtext">
                <p>Preview</p>
            </div>

            <div className="previewTable">
                <table className="w-full border-collapse border rounded-xl overflow-hidden shadow-lg">
                    <thead className="bg-[#F36523] text-white">
                        <tr>
                            {columnForPrev.map((column, index) => (
                                <th className="py-2 px-4 border" key={index}>
                                    {column.columnName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columnForPrev.map((column, colIndex) => (
                                    <td className="py-2 px-4 border" key={colIndex}>
                                        <p style={{ display: 'flex', justifyContent: 'center' }}>
                                            {dateColumns.includes(column.columnName)
                                                ? formatDateFromString(row[column.columnName])
                                                // ?  new Date(row[column.columnName]).toLocaleDateString('en-US')
                                                : row[column.columnName]
                                            }
                                        </p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="previewButton">
                <div className="back-btn">
                    <button onClick={() => btnHandler('back')}>Back</button>
                </div>

                <div className="con-btn">
                    <button onClick={() => { btnHandler('confirm'); handleConfirm(); }}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default PreviewFile;
