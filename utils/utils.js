import fs from 'node:fs/promises'

export const readJson =  async (path) => {
try {
  const moviesData = await fs.readFile(path, 'utf8');
  // Procese los datos de la película
  return JSON.parse(moviesData)
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`Error: Archivo no encontrado: ${path}`);
  } else {
    console.error(`Error al leer el archivo: ${err}`);
  }
}
}