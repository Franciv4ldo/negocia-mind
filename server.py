#!/usr/bin/env python3
"""
Simple HTTP server for testing the negotiation planning website
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Change to the directory containing the website files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def start_server(port=PORT):
    try:
        with socketserver.TCPServer(("", port), MyHTTPRequestHandler) as httpd:
            print(f"🧠 Servidor iniciado em http://localhost:{port}")
            print("📚 Planejar para Negociar - Ferramenta Interativa de Estratégia")
            print("=" * 60)
            print("Para parar o servidor, pressione Ctrl+C")
            print("=" * 60)
            
            # Try to open the browser automatically
            try:
                webbrowser.open(f'http://localhost:{port}')
                print("🌐 Abrindo navegador automaticamente...")
            except:
                print(f"💡 Abra seu navegador e acesse: http://localhost:{port}")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Servidor encerrado. Obrigado por usar a ferramenta!")
        sys.exit(0)
    except OSError as e:
        if e.errno == 10048:  # Port already in use on Windows
            print(f"❌ Porta {port} já está em uso. Tentando porta {port + 1}...")
            start_server(port + 1)
        else:
            print(f"❌ Erro ao iniciar servidor: {e}")
            sys.exit(1)

if __name__ == "__main__":
    start_server()
