// Solución alternativa: Componente que maneja enlaces externos de forma más directa
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JuegoPageAlternative() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [externalLink, setExternalLink] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);

  // Función para manejar enlaces externos
  const handleExternalLink = (url) => {
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

  // Función para reiniciar el iframe
  const restartIframe = () => {
    setIframeKey(prev => prev + 1);
    setIsLoading(true);
    setHasError(false);
  };

  useEffect(() => {
    // Interceptar TODOS los clics en la página
    const handleClick = (event) => {
      const target = event.target;
      
      console.log('Click detectado en:', target.tagName, target.href || target.getAttribute('href') || 'sin href');
      
      // Si es un enlace
      if (target.tagName === 'A' && target.href) {
        console.log('Enlace detectado:', target.href);
        event.preventDefault();
        event.stopPropagation();
        handleExternalLink(target.href);
        return false;
      }
      
      // Si es un elemento con href
      if (target.getAttribute && target.getAttribute('href')) {
        console.log('Elemento con href detectado:', target.getAttribute('href'));
        event.preventDefault();
        event.stopPropagation();
        handleExternalLink(target.getAttribute('href'));
        return false;
      }
      
      // Buscar enlaces en elementos padre
      let parent = target.parentElement;
      while (parent && parent !== document.body) {
        if (parent.tagName === 'A' && parent.href) {
          console.log('Enlace en padre detectado:', parent.href);
          event.preventDefault();
          event.stopPropagation();
          handleExternalLink(parent.href);
          return false;
        }
        if (parent.getAttribute && parent.getAttribute('href')) {
          console.log('Href en padre detectado:', parent.getAttribute('href'));
          event.preventDefault();
          event.stopPropagation();
          handleExternalLink(parent.getAttribute('href'));
          return false;
        }
        parent = parent.parentElement;
      }
    };

    // Interceptar antes de que llegue al iframe
    document.addEventListener('click', handleClick, true);
    
    // También interceptar mensajes del iframe
    const handleMessage = (event) => {
      console.log('Mensaje recibido del iframe:', event.data);
      if (event.data && event.data.type === 'external-link' && event.data.url) {
        handleExternalLink(event.data.url);
      }
    };
    
    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
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
                marginBottom: "20px",
              }}
            >
              No se pudo cargar el juego de Godot. Asegúrate de que los archivos
              estén en la carpeta correcta.
            </p>
            <button
              onClick={restartIframe}
              style={{
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
                🌐 Enlace Externo Detectado
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                Tu juego quiere abrir un enlace externo:
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
        key={iframeKey}
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
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock"
      />
    </div>
  );
}
