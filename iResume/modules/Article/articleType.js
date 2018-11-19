var articleType = require('../../db/schema/article/ArticleType');

module.exports = {
    findArticleType: function (pars, cb) {
        articleType.find(pars || {}, cb);
    },
    addArticleType: function (pars, cb) {
        articleType.create(pars || {}, cb);
    },
    removeArticleType: function (typeid, cb) {
        articleType.remove({
            _id: typeid
        }).exec(cb);
    }
}