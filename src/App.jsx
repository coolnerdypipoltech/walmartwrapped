import { useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [storeId, setStoreId] = useState('')
  const [video, setVideo] = useState(null)
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setVideo(null)
    setStore(null)

    try {
      // Buscar la tienda por storeId
      const { data: storeData, error: storeError } = await supabase
        .from('Store')
        .select('*')
        .eq('storeId', storeId)
        .single()

      if (storeError) {
        setError('No se encontró la tienda con ese ID')
        setLoading(false)
        return
      }

      setStore(storeData)
      setVideo(storeData.link)
    } catch (err) {
      setError('Error al buscar los datos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="app">
      <div className="container">
        <h1>Buscador de Videos</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Ingresa el Store ID"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
              className="search-input"
            />
            <button type="submit" disabled={loading} className="search-btn">
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {store && (
          <div className="store-info">
            <h2> Tienda: {store.name || 'Sin nombre'}</h2>
            <p><strong>ID:</strong> {store.storeId}</p>
            {store.link && (
              <p>
                <strong>Link:</strong>{' '}
                <a href={store.link} target="_blank" rel="noopener noreferrer">
                  {store.link}
                </a>
              </p>
            )}
          </div>
        )}
        

        {video && (
          <div className="video-container">
            <h3>Video Encontrado</h3>
            <div className="video-card">
              <p><strong>Descargar video:</strong></p>
              <div
                href={video} 
                target="_blank" 
                rel="noopener noreferrer"
                className="video-link"
                onClick={() => {window.open("https://drive.google.com/u/1/uc?id=" + store.fileId + "&export=download", "_blank");}}
              >
                Haz clic aquí para descargar el video
              </div>
              {video ? (
                <div className="video-player">
                  <iframe
                    width="100%"
                    height="400"
                    src={video}
                    title="video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="video-preview">
                  <p> Haz clic en el link para ver el video</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
