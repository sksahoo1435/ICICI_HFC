import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./Log-ins.css";
import axios from "axios";
import Papa from "papaparse";

const LogIns = ({ setActiveTab }) => {
  const [data, setData] = useState([]);

  const loginDetails = async () => {
    try {
      const ApiTofetch = `https://localhost:7062/api/Admin/GetAllUserLogs`;

      const response = await axios.get(ApiTofetch, {
        withCredentials: true,
      });

      console.log("response are", response);

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log("API ERROR", response);
      }
    } catch (error) {
      console.log("The API error is", error);
    }
  };

  useEffect(() => {
    loginDetails();
  }, []);

  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `userLoginDetails.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="px-[5vw]" style={{ marginTop: "-2vh" }}>
        <div
          id="top-navs"
          className="flex hover:underline"
          onClick={() => {
            setActiveTab(0);
          }}
          style={{ width: "13vw" }}
        >
          <div>
            <ArrowBackIosIcon style={{ height: "2vh", color: "#063E67" }} />
          </div>
          <div className="back_home_page" style={{marginTop:"2vh"}}>
            Back To Home Page
          </div>
        </div>

        <div className="table-container_login">
          <table className="table_login">
            <thead className="tableHead_login">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Last Logged In</th>
                <th className="py-2 px-4 border">Event Status</th>
              </tr>
            </thead>
            <tbody className="tableBody_login">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className={item.id % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="tableBody_login_td">
                    {new Date(item.formattedDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="tableBody_login_td">{item.formattedTime}</td>
                  <td className="tableBody_login_td">{item.username}</td>
                  <td className="tableBody_login_td">
                    {new Date(item.formattedLastLoggedIn).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                  
                  <td
                    className={`tableBody_login_td ${
                      item.eventStatus === "Successful"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.eventStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="buttons" className="my-5">
          <div className="absolute right-0 px-[5vw]">
            <button
              className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]"
              onClick={handleDownload}
            >
              <p style={{ color: "white" }}>Download</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIns;
