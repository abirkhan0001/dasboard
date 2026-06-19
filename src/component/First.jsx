// VolumeChart.jsx
import Second from './Second.jsx'
import Third from './Third.jsx'

const volumeData = [
  { up: 18, down: 12 }, { up: 28, down: 8 },  { up: 15, down: 20 },
  { up: 35, down: 10 }, { up: 22, down: 15 }, { up: 40, down: 5 },
  { up: 30, down: 18 }, { up: 12, down: 22 }, { up: 38, down: 12 },
  { up: 20, down: 8 },  { up: 8,  down: 14 }, { up: 42, down: 20 },
  { up: 25, down: 6 },  { up: 18, down: 30 }, { up: 35, down: 14 },
  { up: 50, down: 8 },  { up: 28, down: 22 }, { up: 15, down: 10 },
  { up: 38, down: 16 }, { up: 22, down: 12 }, { up: 45, down: 18 },
  { up: 32, down: 8 },  { up: 20, down: 26 }, { up: 40, down: 10 },
  { up: 28, down: 14 }, { up: 12, down: 32 }, { up: 35, down: 8 },
  { up: 48, down: 16 }, { up: 22, down: 12 }, { up: 30, down: 20 },
  { up: 18, down: 10 }, { up: 40, down: 14 }, { up: 28, down: 6 },
]

const maxUp = Math.max(...volumeData.map((d) => d.up))
const maxDown = Math.max(...volumeData.map((d) => d.down))

export default function VolumeChart() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* VolumeChart */}
      <div style={{
        width: '100%',
        height: 120,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 12,
        overflow: 'hidden',
      }}>

        {/* Up bars */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 2,
          flex: 3,
          background: '#131722',
          padding: '8px 12px 0',
        }}>
          {volumeData.map((bar, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: '#60a5fa',
                borderRadius: '2px 2px 0 0',
                height: `${(bar.up / maxUp) * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Down bars */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          flex: 1,
          background: '#1c2030',
          padding: '0 12px 8px',
        }}>
          {volumeData.map((bar, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: '#3a4060',
                borderRadius: '0 0 2px 2px',
                height: `${(bar.down / maxDown) * 100}%`,
              }}
            />
          ))}
        </div>

      </div>

      

    </div>
  )
}