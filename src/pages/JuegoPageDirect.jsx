import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JuegoPageDirect() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [minLoadingTime, setMinLoadingTime] = useState(true);

  // Función para manejar enlaces externos - abrir directamente
  const handleExternalLink = (url) => {
    console.log('Abriendo enlace externo directamente:', url);
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      // Abrir directamente en la misma pestaña
      window.location.href = url;
    }
  };

  useEffect(() => {
    // Tiempo mínimo de carga para mostrar las instrucciones
    const minTimer = setTimeout(() => {
      setMinLoadingTime(false);
      setIsLoading(false); // Forzar que se oculte después de 10 segundos
    }, 10000); // 10 segundos mínimo

    // Agregar una entrada al historial para que el botón atrás funcione correctamente
    window.history.pushState({ fromGame: true }, '', window.location.href);
    
    // Manejar el evento de navegación hacia atrás
    const handlePopState = (event) => {
      console.log('Botón atrás presionado, regresando a página principal');
      // Redirigir a la página principal
      window.location.href = '/';
    };
    
    window.addEventListener('popstate', handlePopState);

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
      clearTimeout(minTimer);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleIframeLoad = () => {
    // NO ocultar la carga automáticamente - solo cuando pase el tiempo mínimo
    console.log('Iframe cargado, pero manteniendo instrucciones visibles');
    
    // Intentar interceptar window.open del iframe
    try {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        console.log('Intentando interceptar window.open del iframe');
        
        // Interceptar window.open del iframe
        const originalOpen = iframe.contentWindow.open;
        iframe.contentWindow.open = function(url, target, features) {
          console.log('window.open interceptado:', url);
          if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            handleExternalLink(url);
            return null;
          }
          return originalOpen.call(this, url, target, features);
        };
        
        // También interceptar location.href
        const originalLocationSetter = Object.getOwnPropertyDescriptor(iframe.contentWindow.location, 'href').set;
        Object.defineProperty(iframe.contentWindow.location, 'href', {
          set: function(url) {
            console.log('location.href interceptado:', url);
            if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
              handleExternalLink(url);
              return;
            }
            originalLocationSetter.call(this, url);
          },
          get: Object.getOwnPropertyDescriptor(iframe.contentWindow.location, 'href').get
        });
      }
    } catch (error) {
      console.log('No se puede acceder al contenido del iframe por seguridad:', error);
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                color: "#66FF9E",
                fontSize: "18px",
                fontWeight: "500",
                fontFamily: "system-ui, -apple-system, sans-serif",
                textAlign: "center",
                maxWidth: "400px",
              }}
            >
              <p
                style={{
                  marginBottom: "20px",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#66FF9E",
                }}
              >
                Loading game...
              </p>
              
              <div
                style={{
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: "#ffffff",
                  opacity: 1,
                }}
              >
                <div style={{ marginBottom: "15px" }}>
                  <strong style={{ color: "#66FF9E" }}>Game Controls:</strong>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ color: "#66FF9E" }}>W</span> - Move forward
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ color: "#66FF9E" }}>S</span> - Move backward
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ color: "#66FF9E" }}>A</span> - Move left
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ color: "#66FF9E" }}>D</span> - Move right
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <span style={{ color: "#66FF9E" }}>Left Mouse Click</span> - Rotate
                </div>
              </div>
            </motion.div>
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
              onClick={() => window.location.reload()}
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
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock"
      />
    </div>
  );
}
