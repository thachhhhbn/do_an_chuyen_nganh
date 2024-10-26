module.exports.index = (req,res) => {
    res.render("./../views/client/layouts/index.pug");
}
module.exports.listStudent=(req,res) => {
    res.render("./../views/client/pages/listStudent.pug");
}
module.exports.ipPlanning=(req,res) => {
    res.render("./../views/client/pages/ipPlanning.pug");
}