import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chartType: 'Line',        // Default chart type
  chartData: null,          // Holds chart data
  organizationx: 'Organization1',
  plantx: 'Plant1',
  blockx: 'Block1',
  devicex: 'Device1',
  parameterx: 'Active Power',
  organizationy: 'Organization1',
  planty: 'Plant1',
  blocky: 'Block1',
  devicey: 'Device1',
  parametery: 'Temperature',
  xAxisName: 'Active Power',
  yAxisName: 'Temperature',
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChartType: (state, action) => {
      const { widgetId, chartType } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        chartType: chartType,
      };
    },
    setChartData: (state, action) => {
      const { widgetId, chartData } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        chartData: chartData,
      };
    },
    setOrganizationx: (state, action) => {
        const { widgetId, organizationx } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          organizationx: organizationx,
        };
      },

      setPlantx: (state, action) => {
        const { widgetId, plantx } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          plantx: plantx,
        };
      },
      setBlockx: (state, action) => {
        const { widgetId, blockx } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          blockx: blockx,
        };
      },
      setDevicex: (state, action) => {
        const { widgetId, devicex } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          devicex: devicex,
        };
      },
      setParameterx: (state, action) => {
        const { widgetId, parameterx } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          parameterx: parameterx,
        };
      },

      setOrganizationy: (state, action) => {
        const { widgetId, organizationy } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          organizationy: organizationy,
        };
      },

      setPlanty: (state, action) => {
        const { widgetId, planty } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          planty: planty,
        };
      },
      setBlocky: (state, action) => {
        const { widgetId, blocky } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          blocky: blocky,
        };
      },
      setDevicey: (state, action) => {
        const { widgetId, devicey } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          devicey: devicey,
        };
      },
      setParametery: (state, action) => {
        const { widgetId, parametery } = action.payload;
        state[widgetId] = {
          ...state[widgetId],
          parametery: parametery,
        };
      },
    setXAxisName: (state, action) => {
      const { widgetId, xAxisName } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        xAxisName: xAxisName,
      }
    },
    setYAxisName: (state, action) => {
      const { widgetId, yAxisName } = action.payload;
      state[widgetId] = {
        ...state[widgetId],
        yAxisName: yAxisName,
      }
    },
    resetChart: (state, action) => {
        const { widgetId } = action.payload;
        state[widgetId] = {};
    },
    // setXValues: (state, action) => {
    //   const { organization, plant, block, device, parameter } = action.payload;
    //   state.organizationx = organization;
    //   state.plantx = plant;
    //   state.blockx = block;
    //   state.devicex = device;
    //   state.parameterx = parameter;
    // },
    // setYValues: (state, action) => {
    //   const { organization, plant, block, device, parameter } = action.payload;
    //   state.organizationy = organization;
    //   state.planty = plant;
    //   state.blocky = block;
    //   state.devicey = device;
    //   state.parametery = parameter;
    // },
  },
});

export const {
  setChartType,
  setChartData,
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
} = chartSlice.actions;

export default chartSlice.reducer;
