const express = require('express');
const app = express();
const apiRoutes = require('./Routes/api');

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});