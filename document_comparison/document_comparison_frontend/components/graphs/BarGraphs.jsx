import { ResponsiveBar } from "@nivo/bar"

const data = [
    {
      "month": "Jan",
      "Entertainment": 20,
      "EntertainmentColor": "hsl(63, 70%, 50%)",
      "Travel": 15,
      "TravelColor": "hsl(94, 70%, 50%)",
      "Dining": 20,
      "DiningColor": "hsl(168, 70%, 50%)",
      "Misc": 15,
      "MiscColor": "hsl(227, 70%, 50%)",
      "Investment": 15,
      "InvestmentColor": "hsl(281, 70%, 50%)",
      "Insurance": 15,
      "InsuranceColor": "hsl(137, 70%, 50%)"
    },
    {
      "month": "Feb",
      "Entertainment": 25,
      "EntertainmentColor": "hsl(212, 70%, 50%)",
      "Travel": 10,
      "TravelColor": "hsl(88, 70%, 50%)",
      "Dining": 15,
      "DiningColor": "hsl(323, 70%, 50%)",
      "Misc": 15,
      "MiscColor": "hsl(131, 70%, 50%)",
      "Investment": 20,
      "InvestmentColor": "hsl(147, 70%, 50%)",
      "Insurance": 15,
      "InsuranceColor": "hsl(184, 70%, 50%)"
    },
    {
      "month": "Mar",
      "Entertainment": 15,
      "EntertainmentColor": "hsl(178, 70%, 50%)",
      "Travel": 25,
      "TravelColor": "hsl(84, 70%, 50%)",
      "Dining": 10,
      "DiningColor": "hsl(241, 70%, 50%)",
      "Misc": 20,
      "MiscColor": "hsl(158, 70%, 50%)",
      "Investment": 15,
      "InvestmentColor": "hsl(356, 70%, 50%)",
      "Insurance": 15,
      "InsuranceColor": "hsl(331, 70%, 50%)"
    },
    {
      "month": "Apr",
      "Entertainment": 10,
      "EntertainmentColor": "hsl(86, 70%, 50%)",
      "Travel": 15,
      "TravelColor": "hsl(133, 70%, 50%)",
      "Dining": 25,
      "DiningColor": "hsl(244, 70%, 50%)",
      "Misc": 15,
      "MiscColor": "hsl(244, 70%, 50%)",
      "Investment": 15,
      "InvestmentColor": "hsl(174, 70%, 50%)",
      "Insurance": 20,
      "InsuranceColor": "hsl(284, 70%, 50%)"
    },
    {
      "month": "May",
      "Entertainment": 15,
      "EntertainmentColor": "hsl(328, 70%, 50%)",
      "Travel": 15,
      "TravelColor": "hsl(150, 70%, 50%)",
      "Dining": 15,
      "DiningColor": "hsl(27, 70%, 50%)",
      "Misc": 25,
      "MiscColor": "hsl(36, 70%, 50%)",
      "Investment": 20,
      "InvestmentColor": "hsl(18, 70%, 50%)",
      "Insurance": 10,
      "InsuranceColor": "hsl(233, 70%, 50%)"
    },
    {
      "month": "Jun",
      "Entertainment": 10,
      "EntertainmentColor": "hsl(215, 70%, 50%)",
      "Travel": 20,
      "TravelColor": "hsl(171, 70%, 50%)",
      "Dining": 15,
      "DiningColor": "hsl(238, 70%, 50%)",
      "Misc": 15,
      "MiscColor": "hsl(224, 70%, 50%)",
      "Investment": 25,
      "InvestmentColor": "hsl(78, 70%, 50%)",
      "Insurance": 15,
      "InsuranceColor": "hsl(104, 70%, 50%)"
    }
  ];
  
const BarGraphs = () => {
  return (
    <div style={{ height: '400px' }} className=" min-w-1/5 w-5/5 bg-gray-900 my-2 rounded-lg">
    <ResponsiveBar
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
                    "fontSize": 11,
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
        keys={["Entertainment", "Travel", "Dining", "Misc", "Investment", "Insurance"]}

        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'category10' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0.6'
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'months',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'month',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
  </div>
  )
}

export default BarGraphs