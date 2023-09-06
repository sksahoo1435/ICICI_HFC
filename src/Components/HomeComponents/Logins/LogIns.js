import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./Log-ins.css";

const LogIns = ({ setActiveTab }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      id: 1,
      name: "Item 1",
      description: "Description 1",
      isChecked: false,
      status: "Success",
    },
    {
      id: 2,
      name: "Item 2",
      description: "Description 2",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 3,
      name: "Item 3",
      description: "Description 3",
      isChecked: false,
      status: "Success",
    },
    {
      id: 4,
      name: "Item 4",
      description: "Description 4",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 5,
      name: "Item 1",
      description: "Description 1",
      isChecked: false,
      status: "Success",
    },
    {
      id: 6,
      name: "Item 2",
      description: "Description 2",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 7,
      name: "Item 3",
      description: "Description 3",
      isChecked: false,
      status: "Success",
    },
    {
      id: 8,
      name: "Item 4",
      description: "Description 4",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 9,
      name: "Item 1",
      description: "Description 1",
      isChecked: false,
      status: "Success",
    },
    {
      id: 10,
      name: "Item 2",
      description: "Description 2",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 11,
      name: "Item 3",
      description: "Description 3",
      isChecked: false,
      status: "Success",
    },
    {
      id: 12,
      name: "Item 4",
      description: "Description 4",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 13,
      name: "Item 1",
      description: "Description 1",
      isChecked: false,
      status: "Success",
    },
    {
      id: 14,
      name: "Item 2",
      description: "Description 2",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 15,
      name: "Item 3",
      description: "Description 3",
      isChecked: false,
      status: "Success",
    },
    {
      id: 16,
      name: "Item 4",
      description: "Description 4",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 17,
      name: "Item 1",
      description: "Description 1",
      isChecked: false,
      status: "Success",
    },
    {
      id: 18,
      name: "Item 2",
      description: "Description 2",
      isChecked: false,
      status: "Failed",
    },
    {
      id: 19,
      name: "Item 3",
      description: "Description 3",
      isChecked: false,
      status: "Success",
    },
    {
      id: 20,
      name: "Item 4",
      description: "Description 4",
      isChecked: false,
      status: "Failed",
    },

    // Add more data items as needed
  ]);

  const handleCheckboxChange = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
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
        >
          <div>
            <ArrowBackIosIcon style={{ height: "2vh", color: "#063E67" }} />
          </div>
          <div className="text-sm mt-1 font-semibold text-[#063E67]">
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
                  <td className="py-2 px-4 border">{item.id}</td>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.description}</td>
                  <td className="py-2 px-4 border">true</td>
                  <td
                    className={`py-2 px-4 border ${
                      item.status === "Success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="buttons" className="my-5">
          <div className="absolute right-0 px-[5vw]">
            <button className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]">
              <p style={{color:"white"}}>Download</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIns;
