import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Bar,
    BarChart,
    Label,
    Cell,
} from 'recharts';

const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#6880ff',
    '#e7064e',
    '#197a58',
    '#e3552a',
    '#cc74a7',
    '#8b0cd1',
];

const CustomTooltip = ({ active, payload, labels }) => {
    if (active) {
        const { payload: tooltipData } = payload[0];
        return (
            <div className="tooltip bg-gray-800 text-white p-2 rounded shadow">
                {labels.map((label) => (
                    <p key={label} className="text-sm font-bold">{`${label}: ${tooltipData[label]}`}</p>
                ))}
            </div>
        );
    }
    return null;
};

const BarChartComponent = ({ data }) => (
    <BarChart
        data={data}
        width={800}
        height={600}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 140,
        }}
        barSize={40}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={Object.keys(data?.[0])[0]} angle={-25} textAnchor="end" />
        <YAxis />
        <Tooltip />
        <Bar
            dataKey={Object.keys(data?.[0])[1]}
            fill="#8884d8"
            label={{ position: 'top' }}
        >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Bar>
    </BarChart>
);

const LineChartComponent = ({ commonChartProps }) => (
    <LineChart {...commonChartProps}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={Object.keys(commonChartProps?.data?.[0])[0]}>
            <Label angle={90} position="insideRight" />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
            type="monotone"
            dataKey={Object.keys(commonChartProps?.data?.[0])[1]}
            stroke="#82ca9d"
            strokeWidth={3}
        />
    </LineChart>
);

const PieChartComponent = ({ data, labels }) => (
    <PieChart width={600} height={500}>
        <Pie
            data={data}
            dataKey={labels[1]}
            cx={200}
            cy={200}
            outerRadius={150}
            fill="#8884d8"
            label
        >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip content={<CustomTooltip labels={labels} />} />
    </PieChart>
);

const TableComponent = ({ data, labels }) => (
    <div className="p-4 overflow-x-auto w-[80%]">
        <table className="divide-y divide-gray-200">
            <thead>
                <tr>
                    {labels.map((label, index) => (
                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                            {label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                    <tr key={index}>
                        {labels.map((label) => (
                            <td key={label} className="px-6 py-4 whitespace-nowrap">{item[label]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default function Charts(props) {
    const isObjectInData = typeof props.data?.[0] === 'object';
    let data;

    if (props.chartType.includes('table')) {
        if (Array.isArray(props.data?.[0])) {
            data = props.data.map((it) => {
                let obj = {};
                for (let i = 0; i < it.length; i++) {
                    obj[props.labels[i]] = it[i];
                }
                return obj;
            });
        } else if (!isObjectInData) {
            let obj = {};
            for (let i = 0; i < props.labels.length; i++) {
                obj[props.labels[i]] = props.data[i];
            }
            data = [obj];
        } else data = props.data;
    } else if (!isObjectInData) {
        if (Array.isArray(props.data?.[0])) {
            data = props.data.map((it) => {
                let obj = {};
                for (let i = 0; i < it.length; i++) {
                    obj[props.labels[i]] = it[i];
                }
                return obj;
            });
        }
        else data = props.labels.map((it, index) => ({ name: it, amount: props.data[index] }));
    } else data = props.data

    const commonChartProps = {
        width: 600,
        height: 300,
        data: data,
        margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };
    return (
        <>
            {props.chartType.includes('bar') && <BarChartComponent data={data} labels={props.labels} />}
            {props.chartType.includes('line') && <LineChartComponent commonChartProps={commonChartProps} />}
            {props.chartType.includes('pie') && <PieChartComponent data={data} labels={props.labels} />}
            {props.chartType.includes('table') && <TableComponent data={data} labels={props.labels} />}
        </>
    )
}
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     PieChart,
//     Pie,
//     Bar,
//     BarChart,
//     Label,
//     Cell
// } from "recharts";

// export default function Charts(props) {
//     const isObjectInData = typeof props.data?.[0] === 'object';
//     let data;
//     const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#6880ff", "#e7064e", "#197a58", "#d8d3f4", "#cc74a7", "#8b0cd1"];

//     if (props.chartType.includes("table")) {
//         if (Array.isArray(props.data?.[0])) {
//             data = props.data.map((it) => {
//                 let obj = {};
//                 for (let i = 0; i < it.length; i++) {
//                     obj[props.labels[i]] = it[i];
//                 }
//                 return obj;
//             });
//         } else if (!isObjectInData) {
//             let obj = {};
//             for (let i = 0; i < props.labels.length; i++) {
//                 obj[props.labels[i]] = props.data[i];
//             }
//             data = [obj];
//         } else data = props.data;
//     } else if (!isObjectInData) {
//         data = props.labels.map((it, index) => ({ name: it, amount: props.data[index] }));
//     }

//     const commonChartProps = {
//         width: 600,
//         height: 300,
//         data: typeof props.data[0] === 'object' ? props.data : data,
//         margin: { top: 5, right: 30, left: 20, bottom: 5 }
//     };


//     const CustomTooltip = ({ active, payload }) => {
//         if (active) {
//             const { payload: tooltipData } = payload[0];
//             return (
//                 <div className="tooltip bg-gray-800 text-white p-2 rounded shadow">
//                     <p className="text-sm font-bold">{`${props.labels[0]}: ${tooltipData[props.labels[0]]}`}</p>
//                     <p className="text-sm font-bold">{`${props.labels[1]}: ${tooltipData[props.labels[1]]}`}</p>
//                 </div>
//             );
//         }
//         return null;
//     };

//     if (props.chartType.includes("bar")) {
//         return (
//             <BarChart  data={ typeof props.data[0] === 'object' ? props.data : data}
//            width={800} height={600} margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 140,
//           }}
//           barSize={40}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey={isObjectInData ? Object.keys(props.data[0])[0] : "name"} angle={-25} textAnchor="end" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey={isObjectInData ? Object.keys(props.data[0])[1] : "amount"} fill="#8884d8"  label={{ position: 'top' }}>
//                     {(typeof props.data[0] === 'object' ? props.data : data).map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Bar>
//             </BarChart>
//         );
//     } else if (props.chartType.includes("line")) {
//         return (
//             <LineChart {...commonChartProps}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey={isObjectInData ? Object.keys(props.data[0])[0] : "name"}>
//                     <Label angle={90} position="insideRight" />
//                 </XAxis>
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey={isObjectInData ? Object.keys(props.data[0])[1] : "amount"} stroke="#82ca9d" strokeWidth={3} />
//             </LineChart>
//         );
//     } else if (props.chartType.includes("pie")) {
//         return (
//             <PieChart width={600} height={500}>
//                 <Pie
//                     data={typeof props.data[0] === 'object' ? props.data : data}
//                     dataKey={props.labels[1]}
//                     cx={200}
//                     cy={200}
//                     outerRadius={150}
//                     fill="#8884d8"
//                     label
//                 >
//                     {typeof props.data[0] === 'object' ? props.data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     )) : data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//                 <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//         );
//     } else if (props.chartType.includes("table")) {
//         return (
//             <div className="p-4 overflow-x-auto w-[80%]">
//                 <table className="divide-y divide-gray-200">
//                     <thead>
//                         <tr>
//                             {props.labels.map((label, index) => (
//                                 <th key={index} className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
//                                     {label}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {data.map((item, index) => (
//                             <tr key={index}>
//                                 {props.labels.map(label => (
//                                     <td className="px-6 py-4 whitespace-nowrap">{item[label]}</td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     } else return <></>;
// }
