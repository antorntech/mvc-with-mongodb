const express = require('express');
const app = express.Router();
const toolsControllers = require('../../controllers/tools.controller')

app.get('/', toolsControllers.allTools)
app.post('/', upload.array('file'), toolsControllers.saveTool)
app.get('/:id', toolsControllers.toolDetails)
app.patch('/:id', toolsControllers.toolUpdate)
app.delete('/:id', toolsControllers.toolDelete)


module.exports = app;