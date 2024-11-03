const model=require("./../model/student.model")
module.exports.index = (req, res) => {
    res.render("./../views/client/pages/calculator.pug");
}
module.exports.listModel = async (req, res) => {
    const listModel= await model.find();
    res.render("./../views/client/pages/listModel.pug",{listModel});
    console.log(listModel);
}
module.exports.detail = (req, res) => {
    res.render("./../views/client/pages/detail.pug");
}

