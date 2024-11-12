import React from 'react'
export default function Footer() {
  return (
    <footer className="bg-blue-50/30 text-blue-400 py-6">
      <div className="container mx-auto text-center text-blue-400">
        <p>© {new Date().getFullYear()} Freddo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}