const model = require("./../model/student.model")
module.exports.index = (req, res) => {
    res.render("./../views/client/pages/calculator.pug");
}

module.exports.listModel = async (req, res) => {
    const dssv = await model.find();
    res.render("./../views/client/pages/listModel.pug",
        {dssv}
    );
}

module.exports.detailModel = async (req, res) => {
    const id = req.params.id;
    const idModel = await model.findOne().where('id').equals(id);

    res.render("./../views/client/pages/detailModel.pug", {idModel});
    console.log(idModel);
}

module.exports.detail = (req, res) => {
    res.render("./../views/client/pages/detail.pug");
}

