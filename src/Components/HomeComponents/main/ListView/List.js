import React, { useEffect, useState } from 'react'
import "./List.css"
import SingleRow from './singleRow/SingleRow'
import axios from 'axios';


const List = ({ fileView, setFileView }) => {
  const [pdata, setPdata] = useState([{}]);


  useEffect(() => {

    async function fetchData() {
      try {


        let result1 = await axios.get(
          `https://localhost:7062/api/ReportingModule/GetFoldersWithPermissions`,
          {
            withCredentials: true // Add this line
          }
        );

        console.log("data to show", result1.data);
        let pro = result1.data;
        setPdata(pro);
        console.log("pdata:", pdata);
      } catch (error) {
        // Handle error if necessary
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div className="listView">
        <table className='myTable'>
          <thead>
            <tr className="HeadingRow">
              <th>Name</th>
              <th>Date Modified</th>
              <th>Type</th>

            </tr>

          </thead>
          <tbody>
            {pdata.map((item) => {
              console.log(item);


              return (
                //column

                <SingleRow heading={item.folderName} onClick={() => { setFileView(true) }} dateModified={item.lastModifiedDate} type={"File Folder"} />

              );
            })}

          </tbody>
        </table>
      </div>
    </>
  )
}

export default List
