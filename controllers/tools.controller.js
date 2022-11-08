let tools = [
    {
        "id": 1,
        "name": "Hammer"
    },
    {
        "id": 2,
        "name": "Iron"
    },
    {
        "id": 3,
        "name": "Belt"
    }
]

module.exports.allTools = (req,res) => {
    res.send(tools)
}

module.exports.saveTool = (req,res) => {
    const newTool = req.body;
    if (req.file) {
        Object.assign(newTool, { document: '/uploads/document/' + req.file.filename });
    }
    tools.push(newTool);
    res.send(tools);
}

module.exports.toolDetails = (req,res) =>{
    const {id} = req.params;
    const singleTool = tools.find(tool=> tool.id === Number(id))
    res.send(singleTool);
}

module.exports.toolUpdate = (req, res) =>{
    const {id} = req.params;
    const newTool = tools.find(tool=> tool.id === Number(id));
    newTool.name = req.body.name;

    res.send(newTool);
}

module.exports.toolDelete = (req,res) =>{
    const {id} = req.params;
    tools = tools.filter(tool => tool.id !== Number(id));
    res.send("Delete Successful");
}