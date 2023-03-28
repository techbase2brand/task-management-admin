import React, { useState, useEffect } from "react";

import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface Task {
    EvngTaskID: number;
  projectName: string;
  phaseName: string;
  module: string;
  task: string;
  estTime: string;
  upWorkHrs: number;
  employeeID: string;
  actTime: string;
}

interface Props {
  data: Task[][];
  totalUpwork: any;
  setTotalUpWork: React.Dispatch<React.SetStateAction<any>>
}

interface Employee {
  EmpID: string | number;
  firstName: string;
  role: string;
  dob: string | Date;
  EmployeeID: string;
}



const handleEdit = (EmpID: string | number) => {
  console.log(`Edit employee with id ${EmpID}`);
};

const EveningTasktable: React.FC<Props> = ({ data,totalUpwork, setTotalUpWork }) => {
  const [employeeArr, setEmployeeArr] = useState<any>([]);
  const [filteredEmployee, setFilteredEmployee] = useState<any>([]);


  const handleDelete = (EvngTaskID: number) => {
    // console.log(`Delete task with id ${MrngTaskID}`);

    axios
      .delete(`http://localhost:5000/delete/eveningDashboard/${EvngTaskID}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get<Employee[]>("http://localhost:5000/employees")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => Number(b.EmpID) - Number(a.EmpID)
        );

        console.log("-----------00000");
        console.log(data,"99999999---");


        // console.log(sortedData, "///////-----");

        // const employeeArray = sortedData?.map((e) => e.EmployeeID);
        setEmployeeArr(sortedData);

        // setData(sortedData)
      })
      .catch((error) => console.log(error));
  }, []);

  const arrayOfArray = Object.values(data);



  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Phase",
      dataIndex: "phaseName",
      key: "phaseName",
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      //   render: (dob: string | Date) => new Date(dob).toLocaleDateString(),
    },
    {
      title: "Est time (hrs)",
      dataIndex: "estTime",
      key: "estTime",
    },
    {
        title: "Act time (hrs)",
        dataIndex: "actTime",
        key: "actTime",
      },
    {
      title: "UpWork(hrs)",
      dataIndex: "upWorkHrs",
      key: "upWorkHrs",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: Task) => (
        <span>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.EvngTaskID)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];



  const totalMinutes = arrayOfArray.reduce((acc, curr) => {
    curr.forEach((obj) => {
      if (obj?.actTime) {
        const [hours, minutes] = obj.actTime.split(":").map(Number);
        const timeInMinutes = hours * 60 + minutes;
        acc += timeInMinutes;
      }
    });
    return acc;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;

  console.log(formattedTime,"ffffffffff-----------"); // prints the total time in hours:min format
// set the formattedTime value in local storage

setTotalUpWork(formattedTime)
console.log(totalUpwork,"gggjjjjj-----");

localStorage.setItem('formattedTime', formattedTime);


// console.log(sumOfActualTime); // prints the total time in minutes



// console.log(sumOfActualTime,"ffffff-----");

  const tables = arrayOfArray.map((e) => {
    const arr = employeeArr.filter((emp: any) => {
      return emp.EmployeeID === e[0].employeeID;
    }
    );

    return (
      <div key={e[0].EvngTaskID}>
        <p>{arr[0]?.firstName}</p>
        <Table
          dataSource={e}
          columns={columns}
          rowClassName={() => "header-row"}
        />
      </div>
    );
  });

  return <>{tables}</>;
};
export default EveningTasktable;
