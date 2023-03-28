import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface Modules {
  modID : number;
  projectName: string;
  phaseName: string;
  modules: string[];

}

const data: Modules[] = [
  {
    modID : 0,
    projectName: "",
    phaseName: "",
    modules:[ "", ""]

  },

];

const ViewModuleTable: React.FC = () => {
  const [modulesArr, setModulesArr] = useState<Modules[]>([]);

  console.log(modulesArr,"uuuu");


  useEffect(() => {
    // Fetch employees from the backend API
    axios.get<Modules[]>("http://localhost:5000/get/modules").then((response) => {
      console.log(response.data);
      const sortedData = response.data.sort((a, b) => Number(b.modID) - Number(a.modID));

      setModulesArr(sortedData);
    });
  }, []);

  const handleEdit = (employeeId: string) => {
    // Handle edit functionality
  };

  const handleDelete = (modID: string) => {
    console.log(`Delete employee with id ${modID}`);
    // Handle delete functionality
    axios.delete(`http://localhost:5000/delete/module/${modID}`)
    .then(response => {
      console.log(response.data,"88------");
      // do something with the response data
    setModulesArr(modulesArr.filter((module) => module.modID !== Number(modID)))
    })
    .catch(error => {
      console.log(error);
      // handle the error
    });
    // Handle delete functionality



    // phase.phaseID !== phaseID
    // ));




  };

  const columns = [
    // {
    //   title: "client",
    //   dataIndex: "client",
    //   key: "client",
    //   render: (text: string) => <div style={{}}>{text}</div>,
    // },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    {
      title: "phase",
      dataIndex: "phaseName",
      key: "phaseName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    {
      title: "modules",
      dataIndex: "modules",
      key: "modules",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    // {
    //   title: "Est. Time (hrs)",
    //   dataIndex: "estTime",
    //   key: "estTime",
    //   render: (text: string) => <div style={{}}>{text}</div>,
    // },
    // {
    //   title: "Act. Time (hrs)",
    //   dataIndex: "actTime",
    //   key: "actTime",
    //   render: (text: string) => <div style={{}}>{text}</div>,
    // },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Modules) => (
        <span>
         <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.modID.toString())}>

            {/* Edit */}
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.modID.toString())}>

            {/* Delete */}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
      dataSource={modulesArr.length > 0 ? modulesArr : data}
      columns={columns}
      // Add background color to the table header row
      rowClassName={() => "header-row"}

    />
{/* <div style={{marginTop:'0px', marginLeft:'38%'}}>
    <span style={{}}> total hrs : </span>
    <span style={{marginLeft:'4%'}}>  500</span>

    <span style={{marginLeft:'18%'}}>  800</span>
    </div> */}
    </>

  );
};

export default ViewModuleTable;
