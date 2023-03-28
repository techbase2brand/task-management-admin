import React, { useState, useEffect } from "react";

import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface Task {
  MrngTaskID: number;
  projectName: string;
  phaseName: string;
  module: string;
  task: string;
  estTime: string;
  upWorkHrs: number;
  employeeID: string;
}

interface Props {
  data: Task[][];
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

const TaskTable: React.FC<Props> = ({ data }) => {
  const [employeeArr, setEmployeeArr] = useState<any>([]);
  const [arrayOfArray, setArrayOfArray] = useState<any>([]);

  const handleDelete = (MrngTaskID: number) => {
    // console.log(`Delete task with id ${MrngTaskID}`);

    axios
      .delete(`http://localhost:5000/delete/morningDashboard/${MrngTaskID}`)
      .then((response) => {
        console.log(response.data);
        // setData(data)
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
        console.log(sortedData, "///////-----");

        const employeeArray = sortedData?.map((e) => e.EmployeeID);
        setEmployeeArr(sortedData);

        // setData(sortedData)
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const arrays = Object.values(data);

    setArrayOfArray(arrays);
  }, [data]);

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
            onClick={() => handleDelete(record.MrngTaskID)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const tables = arrayOfArray.map((e: any) => {
    const arr = employeeArr.filter((emp: any) => {
      return emp.EmployeeID === e[0].employeeID;
    });

    return (
      <div key={e[0].MrngTaskID}>
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
export default TaskTable;
