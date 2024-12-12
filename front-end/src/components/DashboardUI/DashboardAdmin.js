import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import api from '../../_config/api';

export function DashboardAdmin() {
  const [awardsData, setAwardsData] = React.useState({ series: [], xAxis: [] });
  const [studentPerformersData, setStudentPerformersData] = React.useState({ series: [], xAxis: [] });

  React.useEffect(() => {
    const fetchAwardsData = async () => {
      try {
        const response = await api.get('/admin/dashboard/awards-data');
        setAwardsData(response.data);
      } catch (error) {
        console.error('Error fetching awards data:', error);
      }
    };

    const fetchStudentPerformersData = async () => {
      try {
        const response = await api.get('/admin/dashboard/student-performers-data');
        setStudentPerformersData(response.data);
      } catch (error) {
        console.error('Error fetching student performers data:', error);
      }
    };

    fetchAwardsData();
    fetchStudentPerformersData();
  }, []);

  const Container = ResponsiveChartContainer;
  return (
    <Box sx={{ width: '90%' }}>
      <Paper sx={{ width: '100%', height: 300 }} elevation={3}>
        {/* @ts-ignore */}
        {awardsData.xAxis.length > 0 && (
          <Container series={awardsData.series} xAxis={awardsData.xAxis}>
            <BarPlot />
            <ChartsXAxis label="Total Awards per Cultural Group" position="bottom" axisId="x-axis-id" />
          </Container>
        )}
      </Paper>

      <Paper sx={{ width: '100%', height: 300, mt: 2 }} elevation={3}>
        {/* @ts-ignore */}
        {studentPerformersData.xAxis.length > 0 && (
          <Container series={studentPerformersData.series} xAxis={studentPerformersData.xAxis}>
            <BarPlot />
            <ChartsXAxis label="Total Number of Student-Performers Per Campus" position="bottom" axisId="x-axis-id" />
          </Container>
        )}
      </Paper>
    </Box>
  );
}
