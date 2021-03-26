const Article = require('./../models/articles');

class ArticleController {
  async showById(req, res, next) {
    const { id } = req.params;
    let article = await Article.query().findById(id)
      .join('author', 'author.id', 'article.author_id')
      .select(
        'article.*',
        'author.name',
        'author.picture'
      );

    if (article) {
      article = {
        author: { name: article.name, picture: article.picture },
        category: article.category,
        title: article.title,
        summary: article.summary,
        firstParagraph: article.first_paragraph,
        body: article.body
      };

      if(!req.user) delete article.body;
      return res.json(article);
    }

    return next();
  }

  async showByCategory(req, res, next) {
    const { category } = req.query;

    if (category) {
      let articles = await Article.query()
        .where('category', '=', category)
        .join('author', 'author.id', 'article.author_id')
        .select(
          'article.category',
          'article.title',
          'article.summary',
          'author.name',
          'author.picture'
        );

      articles = articles.map((article) => {
        return {
          author: { name: article.name, picture: article.picture },
          category: article.category,
          title: article.title,
          summary: article.summary,
        };
      });

      return res.json(articles);
    }

    return next();
  }

  async index(req, res) {
    const articles = await Article.query().select(
      'category',
      'title',
      'summary',
      'first_paragraph'
    );
    return res.json(articles);
  }
}

module.exports = ArticleController;
