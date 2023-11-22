const express = require('express');
const router = express.Router();
const driver = require('../dbConfig/dbConfig');

//Busca todos os dados do banco
router.post('/buscaTodos', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (n) OPTIONAL MATCH (n)-[r]-(m) RETURN n, r, m");
    const nodesFixo = resultFixo.records.map(record => {
      return {
        conteudo: record.get('n').properties,
        relacao: record.get('r').type,
        eixo: record.get('m').properties
      };
    });
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

//Busca todas Competências Gerais esperadas dos egressos
router.post('/buscaCompetenciasGerais', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (n:SBC_CompetenciaGeralEgresso) RETURN n");
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

//Busca todas Competências Específicas esperadas dos egressos
router.post('/buscaCompetenciasEspecificas', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (n:SBC_CompetenciaEspecificaEgresso) RETURN n");
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

//Busca todas Competências Derivadas
router.post('/buscaCompetenciasDerivadas', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (n:SBC_CompetenciaDerivada) RETURN n");
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

//Busca todos Conteúdos
router.post('/buscaConteudos', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (n:SBC_Conteudo) RETURN n");
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

//Busca todos Eixos
router.post('/buscaEixos', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (n:SBC_Eixo) RETURN n");
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

//Busca todos Conteúdos e os Eixos que eles pertencem
router.post('/buscaConteudosEixos', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (eixo:SBC_Eixo) MATCH (conteudo:SBC_Conteudo)-[r:PERTENCE]->(eixo) RETURN conteudo, r, eixo");
    const nodesFixo = resultFixo.records.map(record => {
      return {
        conteudo: record.get('conteudo').properties,
        relacao: record.get('r').type,
        eixo: record.get('eixo').properties
      };
    });

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

//Busca todas Competências Geral esperadas do egresso e as Competências Derivadas que são necessárias trabalhar para alcançar elas
router.post('/buscaGeralDerivada', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (comp_geral_egres:SBC_CompetenciaGeralEgresso) MATCH (comp_deriv:SBC_CompetenciaDerivada)-[r:CONTRIBUI_PARA]->(comp_geral_egres) RETURN comp_deriv, r, comp_geral_egres");
    const nodesFixo = resultFixo.records.map(record => {
      return {
        conteudo: record.get('comp_deriv').properties,
        relacao: record.get('r').type,
        eixo: record.get('comp_geral_egres').properties
      };
    });

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

//Busca todas Competências Específicas esperadas do egresso e as Competências Derivadas que são necessárias trabalhar para alcançar elas
router.post('/buscaEspecificaDerivada', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (comp_espec_egres:SBC_CompetenciaEspecificaEgresso) MATCH (comp_deriv:SBC_CompetenciaDerivada)-[r:CONTRIBUI_PARA]->(comp_espec_egres) RETURN comp_deriv, r, comp_espec_egres");
    const nodesFixo = resultFixo.records.map(record => {
      return {
        conteudo: record.get('comp_deriv').properties,
        relacao: record.get('r').type,
        eixo: record.get('comp_espec_egres').properties
      };
    });

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

//Busca todos Conteúdos que devem ser trabalhados para atingir as Competências Derivadas
router.post('/buscaConteudoDerivado', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (conteudo:SBC_Conteudo) MATCH (conteudo)-[r]->(comp_deriv:SBC_CompetenciaDerivada) RETURN comp_deriv, r, conteudo");
    const nodesFixo = resultFixo.records.map(record => {
      return {
        conteudo: record.get('conteudo').properties,
        relacao: record.get('r').type,
        eixo: record.get('comp_deriv').properties
      };
    });
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

//Busca todas Competências Derivadas e os Eixos que elas pertencem
router.post('/buscaDerivadaEixos', async (req, res) => {
  const session = driver.session();
  try {
    const resultFixo = await session.run("MATCH (eixo:SBC_Eixo) MATCH (comp_deriv:SBC_CompetenciaDerivada)-[r:PERTENCE]->(eixo) RETURN comp_deriv, r, eixo");
    const nodesFixo = resultFixo.records.map(record => {
      return {
        conteudo: record.get('comp_deriv').properties,
        relacao: record.get('r').type,
        eixo: record.get('eixo').properties
      };
    });
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
