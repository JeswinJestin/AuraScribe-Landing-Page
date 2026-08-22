import { ImageResponse } from 'next/og'

// Real social share card (1200x630), generated at build. Dark chamber + cream editorial type,
// matching the site. No external fonts so it renders reliably offline.
export const runtime = 'nodejs'
export const alt = 'AuraScribe - free, offline voice dictation for Windows, macOS and Linux'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#131110',
          color: '#F4EFE3',
          padding: '72px 80px',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 40 }}>
            <div style={{ width: 8, height: 20, background: '#4C6FFF', borderRadius: 4 }} />
            <div style={{ width: 8, height: 34, background: '#4C6FFF', borderRadius: 4 }} />
            <div style={{ width: 8, height: 40, background: '#E8555C', borderRadius: 4 }} />
            <div style={{ width: 8, height: 28, background: '#4C6FFF', borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>AuraScribe</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 78, lineHeight: 1.02, letterSpacing: -1.5, maxWidth: 940 }}>
            Dictate anywhere. Nothing leaves your machine.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: '#B9B2A2',
              fontFamily: 'Helvetica, Arial, sans-serif',
              maxWidth: 900,
            }}
          >
            Free, open-source, 100% offline voice dictation for Windows, macOS, and Linux.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 14,
            fontSize: 22,
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: '#9C9482',
          }}
        >
          <div style={{ display: 'flex', color: '#4C6FFF', fontWeight: 700 }}>Free</div>
          <div style={{ display: 'flex' }}>·  Open source  ·  No cloud  ·  No account  ·  ~9 MB</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
