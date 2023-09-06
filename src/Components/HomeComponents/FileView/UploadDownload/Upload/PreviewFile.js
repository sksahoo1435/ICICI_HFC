import React, { useState } from 'react'
import './preview.css';
import * as XLSX from 'xlsx';
import axios from 'axios';

const PreviewFile = ({ handlePreview, file, progressbarHandler }) => {

    const [data, setData] = useState([]);

    const columns = [
        { Header: 'AccountHolder', accessor: 'AccountHolder' },
        { Header: 'TransactionType', accessor: 'TransactionType' },
        { Header: 'Amount', accessor: 'Amount' },
        { Header: 'TransactionDate', accessor: 'TransactionDate' },
    ];

    const btnHanlder = (e) => {
        console.log(columns)
        const resultbtn = e === 'back' ? true : false;

        handlePreview(resultbtn, e)
    }

    if (file) {
        const reader = new FileReader();
        // console.log(columns)
        reader.onload = async (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const formattedData = excelData.slice(1).map((row) => ({
                AccountHolder: row[0],
                TransactionType: row[1],
                Amount: row[2],
                TransactionDate: row[3],
            }));

            setData(formattedData);

        }
        reader.readAsBinaryString(file);
    }

    const handleConfirm = async () => {

        const filename = sessionStorage.getItem('FileName');
        const userId = sessionStorage.getItem('userId');

        const fdata = data.map(item => {
            const convertedItem = {};
            for (const key in item) {
                let convertedValue = item[key];
                if (key === "Amount") {
                    convertedValue = JSON.stringify(item[key]);
                }
                else if (key === "TransactionDate") {
                    const transactionDate = new Date(item[key]);
                    const formattedTransactionDate = transactionDate.toISOString(); // or use any other desired format
                    convertedValue = formattedTransactionDate;

                }
                convertedItem[key] = convertedValue;
            }
            return convertedItem;
        });


        const sendFileToDb = `https://localhost:7062/api/ReportingModule/InsertUploadData/${userId}/${filename}`;

        try {
            const response = await axios.post(
                sendFileToDb,
                fdata,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 200) {
                
                progressbarHandler(true);
            } else {
               
                progressbarHandler(false);
                new Error('This file is not matched with the API')
                
            }
        } catch (error) {
            console.error('Error:', error);
    
            // Handle the error gracefully without crashing the app
            progressbarHandler(false);
            new Error('This file is not matched with the API')
        }
    };


    return (
        <div className='previewContainer'>

            <div className='previewtext'>
                <p>Preview</p>
            </div>

            <div className='previewTable'>

                <table className="w-full border-collapse border rounded-xl overflow-hidden shadow-lg" >
                    <thead className="bg-[#F36523] text-white ">
                        <tr>
                            <th className="py-2 px-4 border">AccountHolder</th>
                            <th className="py-2 px-4 border">TransactionType</th>
                            <th className="py-2 px-4 border">Amount</th>
                            <th className="py-2 px-4 border">TransactionDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map((ele, ind) =>
                            <tr key={ind}>

                                {Object.entries(ele).map(([keys, item]) =>
                                    <td className="py-2 px-4 border"  >
                                        <p style={{ display: "flex", justifyContent: "center" }}>{keys === 'TransactionDate' ? new Date(item).toLocaleDateString() : item}</p>
                                    </td>)}

                            </tr>)}
                    </tbody>
                </table>

                {/* <table>
                    <thead>
                        <tr>
                            <th>AccountHolder</th>
                            <th>TransactionType</th>
                            <th>Amount</th>
                            <th>TransactionDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data).map((ele, ind) =>
                            <tr key={ind}>
                                {Object.values(ele).map(item => <td>{item}</td>)}

                            </tr>)}
                    </tbody>
                </table> */}
            </div>

            <div className='previewButton'>

                <div className='back-btn'>
                    <button onClick={(e) => { btnHanlder('back') }}>Back</button>
                </div>

                <div className='con-btn'>
                    <button onClick={(e) => { btnHanlder('confirm'); handleConfirm(); }} >Confirm</button>
                </div>

            </div>

        </div>
    )
}

export default PreviewFile