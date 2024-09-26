import React, { useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const datasets = {
  user1: [
    { name: '0', eps15: 100, eps22: 100, eps25: 100, edge15: 100, required: 120 },
    { name: '1', eps15: 98, eps22: 99, eps25: 100, edge15: 100, required: 120 },
    { name: '2', eps15: 97, eps22: 99, eps25: 100, edge15: 100, required: 120 },
    { name: '3', eps15: 96, eps22: 98, eps25: 100, edge15: 100, required: 120 },
    { name: '4', eps15: 95, eps22: 98, eps25: 100, edge15: 100, required: 120 },
    { name: '5', eps15: 95, eps22: 100, eps25: 100, edge15: 100, required: 120 },
    { name: '6', eps15: 92, eps22: 99, eps25: 100, edge15: 100, required: 120 },
    { name: '7', eps15: 90, eps22: 98, eps25: 100, edge15: 100, required: 120 },
    { name: '8', eps15: 88, eps22: 95, eps25: 100, edge15: 100, required: 120 },
    { name: '9', eps15: 87, eps22: 95, eps25: 100, edge15: 100, required: 120 },
    { name: '10', eps15: 85, eps22: 90, eps25: 100, edge15: 100, required: 120 },
    { name: '11', eps15: 80, eps22: 88, eps25: 100, edge15: 98, required: 120 },
    { name: '12', eps15: 78, eps22: 85, eps25: 100, edge15: 95, required: 120 },
    { name: '13', eps15: 76, eps22: 83, eps25: 95, edge15: 93, required: 120 },
    { name: '14', eps15: 75, eps22: 81, eps25: 95, edge15: 90, required: 120 },
    { name: '15', eps15: 75, eps22: 80, eps25: 95, edge15: 90, required: 120 },
    { name: '16', eps15: 72, eps22: 77, eps25: 93, edge15: 88, required: 120 },
    { name: '17', eps15: 70, eps22: 75, eps25: 90, edge15: 85, required: 120 },
    { name: '18', eps15: 68, eps22: 72, eps25: 88, edge15: 83, required: 120 },
    { name: '19', eps15: 65, eps22: 70, eps25: 85, edge15: 80, required: 120 },
    { name: '20', eps15: 50, eps22: 70, eps25: 80, edge15: 80, required: 120 },
    { name: '21', eps15: 48, eps22: 65, eps25: 78, edge15: 75, required: 120 },
    { name: '22', eps15: 45, eps22: 60, eps25: 75, edge15: 72, required: 120 },
    { name: '23', eps15: 40, eps22: 58, eps25: 70, edge15: 70, required: 120 },
    { name: '24', eps15: 35, eps22: 45, eps25: 65, edge15: 55, required: 120 },
    { name: '25', eps15: 30, eps22: 40, eps25: 60, edge15: 50, required: 120 },
  ],
  user2: [
    { name: '0', eps15: 120, eps22: 110, eps25: 105, edge15: 100, required: 130 },
    { name: '1', eps15: 118, eps22: 108, eps25: 104, edge15: 100, required: 130 },
    { name: '2', eps15: 116, eps22: 107, eps25: 103, edge15: 100, required: 130 },
    { name: '3', eps15: 115, eps22: 106, eps25: 102, edge15: 100, required: 130 },
    { name: '4', eps15: 114, eps22: 105, eps25: 101, edge15: 100, required: 130 },
    { name: '5', eps15: 115, eps22: 100, eps25: 100, edge15: 100, required: 130 },
    { name: '6', eps15: 112, eps22: 98, eps25: 99, edge15: 100, required: 130 },
    { name: '7', eps15: 110, eps22: 97, eps25: 98, edge15: 100, required: 130 },
    { name: '8', eps15: 108, eps22: 95, eps25: 97, edge15: 100, required: 130 },
    { name: '9', eps15: 107, eps22: 92, eps25: 96, edge15: 100, required: 130 },
    { name: '10', eps15: 105, eps22: 90, eps25: 95, edge15: 100, required: 130 },
    { name: '11', eps15: 100, eps22: 85, eps25: 93, edge15: 98, required: 130 },
    { name: '12', eps15: 95, eps22: 80, eps25: 91, edge15: 96, required: 130 },
    { name: '13', eps15: 92, eps22: 78, eps25: 90, edge15: 94, required: 130 },
    { name: '14', eps15: 90, eps22: 76, eps25: 88, edge15: 92, required: 130 },
    { name: '15', eps15: 95, eps22: 80, eps25: 90, edge15: 90, required: 130 },
    { name: '16', eps15: 85, eps22: 75, eps25: 88, edge15: 88, required: 130 },
    { name: '17', eps15: 80, eps22: 70, eps25: 85, edge15: 85, required: 130 },
    { name: '18', eps15: 75, eps22: 68, eps25: 83, edge15: 83, required: 130 },
    { name: '19', eps15: 70, eps22: 65, eps25: 80, edge15: 80, required: 130 },
    { name: '20', eps15: 80, eps22: 70, eps25: 75, edge15: 80, required: 130 },
    { name: '21', eps15: 70, eps22: 68, eps25: 73, edge15: 78, required: 130 },
    { name: '22', eps15: 65, eps22: 65, eps25: 70, edge15: 75, required: 130 },
    { name: '23', eps15: 60, eps22: 60, eps25: 68, edge15: 70, required: 130 },
    { name: '24', eps15: 55, eps22: 55, eps25: 65, edge15: 65, required: 130 },
    { name: '25', eps15: 50, eps22: 50, eps25: 60, edge15: 60, required: 130 },
  ],
  user3: [
    { name: '0', eps15: 130, eps22: 120, eps25: 115, edge15: 110, required: 140 },
    { name: '1', eps15: 128, eps22: 118, eps25: 113, edge15: 110, required: 140 },
    { name: '2', eps15: 126, eps22: 116, eps25: 112, edge15: 110, required: 140 },
    { name: '3', eps15: 125, eps22: 115, eps25: 110, edge15: 110, required: 140 },
    { name: '4', eps15: 124, eps22: 114, eps25: 110, edge15: 110, required: 140 },
    { name: '5', eps15: 123, eps22: 113, eps25: 108, edge15: 110, required: 140 },
    { name: '6', eps15: 120, eps22: 110, eps25: 105, edge15: 110, required: 140 },
    { name: '7', eps15: 118, eps22: 108, eps25: 104, edge15: 110, required: 140 },
    { name: '8', eps15: 115, eps22: 105, eps25: 103, edge15: 110, required: 140 },
    { name: '9', eps15: 113, eps22: 102, eps25: 100, edge15: 110, required: 140 },
    { name: '10', eps15: 110, eps22: 100, eps25: 100, edge15: 110, required: 140 },
    { name: '11', eps15: 108, eps22: 98, eps25: 98, edge15: 108, required: 140 },
    { name: '12', eps15: 105, eps22: 95, eps25: 95, edge15: 105, required: 140 },
    { name: '13', eps15: 102, eps22: 93, eps25: 93, edge15: 103, required: 140 },
    { name: '14', eps15: 100, eps22: 90, eps25: 90, edge15: 100, required: 140 },
    { name: '15', eps15: 100, eps22: 90, eps25: 90, edge15: 100, required: 140 },
    { name: '16', eps15: 98, eps22: 88, eps25: 88, edge15: 98, required: 140 },
    { name: '17', eps15: 95, eps22: 85, eps25: 85, edge15: 95, required: 140 },
    { name: '18', eps15: 92, eps22: 82, eps25: 82, edge15: 92, required: 140 },
    { name: '19', eps15: 90, eps22: 80, eps25: 80, edge15: 90, required: 140 },
    { name: '20', eps15: 88, eps22: 75, eps25: 78, edge15: 88, required: 140 },
    { name: '21', eps15: 85, eps22: 73, eps25: 75, edge15: 85, required: 140 },
    { name: '22', eps15: 82, eps22: 70, eps25: 72, edge15: 82, required: 140 },
    { name: '23', eps15: 80, eps22: 68, eps25: 70, edge15: 80, required: 140 },
    { name: '24', eps15: 78, eps22: 65, eps25: 68, edge15: 78, required: 140 },
    { name: '25', eps15: 75, eps22: 60, eps25: 65, edge15: 75, required: 140 },
  ],
}

const ThroughputGraph = () => {
  const [selectedUser, setSelectedUser] = useState('user1');
  const [isMobile, setIsMobile] = useState(false);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <div>
      
      <h1>Throughput Graph</h1>
      <label htmlFor="userSelect">Select User: </label>
      <select id="userSelect" onChange={handleUserChange} value={selectedUser}>
        <option value="user1">User 1</option>
        <option value="user2">User 2</option>
        <option value="user3">User 3</option>
      </select>

      <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
        <LineChart
          data={datasets[selectedUser]} 
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis 
            dataKey="name"
            interval={isMobile ? 2 : 0} 
            tickFormatter={(tick) => tick} 
            label={{ value: 'Miles', position: 'insideBottom', offset: -5 }} 
          />
          
          <YAxis 
            tickCount={isMobile ? 8 : 12} 
            label={{ value: 'Throughput (Mbps)', angle: -90, position: 'insideLeft', offset: -10 }} 
          />

          <Tooltip />
          
          <Legend
            verticalAlign="top"
            align="center"
            layout="horizontal"
            wrapperStyle={{
              paddingBottom: "20px",
              display: isMobile ? 'none' : 'block',  
            }}
          />
          
          <Line type="linear" dataKey="eps15" stroke="#FFA500" activeDot={{ r: 8 }} />
          <Line type="linear" dataKey="eps22" stroke="#FF00FF" />
          <Line type="linear" dataKey="eps25" stroke="#00FFFF" />
          <Line type="linear" dataKey="edge15" stroke="#00FF00" />
          <Line type="linear" dataKey="required" stroke="#0000FF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThroughputGraph;
