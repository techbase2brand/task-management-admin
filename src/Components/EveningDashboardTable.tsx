import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;


interface EveningDashboardTableProps {
    totalUpwork: any;
    setTotalUpWork: React.Dispatch<React.SetStateAction<any>>;
  }

const EveningDashboardTable: React.FC<EveningDashboardTableProps> = ({ totalUpwork, setTotalUpWork }) => {
  const [manager, setManager] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  const [isEvening, setIsEvening] = useState(true);
  const [upWorkTime, setupWorkTime] = useState<any>('');
  const [activeButton, setActiveButton] = useState('');



  const handleButton1Click = () => {
    setActiveButton('button1');
    // setIsEvening(!isEvening);
    const route = isEvening ? '/dashboard' : '/EveningDashboard';
    navigate(route);

  }

  const handleButton2Click = () => {
    setActiveButton('button2');
  }


  const navigate = useNavigate();

  const managerMenu = (
    <Menu onClick={({ key }) => setManager(key)}>
      <Menu.Item key="vikash">Vikash</Menu.Item>
      <Menu.Item key="tom">Tom</Menu.Item>
      <Menu.Item key="jerry">Jerry</Menu.Item>
      <Menu.Item key="trump">Trump</Menu.Item>
    </Menu>
  );

  const teamLeadMenu = (
    <Menu onClick={({ key }) => setTeamLead(key)}>
      <Menu.Item key="ajay">Ajay</Menu.Item>
      <Menu.Item key="suresh">Suresh</Menu.Item>
      <Menu.Item key="ramesh">Ramesh</Menu.Item>
    </Menu>
  );

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setDate(date);
    }
  };

  const handleMorningEveningButtonClick = () => {
    setIsEvening(!isEvening);
    const route = isEvening ? '/dashboard' : '/EveningDashboard';
    navigate(route);
  };

  // retrieve the formattedTime value from local storage
const formattedTime = localStorage.getItem('formattedTime');
console.log(typeof formattedTime ,"ssss----");
console.log(totalUpwork,"mmmm-----nnnn");


useEffect(()=>{



setupWorkTime(formattedTime);
console.log(upWorkTime,"jjjj----");

},[])

console.log(formattedTime,"hhhh----------");


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '85vw',
        marginTop: '3%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Dropdown overlay={managerMenu}>
          <Button className="nav-dropDown" style={{ width: '120px' }}>
            Manager: {manager}
          </Button>
        </Dropdown>
        <Dropdown overlay={teamLeadMenu}>
          <Button className="nav-dropDown" style={{ paddingInline: '10px' }}>
            Team Lead: {teamLead}
          </Button>
        </Dropdown>
        <Button type="primary" className="go-btn" style={{ width: '50px', paddingInline: '10px' }}>
          Go
        </Button>
        {/* <Button
        className="nav-proj-btn"
          type="primary"
          onClick={handleMorningEveningButtonClick}
          style={{ paddingInline: '10px' }}
        >
          {isEvening ? 'Morning' : 'Evening'}
        </Button> */}

<div>
      <button onClick={handleButton1Click} className={activeButton === 'button1' ? 'red' : ''}>Button 1</button>
      <button onClick={handleButton2Click} className={activeButton === 'button2' ? 'blue' : ''}>Button 2</button>
    </div>
        <DatePicker
          value={date}
          className="nav-date"
          style={{
            background: '#FFFFFF',
            border: '1px solid #BEBEBE',
            borderRadius: '99px',
            width: '120px',
          }}
          onChange={handleDateChange}
        />
        {/* <Button className="nav-proj-btn" type="primary" style={{ marginLeft: 8 }}>
          Morning/Evening
        </Button> */}
        <span className='nav-hrs-estimate'> Act. Time : {totalUpwork} hrs</span>
      {/* </div> */}
    </div>
    </div>
  );
};

export default EveningDashboardTable;
