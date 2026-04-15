export default function Home() {
  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f0f4f8'
    }}>
      <h1 style={{ color: '#0070f3' }}>Iberomundo Viajes v2</h1>
      <p>La plataforma se está conectando con los vuelos...</p>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
        <strong>Estado:</strong> ✅ Motor encendido
      </div>
    </div>
  )
}
