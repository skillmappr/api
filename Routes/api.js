const express = require('express');
const router = express.Router();
const driver = require('../dbConfig/dbConfig');

router.post('/buscaTodos', async (req, res) => {

  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (n) OPTIONAL MATCH (n)-[r]-(m) RETURN n, r, m");
    const nodesFixo = resultFixo.records.map(record => record.get(0).properties);
    res.json(nodesFixo);

  } catch (error) {
    console.error(error);

    if (error.code == 'Neo.ClientError.Statement.SyntaxError') {
      res.status(500).json({ error: 'Erro ao executar a consulta, a query está incorreta' });
    }
    else {
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }

  } finally {
    await session.close();
  }
});

module.exports = router;
