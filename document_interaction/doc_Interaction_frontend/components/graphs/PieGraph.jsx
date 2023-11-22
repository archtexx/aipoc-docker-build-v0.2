import { ResponsivePie } from '@nivo/pie'

const data = 
    [
        {
          "id": "entertainment",
          "label": "Entertainment",
          "value": 12,
          "color": "hsl(232, 70%, 50%)"
        },
        {
          "id": "travel",
          "label": "Travel",
          "value": 24,
          "color": "hsl(108, 70%, 50%)"
        },
        {
          "id": "dining",
          "label": "Dining",
          "value": 20,
          "color": "hsl(251, 70%, 50%)"
        },
        {
          "id": "misc",
          "label": "Misc",
          "value": 31,
          "color": "hsl(309, 70%, 50%)"
        },
        {
          "id": "investment",
          "label": "Investment",
          "value": 8,
          "color": "hsl(339, 70%, 50%)"
        },
        {
          "id": "insurance",
          "label": "Insurance",
          "value": 5,
          "color": "hsl(15, 70%, 50%)"
        }
      ]
      

const PieGraph = () => {
  return (
    <div style={{ height: '400px'}} className=" min-w-1/5 w-5/5 bg-gray-900 my-2 rounded-lg">
         <ResponsivePie
         theme={ {
         
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
                    "fontSize": 19,
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
                    "fill": "#88d24b",
                    "outlineWidth": 2,
                    "outlineColor":"#88d24b",
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
                    "outlineColor": "#88d24b",
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
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.55}
        padAngle={2}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '2.7'
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#0ecd2e"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: 200,
                translateY: 32,
                itemsSpacing: 1,
                itemWidth: 19,
                itemHeight: 19,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 14,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </div>
  )
}

export default PieGraph