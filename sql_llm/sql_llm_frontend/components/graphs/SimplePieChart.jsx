import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
];

export default function SimplePieChart(props) {
    const isObjectInData = typeof props.data?.[0] === 'object'
    let data
    if (!isObjectInData) {
        data = props.labels.map((it, index) => { return { name: it, amount: props.data[index] } })
    }
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={typeof props.data[0] === 'object' ? props.data : data}
                dataKey={props.labels[0]}
                cx={200}
                cy={200}
                outerRadius={60}
                fill="#8884d8"
                label
            />
        </PieChart>
    );
}


