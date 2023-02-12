const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.allTools = async (req,res, next) => {
    try {
        const db = getDb();
        const result = await db.collection('toolsInfo').find().toArray();
        if(!result){
            return res.status(400).res.send({status: false, error: "Something went wrong"});
        }
        res.status(200).json({
            status: 'success',
            message: 'Data find successfully!',
            data: result
        })
    } catch (error) {
        next(error);
    }
}

module.exports.saveTool = async (req, res, next) => {
    try {
        const db = getDb();
        const newTool = req.body;
        let files = [];
        let images = {};

        req.files.map((file, index)=>{
            Object.assign(images,{[`file${index+1}`]: '/uploads/document/' + file.filename});       
        })

        files.push(images)

        if (files) {
            Object.assign(newTool, { file:  files});
        }

        const result = await db.collection('toolsInfo').insertOne(newTool);

        if(!result.insertedId){
            return res.status(400).send({status: false, error: "Something went wrong"})
        }
        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully!',
            data: result
        })
    } catch (error) {
        next(error);
    }
}

module.exports.toolDetails = async (req, res, next) =>{
    try {
        const db = getDb();
        const {id} = req.params;
        const result = await db.collection("toolsInfo").findOne({_id: ObjectId(id)})
        res.status(200).json({
            status: 'success',
            message: 'Data find successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not find',
            error: error
        })
    }
}

module.exports.toolUpdate = (req, res) =>{
    const {id} = req.params;
    const newTool = tools.find(tool=> tool.id === Number(id));
    newTool.name = req.body.name;

    res.send(newTool);
}

module.exports.toolDelete = async (req, res, next) =>{
    try {
        const db = getDb();
        const {id} = req.params;
        const result = await db.collection('toolsInfo').deleteOne({_id: ObjectId(id)})
        res.status(200).json({
            status: 'success',
            message: 'Data delete successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not delete',
            error: error
        })
    }
}