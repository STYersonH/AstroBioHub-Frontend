// Script para manejar errores de Godot y mejorar la experiencia
(function() {
    'use strict';
    
    // Función para abrir enlaces externos directamente
    function openExternalLink(url) {
        console.log('Abriendo enlace externo:', url);
        if (window.parent && window.parent !== window) {
            // Si estamos en un iframe, navegar en la ventana padre
            window.parent.location.href = url;
        } else {
            // Si no hay padre, navegar directamente
            window.location.href = url;
        }
    }
    
    // Interceptar errores de Godot y convertirlos en mensajes más amigables
    const originalConsoleError = console.error;
    console.error = function(...args) {
        const message = args.join(' ');
        
        // Filtrar errores conocidos de Godot que no son críticos
        if (message.includes('Method not found') || 
            message.includes('_on_StaticBody_input_event') ||
            message.includes('GL_INVALID_OPERATION') ||
            message.includes('WebGL: too many errors')) {
            // Estos son errores normales de Godot, no los mostramos
            return;
        }
        
        // Mostrar otros errores normalmente
        originalConsoleError.apply(console, args);
    };
    
    // Interceptar clics en enlaces
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Si es un enlace
        if (target.tagName === 'A' && target.href) {
            event.preventDefault();
            openExternalLink(target.href);
        }
        
        // Si es un elemento con data-href
        if (target.hasAttribute('data-href')) {
            event.preventDefault();
            openExternalLink(target.getAttribute('data-href'));
        }
    });
    
    // Función global para usar desde Godot
    window.openExternalLink = function(url) {
        openExternalLink(url);
    };
    
    // Interceptar window.open
    const originalOpen = window.open;
    window.open = function(url, target, features) {
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            openExternalLink(url);
            return null;
        }
        return originalOpen.call(this, url, target, features);
    };
    
    // Manejar errores de Godot de forma más elegante
    window.addEventListener('error', function(event) {
        if (event.message && (
            event.message.includes('Method not found') ||
            event.message.includes('_on_StaticBody_input_event')
        )) {
            event.preventDefault();
            return false;
        }
    });
    
    console.log('Sistema de manejo de errores de Godot inicializado');
})();
