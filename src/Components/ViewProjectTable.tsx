import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface Project {
  ProID: string | number;
  clientName: string;
  projectName: string;
  projectDescription: string;
  // costBefore: number;
  // costAfter: number;
  // estTime: number;
  // actTime: number;
}


interface Props {
  projEditObj: Project | undefined;
  setProjEditObj: React.Dispatch<React.SetStateAction<Project | undefined>>;
}

const ViewProjectTable: React.FC<Props> = ({projEditObj,setProjEditObj}) => {
  const [data, setData] = useState<Project[]>([]);
  const navigate = useNavigate();



  console.log(data, "-------");

  useEffect(() => {
    axios
      .get<Project[]>("http://localhost:5000/get/projects")
      .then((response) => {
        // sort the data array in reverse order based on ProID
        const sortedData = response.data.sort((a, b) => Number(b.ProID) - Number(a.ProID));
        setData(sortedData);
      });
  }, []);


  const handleEdit = (ProID: string | number) => {

console.log(ProID,"kkkkkkgggg---");

const filteredObj = data.filter((obj)=>obj.ProID === ProID)
console.log();

setProjEditObj(filteredObj[0])

navigate("/add-project");


  };

  const handleDelete = (projectId: string | number) => {
    console.log(`Delete project with id ${projectId}`);

    axios.delete(`http://localhost:5000/project/${projectId}`)
    .then(response => {
      console.log(response.data);
      // do something with the response data
    })
    .catch(error => {
      console.log(error);
      // handle the error
    });
    // Handle delete functionality

    setData(data.filter((project) => project.ProID !== projectId));
  };

  const columns = [
    {
      title: "Client",
      dataIndex: "clientName",
      key: "clientName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    // {
    //   title: "projectDescription",
    //   dataIndex: "projectDescription",
    //   key: "projectDescription",
    //   render: (text: string) => <div style={{}}>{text}</div>,
    // },
    // {
    //   title: "Cost Before",
    //   dataIndex: "costBefore",
    //   key: "costBefore",
    //   render: (text: number) => <div style={{}}>{text}</div>,
    // },
    // {
    //   title: "Cost After",
    //   dataIndex: "costAfter",
    //   key: "costAfter",
    //   render: (text: number) => <div style={{}}>{text}</div>,
    // },
    // {
    //   title: "Est. Time (hrs)",
    //   dataIndex: "estTime",
    //   key: "estTime",
    //   render: (text: number) => <div style={{}}>{text}</div>,
    // },
    // {
    //   title: "Act. Time (hrs)",
    //   dataIndex: "actTime",
    //   key: "actTime",
    //   render: (text: number) => <div style={{}}>{text}</div>,
    // },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Project) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.ProID)}
          >
            {/* Edit */}
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.ProID)}
          >
            {/* Delete */}
          </Button>
        </span>
      ),
    },
  ];

  // const totalEstTime = data.reduce((acc, project) => acc + project.estTime, 0);
  // const totalActTime = data.reduce((acc, project) => acc + project.actTime, 0);

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowClassName={() => "header-row"}
      />
      {/* <div style={{ marginTop: "-4%", marginLeft: "44%" }}>
        <span style={{ marginLeft: "5%" }}>total est. time:</span>
        <span style={{}}> {totalEstTime}</span>

        <span style={{ marginLeft: "25%" }}>total act. time:</span>
        <span style={{}}> {totalActTime}</span>
      </div> */}
    </>
  );
};

export default ViewProjectTable;
