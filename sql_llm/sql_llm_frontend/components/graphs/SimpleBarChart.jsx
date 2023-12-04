import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default function SimpleBarChart(props) {
  const isObjectInData = typeof props.data?.[0] === 'object'
  let data
  if (!isObjectInData) {
    data = props.labels.map((it, index) => { return { name: it, amount: props.data[index] } })
  }
  return (
    <BarChart
      width={600}
      height={300}
      data={typeof props.data[0] === 'object' ? props.data : data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {/* <XAxis dataKey={isObjectInData ? Object.keys(props.data[0])[0]  :"name"} /> */}
      <XAxis dataKey={isObjectInData ? Object.keys(props.data[0])[0] : "name"}>
        <Label angle={90} position="insideRight" />
      </XAxis>
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={isObjectInData ? Object.keys(props.data[0])[1] : "amount"} fill="#8884d8" />
    </BarChart>
  );
}
