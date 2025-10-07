// Script para manejar enlaces externos en Godot
// Agrega este código a tu proyecto de Godot o al HTML del juego

(function() {
    'use strict';
    
    // Función para enviar enlaces externos al padre
    function sendExternalLink(url) {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'external-link',
                url: url
            }, '*');
        } else {
            // Si no hay padre, abrir directamente
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }
    
    // Interceptar clics en enlaces
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Si es un enlace
        if (target.tagName === 'A' && target.href) {
            event.preventDefault();
            sendExternalLink(target.href);
        }
        
        // Si es un elemento con data-href
        if (target.hasAttribute('data-href')) {
            event.preventDefault();
            sendExternalLink(target.getAttribute('data-href'));
        }
    });
    
    // Escuchar mensajes del padre
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'setup-external-links') {
            console.log('Comunicación con padre establecida');
        }
    });
    
    // Función global para usar desde Godot
    window.openExternalLink = function(url) {
        sendExternalLink(url);
    };
    
    // Interceptar window.open
    const originalOpen = window.open;
    window.open = function(url, target, features) {
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            sendExternalLink(url);
            return null;
        }
        return originalOpen.call(this, url, target, features);
    };
    
    console.log('Sistema de enlaces externos inicializado');
})();
