import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import * as echarts from 'echarts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

Modal.setAppElement('#root');

const Charts = ({ setIsPopupOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('Line');
  const [chartCmsModelIsOpen, setChartCmsModelIsOpen]=useState(false);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';

  //for x values
  const [organizationx,setOrganizationx]=useState('Organization1');
  const [plantx,setPlantx]=useState('Plant1');
  const [blockx,setBlockx]=useState('Block1');
  const [devicex,setDevicex]=useState('Device1');
  const [parameterx,setParameterx]=useState('Active Power');

  // for Y values
  const [organizationy,setOrganizationy]=useState('Organization1');
  const [planty,setPlanty]=useState('Plant1');
  const [blocky,setBlocky]=useState('Block1');
  const [devicey,setDevicey]=useState('Device1');
  const [parametery,setParametery]=useState('Parameter1');

  const [xAxisName, setXAxisName] = useState('Active Power');
  const [yAxisName, setYAxisName] = useState('Temperature');


  const openModal = () => {
    setModalIsOpen(true);
    setIsPopupOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsPopupOpen(false);
  };

  const openChartCmsModel=()=>{
    setChartCmsModelIsOpen(true);
  }
  const closeChartCmsModel=()=>{
    setChartCmsModelIsOpen(false);
  }

  const handleSaveChartCms = () => {
    // const finalContent = displayOption === 'api' ? apiData : textBoxContent;
    // if (onChange && typeof onChange === 'function') {
    //   onChange({ target: { value: finalContent } }); // Ensure you're passing an object with target and value
    // }
    closeChartCmsModel();
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('/assets/db.json');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     console.log("data", data);

  //     const formattedData = chartType === 'Scatter'
  //       ? data.values.map(value => [value.x, value.y])
  //       : data.values;

  //     setChartData({
  //       labels: chartType !== 'Scatter' ? data.labels : [],
  //       datasets: [
  //         {
  //           type: chartType.toLowerCase(),
  //           data: formattedData,
  //           name: `${chartType} Plot`,
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };


  // const renderChart = () => {
  //   if (!chartData || !chartRef.current) return;
  
  //   const chartInstance = echarts.init(chartRef.current);
  
  //   // Define basic chart options
  //   let option = {
  //     color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452'],
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: '{a} <br/>{b}: {c} ({d}%)'
  //     },
  //     series: [],
  //   };
  
  //   // Configure options based on chart type
  //   if (chartType === 'Pie') {
  //     option.series.push({
  //       name: chartData.datasets[0].name,
  //       type: 'pie',
  //       data: chartData.labels.map((label, index) => ({
  //         value: chartData.datasets[0].data[index],
  //         name: label
  //       })),
  //       radius: '70%',
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.5)'
  //         }
  //       }
  //     });
  //   } else {
  //     option.xAxis = {
  //       type: 'category',
  //       data: chartData.labels
  //     };
  //     option.yAxis = {
  //       type: 'value'
  //     };
  //     option.series.push({
  //       name: chartData.datasets[0].name,
  //       type: chartType.toLowerCase(),
  //       data: chartData.datasets[0].data,
  //       symbolSize: chartType === 'Scatter' ? 10 : undefined,
  //     });
  //   }
  
  //   // Render the chart
  //   chartInstance.setOption(option);
  //   chartInstanceRef.current = chartInstance;
  // };
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/chart-cms'); // Fetch the full data from the server
      const data = response.data;
      console.log("Response data:", data);
  
      // Find the relevant parameter data based on provided parameters
      const organization = data[0].organizations.find(org => org.name === organizationx);
      if (!organization) throw new Error("Organization not found");
  
      const plant = organization.plants.find(p => p.name === plantx);
      if (!plant) throw new Error("Plant not found");
  
      const block = plant.blocks.find(b => b.name === blockx);
      if (!block) throw new Error("Block not found");
  
      const device = block.devices.find(d => d.name === devicex);
      if (!device) throw new Error("Device not found");
  
      const parameter = device.parameters.find(p => p.name === xAxisName);
      if (!parameter) throw new Error("Parameter not found");
  
      // Extract the values
      const values = parameter.values;
      console.log("Extracted values:", values);
  
      // Map values to formatted data
      const formattedData = values.map(item => ({
        x: item.timestamp,  // Use timestamp as x-axis value
        y: item.value       // Use value as y-axis value
      }));
  
      console.log("Formatted data:", formattedData);
  
      setChartData({
        labels: formattedData.map(item => item.x), // Use timestamp for labels
        datasets: [
          {
            type: chartType.toLowerCase(),
            data: formattedData,
            name: `${chartType} Plot`,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  



  const renderChart = () => {
    if (!chartData || !chartRef.current) return;
  
    const chartInstance = echarts.init(chartRef.current);
  
    let option = {
      color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452'],
      tooltip: {
        trigger: 'axis', // Using 'axis' to show tooltip when hovering over data points
        formatter: '{a} <br/>{b}: {c}'
      },
      xAxis: {
        type: 'category', // Since x-axis uses numerical data, 'category' can plot these as distinct categories
        data: chartData.labels, // Labels based on x values from formatted data
        name: xAxisName, // Use the name provided for x-axis
      },
      yAxis: {
        type: 'value',
        name: yAxisName, // Use the name provided for y-axis
      },
      series: [{
        name: chartData.datasets[0].name,
        type: chartType.toLowerCase(),
        data: chartData.datasets[0].data.map(item => item.y), // Using y values for plotting
        symbolSize: chartType === 'scatter' ? 10 : undefined,
      }],
    };
  
    chartInstance.setOption(option);
    chartInstanceRef.current = chartInstance;
  };
  
  


  useEffect(() => {
    if (chartType) {
      fetchData();
    }
  }, [chartType]);

  useEffect(() => {
    renderChart();
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
      }
    };
  }, [chartData]);

  useEffect(() => {
    const handleResize = () => {
      if (chartInstanceRef.current) {
        requestAnimationFrame(() => {
          chartInstanceRef.current.resize();
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      if (resizeObserver && chartRef.current) {
        resizeObserver.unobserve(chartRef.current);
      }
    };
  }, []);



  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/chart-cms'); // Updated endpoint
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);



  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isConfig && (
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            zIndex: 1000, // Ensure button is on top
          }}
          onClick={openModal}
        >
          ⚙️
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Charts"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '300px',
            textAlign: 'center',
          },
        }}
      >
        <h2>Charts</h2>
        <button style={{ margin: '10px' }} onClick={() =>{ setChartType('Line'); openChartCmsModel();}}>
          Line
        </button>
        <br />
        <button style={{ margin: '10px' }} onClick={() => {setChartType('Bar'); openChartCmsModel();}}>
          Bar
        </button>
        <br />
        <button style={{ margin: '10px' }} onClick={() =>{ setChartType('Scatter'); openChartCmsModel();}}>
          Scatter
        </button>
        <br />
        <button style={{ margin: '10px' }} onClick={() =>{ setChartType('Pie'); openChartCmsModel();}}>
          Pie
        </button>
        <br />
        <button style={{ margin: '10px', backgroundColor: 'red' }} onClick={closeModal}>
          Close
        </button>
      </Modal>

              <Modal
                isOpen={chartCmsModelIsOpen}
                onRequestClose={closeChartCmsModel}
                contentLabel="Chart CMS"
                style={{
                  content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    width: '300px',
                    textAlign: 'center',
                    maxHeight: '80vh', // Limit the height of the modal based on viewport height
                    overflowY: 'auto', // Enable vertical scrolling
                    textAlign:'left',
                  },
                }}
              >
                <h2>Chart</h2>

                <h3 >xAxis:</h3>
                <label>Organization:</label>
                <select
                  value={organizationx}
                  onChange={ (e) => setOrganizationx(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Organization1">Organization1</option>
                  <option value="Organization2">Organization2</option>
                  <option value="Organization3">Organization3</option>
                </select>

                <label>Plant:</label>
                <select
                  value={plantx}
                  onChange={(e) => setPlantx(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Plant1">Plant1</option>
                  <option value="Plant2">Plant2</option>
                  <option value="Plant3">Plant3</option>
                </select>
                
                <label>Block:</label>
                <select
                  value={blockx}
                  onChange={(e) => setBlockx(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Block1">Block1</option>
                  <option value="Block2">Block2</option>
                  <option value="Block3">Block3</option>
                </select>

                <label>Device:</label>
                <select
                  value={devicex}
                  onChange={(e) => setDevicex(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Device1">Device1</option>
                  <option value="Device2">Device2</option>
                  <option value="Device3">Device3</option>
                </select>

                <label>Parameter:</label>
                <select
                value={xAxisName}
                onChange={(e) => setXAxisName(e.target.value)}
                style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Active Power">Active Power</option>
                  <option value="Temperature">Temperature</option>
                  {/* Add other options as needed */}
                </select>

              
                <h3 >yAxis:</h3>
                <label>Organization:</label>
                <select
                  value={organizationy}
                  onChange={ (e) => setOrganizationy(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Org1">Organization1</option>
                  <option value="Org2">Organization2</option>
                  <option value="Org3">Organization3</option>
                </select>

                <label>Plant:</label>
                <select
                  value={planty}
                  onChange={(e) => setPlanty(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Plant1">Plant1</option>
                  <option value="Plant2">Plant2</option>
                  <option value="Plant3">Plant3</option>
                </select>
                
                <label>Block:</label>
                <select
                  value={blocky}
                  onChange={(e) => setBlocky(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Block1">Block1</option>
                  <option value="Block2">Block2</option>
                  <option value="Block3">Block3</option>
                </select>

                <label>Device:</label>
                <select
                  value={devicey}
                  onChange={(e) => setDevicey(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Device1">Device1</option>
                  <option value="Device2">Device2</option>
                  <option value="Device3">Device3</option>
                </select>

                <label>Parameter:</label>
                <select
                  value={yAxisName}
                  onChange={(e) => setYAxisName(e.target.value)}
                  style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                >
                  <option value="Active Power">Active Power</option>
                  <option value="Temperature">Temperature</option>
                  {/* Add other options as needed */}
                </select>
                

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px 10px' }}
                    onClick={closeChartCmsModel}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
                    // onClick={handleSaveChartCms}
                    onClick={()=>{fetchData(); closeChartCmsModel()}}
                  >
                    Save widget
                  </button>
                </div>
              </Modal>

      <div
        id="chart"
        ref={chartRef}
        style={{ width: '100%', height: '100%' }}
      ></div>
    </div>
  );
};

export default Charts;








// import React, { useState, useEffect, useRef } from 'react';
// import Modal from 'react-modal';
// import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
// import { useLocation } from 'react-router-dom';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// Modal.setAppElement('#root');

// const Charts = ({ setIsPopupOpen }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const [chartType, setChartType] = useState('Line');
//   const chartRef = useRef(null);
//   const location = useLocation();
//   const isConfig = location.pathname === '/configurations';

//   const openModal = () => {
//     setModalIsOpen(true);
//     setIsPopupOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setIsPopupOpen(false);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch('/assets/db.json');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log("data",data);
      
//       // Format data for scatter chart
//       const formattedData = chartType === 'Scatter'
//         ? data.values.map(value => ({ x: value.x, y: value.y }))
//         : data.values;

//       setChartData({
//         labels: chartType !== 'Scatter' ? data.labels : [], // Scatter doesn't use labels
//         datasets: [
//           {
//             label: `${chartType} Plot`,
//             data: formattedData,
//             backgroundColor: getRandomColorArray(data.values.length),
//             borderColor: getRandomColorArray(data.values.length),
//             borderWidth: 1,
//           },
//         ],
//       });
//       console.log("chart data", chartData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const getRandomColorArray = (length) => {
//     return Array.from({ length }, () => getRandomColor());
//   };

//   const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const renderChart = () => {
//     if (!chartData) return null;

//     const chartProps = {
//       data: chartData,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//       ref: chartRef
//     };

//     switch (chartType) {
//       case 'Line':
//         return <Line {...chartProps} />;
//       case 'Bar':
//         return <Bar {...chartProps} />;
//       case 'Pie':
//         return <Pie {...chartProps} />;
//       case 'Scatter':
//         return <Scatter {...chartProps} />;
//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     if (chartType) {
//       fetchData();
//     }
//   }, [chartType]);

//   useEffect(() => {
//     if (chartRef.current && chartRef.current.chartInstance) {
//       const resizeObserver = new ResizeObserver(() => {
//         chartRef.current.chartInstance.resize();
//       });

//       resizeObserver.observe(chartRef.current.canvas);

//       return () => {
//         resizeObserver.unobserve(chartRef.current.canvas);
//       };
//     }
//   }, [chartType]);

//   return (
//     <div style={{ display: 'flex', width: '100%', height: '100%',right: '1px' }}>
//       { isConfig && (<button
//         style={{
//           position: 'absolute',
//           top: '1px',
//           right: '1px',
//           background: 'none',
//           border: 'none',
//           cursor: 'pointer',
//           fontSize: '20px',
//         }}
//         onClick={openModal}
//       >
//         ⚙️
//       </button>
//       )}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Charts"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '20px',
//             width: '300px',
//             textAlign: 'center',
//           },
//         }}
//       >
//         <h2>Charts</h2>
//         <button
//           style={{ margin: '10px' }}
//           onClick={() => setChartType('Line')}
//         >
//           Line
//         </button>
//         <br />
//         <button
//           style={{ margin: '10px' }}
//           onClick={() => setChartType('Bar')}
//         >
//           Bar
//         </button>
//         <br />
//         <button
//           style={{ margin: '10px' }}
//           onClick={() => setChartType('Scatter')}
//         >
//           Scatter
//         </button>
//         <br />
//         <button
//           style={{ margin: '10px' }}
//           onClick={() => setChartType('Pie')}
//         >
//           Pie
//         </button>
//         <br />
//         <button
//           style={{ margin: '10px', backgroundColor: 'red' }}
//           onClick={closeModal}
//         >
//           Close
//         </button>
//       </Modal>

//       <div id="chart" style={{ display: 'flex', width: '100%', height: '100%',right: '1px' }}>
//         {chartData && renderChart()}
//       </div>
//     </div>
//   );
// };

// export default Charts;








// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import ReactECharts from 'echarts-for-react';
// import { useLocation } from 'react-router-dom';

// Modal.setAppElement('#root');

// const Charts = ({ setIsPopupOpen }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [inputModalIsOpen, setInputModalIsOpen] = useState(false);
//   const [chartType, setChartType] = useState('line');
//   const [xValues, setXValues] = useState([]);
//   const [yValues, setYValues] = useState([]);
//   const [step, setStep] = useState(0);
//   const [currentInput, setCurrentInput] = useState('');
//   const [currentField, setCurrentField] = useState('X Value');
//   const [currentDataSet, setCurrentDataSet] = useState('xValues');
//   const [chatData,setChartData]=useState('null');
//   const location = useLocation();
//   const isConfig = location.pathname === '/configurations';

//   const openModal = () => {
//     setModalIsOpen(true);
//     setIsPopupOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setIsPopupOpen(false);
//   };

//   const openInputModal = () => {
//     setInputModalIsOpen(true);
//   };

//   const closeInputModal = () => {
//     setInputModalIsOpen(false);
//   };

//   const handleChartTypeSelection = (type) => {
//     setChartType(type);
//     closeModal();
//     openInputModal();
//   };

//   const handleNextInput = () => {
//     if (currentDataSet === 'xValues') {
//       setXValues([...xValues, currentInput]);
//     } else {
//       setYValues([...yValues, currentInput]);
//     }

//     if (step < 4) {
//       setStep(step + 1);
//       setCurrentInput('');
//     } else if (currentDataSet === 'xValues') {
//       setStep(0);
//       setCurrentInput('');
//       setCurrentDataSet('yValues');
//       setCurrentField('Y Value');
//     } else {
//       closeInputModal();
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch('/assets/db.json');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log("data",data);
      
//       // Format data for scatter chart
//       const formattedData = chartType === 'Scatter'
//         ? data.values.map(value => ({ x: value.x, y: value.y }))
//         : data.values;

//       setChartData({
//         labels: chartType !== 'Scatter' ? data.labels : [], // Scatter doesn't use labels
//         datasets: [
//           {
//             label: `${chartType} Plot`,
//             data: formattedData,
//             // backgroundColor: getRandomColorArray(data.values.length),
//             // borderColor: getRandomColorArray(data.values.length),
//             borderWidth: 1,
//           },
//         ],
//       });
//       // console.log("chart data", chartData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const chartOptions = {
//     title: { text: `${chartType} Chart` },
//     xAxis: {
//       type: 'category',
//       data: xValues.map((value) => value),
//     },
//     yAxis: { type: 'value' },
//     series: [
//       {
//         data: yValues.map((value) => parseFloat(value)),
//         type: chartType,
//       },
//     ],
//   };

//   return (
//     <div style={{ display: 'flex', width: '100%', height: '100%' }}>
//       {isConfig && (
//         <button
//           style={{
//             position: 'absolute',
//             top: '1px',
//             right: '1px',
//             background: 'none',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '20px',
//           }}
//           onClick={openModal}
//         >
//           ⚙️
//         </button>
//       )}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Select Chart Type"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             transform: 'translate(-50%, -50%)',
//             padding: '20px',
//             width: '300px',
//             textAlign: 'center',
//           },
//         }}
//       >
//         <h2>Select Chart Type</h2>
//         <button style={{ margin: '10px' }} onClick={() => handleChartTypeSelection('line')}>
//           Line
//         </button>
//         <br />
//         <button style={{ margin: '10px' }} onClick={() => handleChartTypeSelection('bar')}>
//           Bar
//         </button>
//         <br />
//         <button style={{ margin: '10px' }} onClick={() => handleChartTypeSelection('scatter')}>
//           Scatter
//         </button>
//         <br />
//         <button style={{ margin: '10px' }} onClick={() => handleChartTypeSelection('pie')}>
//           Pie
//         </button>
//         <br />
//         <button style={{ margin: '10px', backgroundColor: 'red' }} onClick={closeModal}>
//           Close
//         </button>
//       </Modal>

//       <Modal
//         isOpen={inputModalIsOpen}
//         onRequestClose={closeInputModal}
//         contentLabel="Enter X and Y Values"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             transform: 'translate(-50%, -50%)',
//             padding: '20px',
//             width: '300px',
//             textAlign: 'center',
//           },
//         }}
//       >
//         <h2>{`${currentField} - Step ${step + 1}`}</h2>
//         <input
//           type="text"
//           value={currentInput}
//           onChange={(e) => setCurrentInput(e.target.value)}
//           placeholder={`Enter ${currentField}`}
//           style={{ margin: '10px', padding: '5px', width: '80%' }}
//         />
//         <button style={{ margin: '10px' }} onClick={handleNextInput}>
//           Next
//         </button>
//       </Modal>

//       <div id="chart" style={{ display: 'flex', width: '100%', height: '100%' }}>
//         {xValues.length && yValues.length ? (
//           <ReactECharts option={chartOptions} style={{ width: '100%', height: '100%' }} />
//         ) : (
//           <p>Select a chart type to begin.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Charts;




