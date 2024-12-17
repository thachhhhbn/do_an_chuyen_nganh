// const model = require("./../model/student.model");
module.exports.index = (req, res) => {
  res.render("./../views/client/pages/home.pug");
};
module.exports.cidr=(req,res)=>{
  res.render("./../views/client/pages/calculator.pug");
}
module.exports.vlsm=(req,res)=>{
  res.render("./../views/client/pages/vlsm.pug");
}
// module.exports.listModel = async (req, res) => {
//   const listModel = await model.find();

//   res.render("./../views/client/pages/listModel.pug", { listModel });
// };

// module.exports.detailModel = async (req, res) => {
//   const id = req.params.id;
//   const item = await model.findOne({ id });

//   res.render("./../views/client/pages/detailModel.pug", { item });
//   console.log(item);
// };

// module.exports.explainTool = (req, res) => {
//   res.render("./../views/client/pages/explainTool.pug");
// };
