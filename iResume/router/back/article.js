var express = require('express');
var router = express.Router();


var articleMod = require('../../modules/Article/article');
var articleTypeMod = require('../../modules/Article/articleType');
var articleTagMod = require('../../modules/Article/articleTag');
var uploadIMGMod = require('../../modules/uploadIMG');

var scriptlink = require('./arclist_script');

router.post('/uploadArtIMG', function (req, res) {
  uploadIMGMod.upLoadIMG(req, '/images/upload/article/', function (err, result) {
    if (err) {
      return;
    }
    res.json({
      "errno": 0,
      "data": [result]
    })
  })
});



/* 显示所有文章 */
router.get('/articlelist', function (req, res) {
  res.render('./backend/articlelist', {
    pageTitle: "文章列表",
    userName: req.session.user.username,
    importScript: ['/js/back/articlelist.js']
  });
})
router.post('/articlelist', function (req, res) {
  var isDel = false;
  var referer = req.headers['referer'];
  if (referer.indexOf('articleTrash') > 0) {
    isDel = true;
  }
  req.body.by ? req.body.by['is_delete'] = isDel : req.body.by = {
    'is_delete': isDel
  };
  articleMod.getCount(req, function (err, artCount) {
    if (err) {
      return res.json({
        status: 0,
        msg: '获取数据失败'
      });
    }
    articleMod.showArticleList(req, function (err, result) {
      if (err) {
        return res.json({
          status: 0,
          msg: '获取数据失败'
        });
      }
      return res.json({
        status: 1,
        msg: '',
        data: {
          artInfo: result,
          artCount: artCount
        }
      });
    });
  })
});
router.get('/articleTrash', function (req, res, next) {
  res.render('./backend/articlelist', {
    pageTitle: '文章回收站',
    modalTips: '确认删除吗，此操作无法恢复？！',
    importScript: ['/js/back/artlistTrash.js']
  })
});

router.get('/recoveryArticle/:id', function (req, res, next) {
  if (req.session.user.permissions !== 'root') {
    return res.json({
      status: 0,
      msg: '没有此操作权限'
    })
  }
  var arcid = req.params.id;
  articleMod.recoveryArticle(arcid, function (err, result) {
    if (err || !result) {
      return res.json({
        status: 0,
        msg: '操作失败'
      });
    }
    return res.json({
      status: 1,
      msg: '恢复成功'
    })
  })
});
router.use('/updatearticle', require('./article_update'));
router.use('/addArticle', require('./article_add'));
router.use('/type', require('./article_type'));
router.use('/tag', require('./article_tag'));
router.use('/remove', require('./article_remove'));
module.exports = router;