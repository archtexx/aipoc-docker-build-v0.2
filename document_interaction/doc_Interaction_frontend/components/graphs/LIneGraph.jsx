import { ResponsiveLine } from '@nivo/line'
const data = [
  {
    id: "Entertainment",
    color: "hsl(311, 70%, 50%)",
    data: [
      { x: "Jan", y: 10 },
      { x: "Feb", y: 15 },
      { x: "Mar", y: 20 },
      { x: "Apr", y: 10 },
      { x: "May", y: 12 },
      { x: "Jun", y: 8 },
      { x: "Jul", y: 7 },
      { x: "Aug", y: 6 },
      { x: "Sep", y: 5 },
      { x: "Oct", y: 4 },
      { x: "Nov", y: 3 },
      { x: "Dec", y: 0 },
    ],
  },
  {
    id: "Travel",
    color: "hsl(200, 70%, 50%)",
    data: [
      { x: "Jan", y: 15 },
      { x: "Feb", y: 10 },
      { x: "Mar", y: 8 },
      { x: "Apr", y: 12 },
      { x: "May", y: 10 },
      { x: "Jun", y: 14 },
      { x: "Jul", y: 9 },
      { x: "Aug", y: 8 },
      { x: "Sep", y: 6 },
      { x: "Oct", y: 5 },
      { x: "Nov", y: 3 },
      { x: "Dec", y: 0 },
    ],
  },
  {
    id: "Dining",
    color: "hsl(62, 70%, 50%)",
    data: [
      { x: "Jan", y: 20 },
      { x: "Feb", y: 15 },
      { x: "Mar", y: 12 },
      { x: "Apr", y: 10 },
      { x: "May", y: 8 },
      { x: "Jun", y: 6 },
      { x: "Jul", y: 5 },
      { x: "Aug", y: 4 },
      { x: "Sep", y: 3 },
      { x: "Oct", y: 2 },
      { x: "Nov", y: 1 },
      { x: "Dec", y: 0 },
    ],
  },
  {
    id: "Misc",
    color: "hsl(180, 70%, 50%)",
    data: [
      { x: "Jan", y: 5 },
      { x: "Feb", y: 10 },
      { x: "Mar", y: 15 },
      { x: "Apr", y: 10 },
      { x: "May", y: 12 },
      { x: "Jun", y: 18 },
      { x: "Jul", y: 14 },
      { x: "Aug", y: 11 },
      { x: "Sep", y: 9 },
      { x: "Oct", y: 8 },
      { x: "Nov", y: 5 },
      { x: "Dec", y: 0 },
    ],
  },
  {
    id: "Investment",
    color: "hsl(301, 70%, 50%)",
    data: [
      { x: "Jan", y: 40 },
      { x: "Feb", y: 30 },
      { x: "Mar", y: 25 },
      { x: "Apr", y: 20 },
      { x: "May", y: 15 },
      { x: "Jun", y: 10 },
      { x: "Jul", y: 10 },
      { x: "Aug", y: 10 },
      { x: "Sep", y: 7 },
      { x: "Oct", y: 5 },
      { x: "Nov", y: 3 },
      { x: "Dec", y: 0 },
    ],
  },
  {
    id: "Insurance",
    color: "hsl(232, 70%, 50%)",
    data: [
      { x: "Jan", y: 10 },
      { x: "Feb", y: 20 },
      { x: "Mar", y: 20 },
      { x: "Apr", y: 30 },
      { x: "May", y: 35 },
      { x: "Jun", y: 44 },
      { x: "Jul", y: 50 },
      { x: "Aug", y: 50 },
      { x: "Sep", y: 75 },
      { x: "Oct", y: 100 },
      { x: "Nov", y: 100 },
      { x: "Dec", y: 100 },
    ],
  },
];

  
const LIneGraph = () => {
  return (
    <div style={{ height: '400px' }} className="min-w-1/5 w-5/5 bg-gray-900 my-2  rounded-lg overflow-x-scroll">
        <ResponsiveLine
        theme={{
         
            "text":
             {
                "fontSize": 23,
                "fill": "#000000",
                "outlineWidth": 2,
                "outlineColor": "#662929"
            },
            "axis": {
                "domain": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 1
                    }
                },
                "legend": {
                    "text": {
                        "fontSize": 13,
                        "fill": "#8f82b5",
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": "#777777",
                        "strokeWidth": 0
                    },
                    "text": {
                        "fontSize": 12,
                        "fill": "#88d24b",
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                    }
                }
            },
            "grid": {
                "line": {
                    "stroke": "#dddddd",
                    "strokeWidth": 1
                }
            },
            "legends": {
                "title": {
                    "text": {
                        "fontSize": 11,
                        "fill": "#333333",
                        "outlineWidth": 2,
                        "outlineColor": "transparent"
                    }
                },
                "text": {
                    "fontSize": 10,
                    "fill": "#88d24b",
                    "outlineWidth": 6,
                    "outlineColor": "transparent"
                },
                "ticks": {
                    "line": {},
                    "text": {
                        "fontSize": 10,
                        "fill": "#333333",
                        "outlineWidth": 0,
                        "outlineColor": "transparent"
                    }
                }
            },
            "annotations": {
                "text": {
                    "fontSize": 13,
                    "fill": "#333333",
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "link": {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "outline": {
                    "stroke": "#000000",
                    "strokeWidth": 2,
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "symbol": {
                    "fill": "#000000",
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                }
            },
            "tooltip": {
                "container": {
                    "background": "#1f2937",
                    "fontSize": 12
                },
                "basic": {},
                "chip": {},
                "table": {},
                "tableCell": {},
                "tableCellValue": {}
            }
        }}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Expenditure',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 74,
              translateY: -36,
              itemsSpacing: 1,
              itemDirection: 'left-to-right',
              itemWidth: 51,
              itemHeight: 15,
              itemOpacity: 0.75,
              symbolSize: 11,
              symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
        </div>
  )
}

export default LIneGraph