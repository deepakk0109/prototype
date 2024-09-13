import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import * as echarts from 'echarts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import {
  setChartType,
  // setChartData,
  setOrganizationx,
  setPlantx,
  setBlockx,
  setDevicex,
  setParameterx,
  setOrganizationy,
  setPlanty,
  setBlocky,
  setDevicey,
  setParametery,
  setXAxisName,
  setYAxisName,
  setWidgetStyles,
} from '../redux/slices/chartSlice'
import { useDispatch, useSelector } from 'react-redux';
import { StyleModel } from './StyleModel';

const Charts = ({ onClick,setIsPopupOpen,widgetId,updateWidgetChart,typeOfChart,Ox,Px,Bx,Dx,Parameterx,Oy,Py,By,Dy,Parametery,Styles }) => {
  const dispatch =useDispatch();
  const chartState=useSelector((state)=>state.chart[widgetId]) || {};

  const {  chartType,  
    // chartData,    
    organizationx,
    plantx,
    blockx,
    devicex,
    parameterx,
    organizationy,
    planty,
    blocky,
    devicey,
    parametery,
    xAxisName,
    yAxisName,widgetStyles}=chartState;

    useEffect(() => {
      dispatch(setChartType({ widgetId, chartType: typeOfChart || 'Line' }));
      // chartData: null,          
      dispatch(setOrganizationx({widgetId,organizationx: Ox || 'Organization1'}))
      dispatch(setPlantx({widgetId, plantx: Px || 'Plant1'}));
      dispatch(setBlockx({widgetId, blockx: Bx || 'Block1'}));
      dispatch(setDevicex({widgetId, devicex: Dx || 'Device1'}));
      dispatch(setParameterx({widgetId, parameterx: Parameterx || 'Time'}));
      dispatch(setOrganizationy({widgetId,organizationy: Oy || 'Organization1'}))
      dispatch(setPlanty({widgetId, planty: Py || 'Plant1'}));
      dispatch(setBlocky({widgetId, blocky: By || 'Block1'}));
      dispatch(setDevicey({widgetId, devicey: Dy || 'Device1'}));
      dispatch(setParametery({widgetId, parametery: Parametery || 'Temperature'}));
      dispatch(setXAxisName({widgetId, xAxisName:Parameterx|| 'Time'}));
      dispatch(setYAxisName({widgetId, yAxisName: Parametery ||'Temperature'}));
      dispatch(setWidgetStyles({widgetId, widgetStyles: Styles || {}}));
    }, [Ox,Px,Bx,Dx,Parameterx,Oy,Py,By,Dy,Parametery, typeOfChart, dispatch, widgetId,Styles]);
  

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  // const [chartType, setChartType] = useState(typeOfChart || 'Line');
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const location = useLocation();
  const isConfig = location.pathname === '/configurations';

  //for x values
  // const [organizationx,setOrganizationx]=useState('Organization1');
  // const [plantx,setPlantx]=useState('Plant1');
  // const [blockx,setBlockx]=useState('Block1');
  // const [devicex,setDevicex]=useState('Device1');
  // const [parameterx,setParameterx]=useState('Active Power');

  // // for Y values
  // const [organizationy,setOrganizationy]=useState('Organization1');
  // const [planty,setPlanty]=useState('Plant1');
  // const [blocky,setBlocky]=useState('Block1');
  // const [devicey,setDevicey]=useState('Device1');
  // const [parametery,setParametery]=useState('Parameter1');

  // const [xAxisName, setXAxisName] = useState('Active Power');
  // const [yAxisName, setYAxisName] = useState('Temperature');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/chart-cms'); // Fetch the full data from the server
      console.log("Response data:", response);
      const data = response.data;
      console.log("Response data:", data[1]);
      // For X-Axis
      const xorganization = data[2].organizations.find(org => org.name === organizationx);
      if (!xorganization) throw new Error("Organization not found");
  
      const xplant = xorganization.plants.find(p => p.name === plantx);
      if (!xplant) throw new Error("Plant not found");
  
      const xblock = xplant.blocks.find(b => b.name === blockx);
      if (!xblock) throw new Error("Block not found");
  
      const xdevice = xblock.devices.find(d => d.name === devicex);
      if (!xdevice) throw new Error("Device not found");
  
      const xparameter = xdevice.parameters.find(p => p.name === parameterx);
      if (!xparameter) throw new Error("Parameter not found");
  
      // Extract X-Axis values
      const xvalues = xparameter.values;
      console.log("Extracted X-Axis values:", xvalues);
  
      // For Y-Axis
      const yorganization = data[2].organizations.find(org => org.name === organizationy);
      if (!yorganization) throw new Error("Organization not found");
  
      const yplant = yorganization.plants.find(p => p.name === planty);
      if (!yplant) throw new Error("Plant not found");
  
      const yblock = yplant.blocks.find(b => b.name === blocky);
      if (!yblock) throw new Error("Block not found");
  
      const ydevice = yblock.devices.find(d => d.name === devicey);
      if (!ydevice) throw new Error("Device not found");
  
      const yparameter = ydevice.parameters.find(p => p.name === parametery);
      if (!yparameter) throw new Error("Parameter not found");
  
      // Extract Y-Axis values
      const yvalues = yparameter.values;
      console.log("Extracted Y-Axis values:", yvalues);
  
      // Map X and Y values to formatted data
      const formattedData = xvalues.map((xItem, index) => ({
        x: xItem.value,  // X-Axis value
        y: yvalues[index]?.value || 0  // Y-Axis value, default to 0 if yvalues has fewer items
      }));
  
      console.log("Formatted Data for chart:", formattedData);
  
      // Update the chart data
     setChartData({
        labels: formattedData.map(item => item.x), // X-Axis labels
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
  
    let option;
  
    if (chartType.toLowerCase() === 'pie') {
      // Pie chart configuration with category labels
      option = {
        color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{
          name: chartData.datasets[0].name,
          type: 'pie',
          radius: '50%',
          data: chartData.datasets[0].data.map(item => ({ value: item.y, name: item.x })),
          label: {
            formatter: '{b}: {c} ({d}%)',
            position: 'outside'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }],
        // Adding annotations or custom labels for axis names
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '5%',
            
            style: {
              text: parameterx,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          {
            type: 'text',
            left: 'center',
            bottom: '5%',
            style: {
              text: parametery,
              fontSize: 16,
              fontWeight: 'bold'
            }
          }
        ]
      };
    } else {
      // Other chart types (e.g., scatter, line, bar)
      option = {
        color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452'],
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: chartData.labels,
          name: parameterx,
        },
        yAxis: {
          type: 'value',
          name: parametery,
        },
        series: [{
          name: chartData.datasets[0].name,
          type: chartType.toLowerCase(),
          data: chartData.datasets[0].data.map(item => item.y),
          symbolSize: chartType.toLowerCase() === 'scatter' ? 10 : undefined,
        }],
      };
    }
  
    chartInstance.setOption(option);
    chartInstanceRef.current = chartInstance;
  };
  
  
  


  useEffect(() => {
    if (chartType) {
      fetchData();
    }
  }, [chartType, organizationx,
    plantx,
    blockx,
    devicex,
    parameterx,
    organizationy,
    planty,
    blocky,
    devicey,
    parametery,]);

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


  const updateChart = (widgetId,chartType, organizationx,
    plantx,
    blockx,
    devicex,
    parameterx,
    organizationy,
    planty,
    blocky,
    devicey,
    parametery,widgetStyles) => {
    // Assuming updateWidgetChartType is defined and passed down or available globally
    updateWidgetChart(widgetId, chartType,organizationx,
      plantx,
      blockx,
      devicex,
      parameterx,
      organizationy,
      planty,
      blocky,
      devicey,
      parametery,widgetStyles);

  };

  const toggleSettings = () => {
    const sidebarElement = document.getElementById('sidebar');

    if (!sidebarElement) {
      console.warn('Sidebar element not found');
      return;
    }
    const root = ReactDOM.createRoot(sidebarElement);
      root.render(
        <React.StrictMode>
          <Provider store={store}>
            <ChartListSidebar
              updateWidgetChart={updateWidgetChart}
              widgetId={widgetId}
              fetchData={fetchData}
              updateChart={updateChart}
            />
          </Provider>
        </React.StrictMode>
      );
  };

  return (
    <div onClick={()=>{onClick();toggleSettings()}} style={{ position: 'relative', width: '100%', height: '100%',...widgetStyles }}>
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
          onClick={()=>{
            toggleSettings();
          }}
        >
          ⚙️
        </button>
      )}
      <div
        id="chart"
        ref={chartRef}
        style={{ width: '100%', height: '100%'}}
      ></div>
    </div>
  );
};

const ChartListSidebar=({updateWidgetChart,widgetId,closeModal,updateChart,fetchData,closeChartCmsModel,openChartCmsModel})=>{
  const dispatch =useDispatch();
  const chartState=useSelector((state)=>state.chart[widgetId]) || {};

  const {  chartType,  
    // chartData,    
    organizationx,
    plantx,
    blockx,
    devicex,
    parameterx,
    organizationy,
    planty,
    blocky,
    devicey,
    parametery,
    xAxisName,
    yAxisName,widgetStyles}=chartState;

    const  saveChart=()=>{
      // if (typeof fetchData === 'function') {
        fetchData(); // Call fetchData function
      // } else {
      //   console.error('fetchData is not a function');
      // }
    }
    const chartTypes = ['Line', 'Bar', 'Scatter', 'Pie'];

    // Function to handle button click
    const handleChartTypeChange = (chartType) => {
      dispatch(setChartType({ widgetId, chartType }));
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const openSettingsModal = () => {
      setModalIsOpen(true);
    };
  
    const closeSettingsModal = () => {
      setModalIsOpen(false);
    };
  return(
    <div style={{height:'100vh', overflowY:'auto', padding:'10px'}}>
          <h2>Charts</h2>
        {chartTypes.map((type) => (
        <li
          key={type}
          style={{ margin: '10px', cursor:'pointer' }}
          onClick={() => handleChartTypeChange(type)}
        >
          {type}
        </li>
      ))}


    <h4>{chartType} Chart:</h4>

    <h5 >XAxis:</h5>
    <label>Organization:</label>
    <select
      value={organizationx}
      onChange={ (e) => dispatch(setOrganizationx({widgetId,organizationx:e.target.value}))}
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Organization1">Organization1</option>
      <option value="Organization2">Organization2</option>
      <option value="Organization3">Organization3</option>
    </select>

    <label>Plant:</label>
    <select
      value={plantx}
      onChange={(e) => dispatch(setPlantx({widgetId,planty:e.target.value}))}
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Plant1">Plant1</option>
      <option value="Plant2">Plant2</option>
      {/* <option value="Plant3">Plant3</option> */}
    </select>

    <label>Block:</label>
    <select
      value={blockx}
      onChange={(e) => dispatch(setBlockx({widgetId,blockx: e.target.value}))}
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Block1">Block1</option>
      {/* <option value="Block2">Block2</option> */}
      {/* <option value="Block3">Block3</option> */}
    </select>

    <label>Device:</label>
    <select
      value={devicex}
      onChange={(e) =>  dispatch(setDevicex({widgetId, devicex:e.target.value}))}
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Device1">Device1</option>
      <option value="Device2">Device2</option>
      <option value="Device3">Device3</option>
    </select>

    <label>Parameter:</label>
    <select
    value={parameterx}
    onChange={(e) =>{
      dispatch(setParameterx({widgetId,parameterx:e.target.value}));
        // dispatch(setXAxisName({widgetId,xAxisName:e.target.value}))
      }
    }
    style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Active Power">Active Power</option>
      <option value="Temperature">Temperature</option>
      <option value="Time">Time</option>
      {/* Add other options as needed */}
    </select>


    <h5>YAxis:</h5>
    <label>Organization:</label>
    <select
      value={organizationy}
      onChange={ (e) =>  dispatch(setOrganizationy({widgetId,organizationy:e.target.value}))}
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Organization1">Organization1</option>
      <option value="Organization2">Organization2</option>
      <option value="Organization3">Organization3</option>
    </select>

    <label>Plant:</label>
    <select
      value={planty}
      onChange={(e) => dispatch(setPlanty({widgetId,planty:e.target.value}))}
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Plant1">Plant1</option>
      <option value="Plant2">Plant2</option>
      {/* <option value="Plant3">Plant3</option> */}
    </select>

    <label>Block:</label>
    <select
      value={blocky}
      onChange={(e) =>dispatch(setBlocky({widgetId,blocky: e.target.value}))}
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Block1">Block1</option>
      {/* <option value="Block2">Block2</option> */}
      {/* <option value="Block3">Block3</option> */}
    </select>

    <label>Device:</label>
    <select
      value={devicey}
      onChange={(e) =>dispatch(setDevicey({widgetId, devicey: e.target.value}))}
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Device1">Device1</option>
      <option value="Device2">Device2</option>
      <option value="Device3">Device3</option>
    </select>

    <label>Parameter:</label>
    <select
      value={parametery}
      onChange={(e) =>{
        dispatch(setParametery({widgetId,parametery:e.target.value}));
        // dispatch(setYAxisName({widgetId,yAxisName: e.target.value}))
      }
      }
      style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
    >
      <option value="Active Power">Active Power</option>
      <option value="Temperature">Temperature</option>
      <option value="Time">Time</option>
      {/* Add other options as needed */}
    </select>


    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
        // onClick={handleSaveChartCms}
        onClick={()=>{
           updateChart(widgetId,chartType,
          organizationx,
          plantx,
          blockx,
          devicex,
          parameterx,
          organizationy,
          planty,
          blocky,
          devicey,
          parametery,widgetStyles);saveChart()}}
      >
        Save widget
      </button>
    </div>
    
    <div style={{ marginBottom: '10px' }}>Add styles  <button onClick={openSettingsModal}  style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '1px 10px', cursor: 'pointer' }}>+</button></div>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeSettingsModal}
        contentLabel="Settings Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
          },
          content: {
            top: '50%',
            right: '10px', // Distance from the right edge
            left: 'auto', // Remove left alignment
            bottom: 'auto',
            marginRight: '0', // No margin on the right
            transform: 'translateY(-50%)', // Center vertically
            width: '200px',
            pointerEvents: 'auto', // Enable pointer events for the modal content
            overflowY:'auto',
          },
        }}
      >
        <StyleModel widgetId={widgetId} setWidgetStyles={setWidgetStyles} state={chartState}/>
        <button onClick={()=>{
           updateChart(widgetId,chartType,
          organizationx,
          plantx,
          blockx,
          devicex,
          parameterx,
          organizationy,
          planty,
          blocky,
          devicey,
          parametery,widgetStyles);saveChart(); closeSettingsModal()}} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} >
          Save
        </button>
        <button  onClick={()=>{ closeSettingsModal()}} style={{alignItems:'right', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
        </Modal>

</div>
    
  )
}

export  {Charts,ChartListSidebar};








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




