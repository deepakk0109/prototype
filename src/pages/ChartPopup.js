import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

Modal.setAppElement('#root');

const ChartPopup = ({ setIsPopupOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('Line');
  const chartRef = useRef(null);

  const openModal = () => {
    setModalIsOpen(true);
    setIsPopupOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsPopupOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/assets/db.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      // Format data for scatter chart
      const formattedData = chartType === 'Scatter'
        ? data.values.map(value => ({ x: value.x, y: value.y }))
        : data.values;

      setChartData({
        labels: chartType !== 'Scatter' ? data.labels : [], // Scatter doesn't use labels
        datasets: [
          {
            label: `${chartType} Plot`,
            data: formattedData,
            backgroundColor: getRandomColorArray(data.values.length),
            borderColor: getRandomColorArray(data.values.length),
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getRandomColorArray = (length) => {
    return Array.from({ length }, () => getRandomColor());
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderChart = () => {
    if (!chartData) return null;

    const chartProps = {
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      ref: chartRef
    };

    switch (chartType) {
      case 'Line':
        return <Line {...chartProps} />;
      case 'Bar':
        return <Bar {...chartProps} />;
      case 'Pie':
        return <Pie {...chartProps} />;
      case 'Scatter':
        return <Scatter {...chartProps} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (chartType) {
      fetchData();
    }
  }, [chartType]);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      const resizeObserver = new ResizeObserver(() => {
        chartRef.current.chartInstance.resize();
      });

      resizeObserver.observe(chartRef.current.canvas);

      return () => {
        resizeObserver.unobserve(chartRef.current.canvas);
      };
    }
  }, [chartType]);

  return (
    <div>
      <button
        style={{
          position: 'absolute',
          top: '1px',
          right: '1px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
        }}
        onClick={openModal}
      >
        ⚙️
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Popup"
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
        <button
          style={{ margin: '10px' }}
          onClick={() => setChartType('Line')}
        >
          Line
        </button>
        <br />
        <button
          style={{ margin: '10px' }}
          onClick={() => setChartType('Bar')}
        >
          Bar
        </button>
        <br />
        <button
          style={{ margin: '10px' }}
          onClick={() => setChartType('Scatter')}
        >
          Scatter
        </button>
        <br />
        <button
          style={{ margin: '10px' }}
          onClick={() => setChartType('Pie')}
        >
          Pie
        </button>
        <br />
        <button
          style={{ margin: '10px', backgroundColor: 'red' }}
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>

      <div id="chart" style={{ display: 'flex', width: '100%', height: '100%' }}>
        {chartData && renderChart()}
      </div>
    </div>
  );
};

export default ChartPopup;



// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import { Line, Bar, Pie, Scatter } from 'react-chartjs-2';
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

// const ChartPopup = ({ setIsPopupOpen }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const [chartType, setChartType] = useState('');

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

//     switch (chartType) {
//       case 'Line':
//         return <Line data={chartData} />;
//       case 'Bar':
//         return <Bar data={chartData} />;
//       case 'Pie':
//         return <Pie data={chartData} />;
//       case 'Scatter':
//         return <Scatter data={chartData} />;
//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     if (chartType) {
//       fetchData();
//     }
//   }, [chartType]);

//   return (
//     <div>
//       <button
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

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Example Popup"
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

//       <div id="chart" style={{ display: 'flex', width: '100%', height: '100%' }}>
//         {chartData && renderChart()}
//       </div>
//     </div>
//   );
// };

// export default ChartPopup;
