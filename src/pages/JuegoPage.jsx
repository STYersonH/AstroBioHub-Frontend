import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JuegoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [externalLink, setExternalLink] = useState(null);

  // Función para manejar enlaces externos
  const handleExternalLink = (url) => {
    // Verificar si es un enlace externo
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setExternalLink(url);
    }
  };

  // Función para abrir enlace externo
  const openExternalLink = () => {
    if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
      setExternalLink(null);
    }
  };

  // Función para cancelar enlace externo
  const cancelExternalLink = () => {
    setExternalLink(null);
  };

  useEffect(() => {
    // Escuchar mensajes del iframe
    const handleMessage = (event) => {
      // Aceptar mensajes de cualquier origen para enlaces externos
      if (event.data) {
        if (event.data.type === 'navigate' && event.data.url) {
          handleExternalLink(event.data.url);
        } else if (event.data.type === 'external-link' && event.data.url) {
          handleExternalLink(event.data.url);
        } else if (typeof event.data === 'string' && event.data.startsWith('http')) {
          handleExternalLink(event.data);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Interceptar TODOS los clics en la página
    const handleClick = (event) => {
      const target = event.target;
      
      // Si es un enlace
      if (target.tagName === 'A' && target.href) {
        event.preventDefault();
        event.stopPropagation();
        handleExternalLink(target.href);
        return false;
      }
      
      // Si es un elemento con data-href
      if (target.hasAttribute('data-href')) {
        event.preventDefault();
        event.stopPropagation();
        handleExternalLink(target.getAttribute('data-href'));
        return false;
      }
      
      // Buscar enlaces en elementos padre
      let parent = target.parentElement;
      while (parent && parent !== document.body) {
        if (parent.tagName === 'A' && parent.href) {
          event.preventDefault();
          event.stopPropagation();
          handleExternalLink(parent.href);
          return false;
        }
        if (parent.hasAttribute('data-href')) {
          event.preventDefault();
          event.stopPropagation();
          handleExternalLink(parent.getAttribute('data-href'));
          return false;
        }
        parent = parent.parentElement;
      }
    };

    // Interceptar antes de que llegue al iframe
    document.addEventListener('click', handleClick, true);
    
    // También interceptar el evento beforeunload para detectar navegación
    const handleBeforeUnload = (event) => {
      // Si el iframe está intentando navegar, interceptar
      if (event.target === document.querySelector('iframe')) {
        event.preventDefault();
        return false;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    
    // Intentar configurar comunicación con el iframe
    try {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        // Enviar mensaje al iframe para configurar comunicación
        iframe.contentWindow.postMessage({
          type: 'setup-external-links',
          parentOrigin: window.location.origin
        }, '*');
      }
    } catch (error) {
      console.log('Configuración de comunicación con iframe completada');
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Pantalla de carga */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{
                width: "50px",
                height: "50px",
                border: "3px solid #66FF9E",
                borderTop: "3px solid transparent",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                color: "#66FF9E",
                fontSize: "18px",
                fontWeight: "500",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Cargando juego...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pantalla de error */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div
              style={{
                color: "#ff6b6b",
                fontSize: "24px",
                fontWeight: "500",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              ⚠️ Error al cargar el juego
            </div>
            <p
              style={{
                color: "#ccc",
                fontSize: "16px",
                textAlign: "center",
                maxWidth: "400px",
                lineHeight: "1.5",
              }}
            >
              No se pudo cargar el juego de Godot. Asegúrate de que los archivos
              estén en la carpeta correcta.
            </p>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                // Recargar la página
                window.location.reload();
              }}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#66FF9E",
                color: "black",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#55e88a")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#66FF9E")}
            >
              Reintentar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para enlaces externos */}
      <AnimatePresence>
        {externalLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "15px",
                maxWidth: "500px",
                width: "90%",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  marginBottom: "15px",
                  color: "#333",
                }}
              >
                🌐 Enlace Externo
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  marginBottom: "20px",
                  wordBreak: "break-all",
                }}
              >
                El juego quiere abrir un enlace externo:
              </p>
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "25px",
                  fontSize: "14px",
                  color: "#333",
                  wordBreak: "break-all",
                }}
              >
                {externalLink}
              </div>
              <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                <button
                  onClick={openExternalLink}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#66FF9E",
                    color: "black",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#55e88a")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#66FF9E")}
                >
                  ✅ Abrir Enlace
                </button>
                <button
                  onClick={cancelExternalLink}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#ff5252")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6b6b")}
                >
                  ❌ Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Iframe del juego */}
      <iframe
        src="/godot/nasa_espace_challenge.html"
        title="NASA Espace Challenge"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        allow="fullscreen"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        ref={(iframe) => {
          if (iframe) {
            // Interceptar navegación del iframe
            iframe.addEventListener('load', () => {
              try {
                // Intentar interceptar window.open del iframe
                const iframeWindow = iframe.contentWindow;
                if (iframeWindow) {
                  const originalOpen = iframeWindow.open;
                  iframeWindow.open = function(url, target, features) {
                    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                      handleExternalLink(url);
                      return null;
                    }
                    return originalOpen.call(this, url, target, features);
                  };
                }
              } catch (error) {
                console.log('No se puede acceder al contenido del iframe por seguridad');
              }
            });
          }
        }}
      />
    </div>
  );
}
