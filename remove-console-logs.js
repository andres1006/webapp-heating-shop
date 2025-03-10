const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const stat = promisify(fs.stat)

// Directorios a excluir
const excludeDirs = ['node_modules', '.next', 'public', 'dist', '.git']

// Archivos a excluir (mantener los console.log/error)
const excludeFiles = [
  // Archivos de webhook y notificaciones (necesitan logs en producción)
  'src/app/api/webhook/mercadopago/route.ts',
  'src/app/api/paymentNotification/route.ts'
]

// Extensiones de archivos a procesar
const extensions = ['.js', '.jsx', '.ts', '.tsx']

// Expresiones regulares para encontrar console.log y console.error
const consoleLogRegex = /console\.log\s*\([^)]*\);?/g
const consoleErrorRegex = /console\.error\s*\([^)]*\);?/g

// Función para verificar si un archivo debe ser excluido
const shouldExcludeFile = (filePath) => {
  return excludeFiles.some((excludePath) => filePath.includes(excludePath))
}

// Función para procesar un archivo
async function processFile(filePath) {
  if (shouldExcludeFile(filePath)) {
    
    return
  }

  try {
    const content = await readFile(filePath, 'utf8')

    // Reemplazar console.log y console.error
    const newContent = content.replace(consoleLogRegex, '').replace(consoleErrorRegex, '')

    // Si el contenido ha cambiado, escribir el archivo
    if (content !== newContent) {
      await writeFile(filePath, newContent, 'utf8')
      
    }
  } catch (error) {
    
  }
}

// Función para recorrer directorios recursivamente
async function processDirectory(dirPath) {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)

      if (entry.isDirectory()) {
        // Saltar directorios excluidos
        if (excludeDirs.includes(entry.name)) {
          continue
        }

        await processDirectory(fullPath)
      } else if (entry.isFile() && extensions.includes(path.extname(entry.name))) {
        await processFile(fullPath)
      }
    }
  } catch (error) {
    
  }
}

// Función principal
async function main() {
  
  await processDirectory('.')
  
}

main().catch(console.error)
