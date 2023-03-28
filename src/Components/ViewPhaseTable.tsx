import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


interface Phases {
  phaseID : number;
  projectName: string;
  phases: string[];

}

const data: Phases[] = [
  {
    phaseID : 0,
    projectName: "",
    phases:[ "", ""]

  },

];

interface Props {
  phasejEditObj: Phases | undefined;
  setPhasejEditObj: React.Dispatch<React.SetStateAction<Phases | undefined>>;
}

const ViewPhaseTable: React.FC<Props> = ({phasejEditObj,setPhasejEditObj}) => {
  const [phaseArr, setphaseArr] = useState<Phases[]>([]);

  const navigate = useNavigate();


  useEffect(() => {
    // Fetch employees from the backend API
    axios.get<Phases[]>("http://localhost:5000/get/phases").then((response) => {
      const sortedData = response.data.sort((a, b) => Number(b.phaseID) - Number(a.phaseID));
      setphaseArr(sortedData);
    });
  },[phaseArr] );

  const handleEdit = (phaseID: number) => {

console.log(phaseID,"gggg---yyyy");

const filteredObj = phaseArr.filter((obj)=>obj.phaseID === phaseID)
console.log();

setPhasejEditObj(filteredObj[0])

navigate("/add-phase");




    // Handle edit functionality
  };

  const handleDelete = (phaseID: string) => {
    console.log(`Delete employee with id ${phaseID}`);


    axios.delete(`http://localhost:5000/delete/phase/${phaseID}`)
    .then(response => {
      console.log(response.data);
      // do something with the response data
    })
    .catch(error => {
      console.log(error);
      // handle the error
    });
    // Handle delete functionality

    setphaseArr(phaseArr.filter((phase) => console.log(phase,"----")


    // phase.phaseID !== phaseID
    ));
    // Handle delete functionality
  };

  const columns = [
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text: string) => <div style={{}}>{text}</div>,
    },
    {
      title: "phases",
      dataIndex: "phases",
      key: "phases",
      render: (text: string) => <div style={{}}>{text}</div>,
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: Phases) => (
        <span>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.phaseID)}>

            {/* Edit */}
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.phaseID.toString())}
          >
            {/* Delete */}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
      dataSource={phaseArr.length > 0 ? phaseArr : data}
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

export default ViewPhaseTable;
