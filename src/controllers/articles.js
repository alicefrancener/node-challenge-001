const Article = require('./../models/articles');

class ArticleController {

  async showById(req, res, next) {
    const { id } = req.params;
    const article = await Article.query().findById(id);

    if(article) {
      return res.json(article);
    }

    return next();
  }

  async index(req, res) {
    const articles = await Article.query().select('category_id', 'title', 'summary', 'first_paragraph');
    return res.json(articles);
  }
}

module.exports = ArticleController;
