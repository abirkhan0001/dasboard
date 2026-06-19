import React from 'react'
import ReactApexChart from 'react-apexcharts'

const NegativeColorChart = () => {
  const options = {
    chart: {
      height: 350,
      type: 'area',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Negative color for values less than 0',
      align: 'left',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    stroke: {
      width: 0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        stops: [0, 100],
        colorStops: [
          { offset: 0, color: '#0088ee', opacity: 1 },
          { offset: 50, color: '#0088ee', opacity: 1 },
          { offset: 50, color: '#ff0000', opacity: 1 },
          { offset: 100, color: '#ff0000', opacity: 1 },
        ],
      },
    },
  }

  const series = [
    {
      data: [0, -41, 35, -51, 0, 62, -69, 32, -32, 54, 16, -50],
    },
  ]

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  )
}

export default NegativeColorChart