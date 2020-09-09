const express = require('express');
const db = require('../lib/queries');
const cors = require('cors');
const router = express.Router();

router.options('*', cors())

router.get('/',  function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
   res.json({msg: 'Η εφαρμογή τρέχει'});
});

router.get('/games', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    let pendingRows = await db.getGames();
    await res.json({
      rows: pendingRows
    });
  } catch (e) {
    console.trace(JSON.stringify(e));
    await res.status(500).json({
      error: e
    });
  }
});

router.get('/games/:id', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    let pendingRows = await db.getGameById(req);
    await res.json({
      rows: pendingRows
    });
  } catch (e) {
    console.trace(JSON.stringify(e));
    await res.status(500).json({
      error: e
    });
  }
});


router.put('/games', cors(), async function (req, res) {
  try {
    let pendingRows = await db.createGame(req);
    await res.json({
      rows: pendingRows
    });
  } catch (e) {
    console.trace(JSON.stringify(e));
    await res.status(500).json({
      error: e
    });
  }
});

router.post('/games/:id',cors(), async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    let pendingRows = await db.updateGame(req);
    await res.json({
      rows: pendingRows
    });
  } catch (e) {
    console.trace(JSON.stringify(e));
    await res.status(500).json({
      error: e
    });
  }
});

router.delete('/games/:id',cors(), async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    await db.deleteGame(req);
    await res.json({
      rows: req.params.id
    });
  } catch (e) {
    console.trace(JSON.stringify(e));
    await res.status(500).json({
      error: e
    });
  }
});

module.exports = router;
