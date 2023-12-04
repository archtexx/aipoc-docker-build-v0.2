// import React, { useEffect, useRef } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// {/* <Doughnut data={...} /> */}

// const BarChart = () => {
//     const data = {
//         labels: [
//           'Transfer,Debit',
//           'Payment,Credit Card',
//           'Transfer,Internal Account Transfer',
//           'Tax,Payment',
//           'Service,Financial,Loans and Mortgages',
//           'Transfer,Withdrawal,Check',
//           'Payment,Rent',
//           'Service,Insurance',
//           'Community,Education,Colleges and Universities',
//           'Service,Financial',
//         ],
//         datasets: [
//           {
//             label: 'Total Amount',
//             data: [
//               290336.61,
//               277059.0,
//               253452.0,
//               206243.84,
//               83010.58,
//               42522.99,
//               40000.0,
//               38572.34,
//               35022.31,
//               28488.14,
//             ],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//         ],
//       };
//     // const chartRef = useRef(null);

//     // useEffect(() => {
//     //   // Ensure the chart is created only once
//     //   if (chartRef.current) {
//     //     chartRef.current.destroy();
//     //   }

//     //   // Create the new chart
//     //   chartRef.current = new Chart(chartRef.current, {
//     //     type: 'bar',
//     //     data: data,
//     //   });

//       // Cleanup chart when the component is unmounted
//     //   return () => {
//     //     if (chartRef.current) {
//     //       chartRef.current.destroy();
//     //     }
//     //   };
//     // }, [data]);

//     return (
//       <div>
//         <h2>Bar Chart</h2>

// <Line
//   datasetIdKey='id'
//   data={{
//     labels: ['Jun', 'Jul', 'Aug'],
//     datasets: [
//       {
//         id: 1,
//         label: '',
//         data: [5, 6, 7],
//       },
//       {
//         id: 2,
//         label: '',
//         data: [3, 2, 1],
//       },
//     ],
//   }}
// />
//       </div>
//     );
//   };

//   export default BarChart;

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // title: {
        //     display: true,
        //     text: 'Chart.js Bar Chart',
        // },
    },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// "labels": ["Bank Fees", "Bank Fees,ATM", "Bank Fees,Foreign Transaction", "Bank Fees,Overdraft", "Bank Fees,Wire Transfer", "Community,Education", "Community,Education,Colleges and Universities", "Community,Education,Primary and Secondary Schools", "Community,Government Departments and Agencies", "Community,Organizations and Associations,Charities and Non-Profits"],
// "datasets": [0, 0, 0.9, 10, 10, 669, 35022.31, 806.97, 5148.38, 302]
// },

// const data = {
//     "labels": ["Bank Fees", "Bank Fees,ATM", "Bank Fees,Foreign Transaction", "Bank Fees,Overdraft", "Bank Fees,Wire Transfer", "Community,Education", "Community,Education,Colleges and Universities", "Community,Education,Primary and Secondary Schools", "Community,Government Departments and Agencies", "Community,Organizations and Associations,Charities and Non-Profits"],
//     "datasets": [{
//         data: [0, 0, 0.9, 10, 10, 669, 35022.31, 806.97, 5148.38, 302], backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//     }]
// }
// labels: [
//   'Transfer,Debit',
//   'Payment,Credit Card',
//   'Transfer,Internal Account Transfer',
//   'Tax,Payment',
//   'Service,Financial,Loans and Mortgages',
//   'Transfer,Withdrawal,Check',
//   'Payment,Rent',
//   'Service,Insurance',
//   'Community,Education,Colleges and Universities',
//   'Service,Financial',
// ],
// datasets: [
//   {
//     label: 'Total Amount',
//     data: [
//       290336.61,
//       277059.0,
//       253452.0,
//       206243.84,
//       83010.58,
//       42522.99,
//       40000.0,
//       38572.34,
//       35022.31,
//       28488.14,
//     ],
//     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//     borderColor: 'rgba(75, 192, 192, 1)',
//     borderWidth: 1,
//   },
// ],
//   };

export default function BarChart({data}) {
    return <Bar options={options} data={data} />;
}
