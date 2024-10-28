import React from 'react'
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-100 py-6">
      <div className="container mx-auto text-center text-blue-900">
        <p>© {new Date().getFullYear()} Heating Shop. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}