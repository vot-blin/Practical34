const http = require('http');
const fs = require('fs'); // Модуль для работы с файловой системой
const path = require('path'); // Модуль для работы с путями
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    let filePath;

  // Определяем, какой файл нужно отдать
  if (req.url === '/') {
    filePath = path.join(__dirname, 'index.html'); // Основная страница
  } else {
    filePath = path.join(__dirname, '404.html'); // Страница 404
  }
  if (req.url === '/styles.css') {
    filePath = path.join(__dirname, 'styles.css');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(fs.readFileSync(filePath));
  }

  // Чтение файла
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Если файл не найден, возвращаем 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Страница не найдена</h1>');
      return;
    }

    // Устанавливаем статус 200 для основной страницы или 404 для других случаев
    const statusCode = req.url === '/' ? 200 : 404;
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(data); // Отправляем содержимое файла
  });
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
