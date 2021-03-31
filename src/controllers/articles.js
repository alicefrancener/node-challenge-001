const { ForeignKeyViolationError, ValidationError } = require('objection');
const Article = require('./../models/articles');
const Author = require('./../models/authors');

class ArticleController {
  async showById(req, res, next) {
    const { id } = req.params;
    let article = await Article.query()
      .findById(id)
      .join('author', 'author.id', 'article.author_id')
      .select('article.*', 'author.name', 'author.picture');

    if (article) {
      article = {
        author: { name: article.name, picture: article.picture },
        category: article.category,
        title: article.title,
        summary: article.summary,
        firstParagraph: article.first_paragraph,
        body: article.body,
      };

      if (!req.user) delete article.body;
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

  async create(req, res, next) {
    const article = req.body;
    try {
      const createdArticle = await Article.query().insert(article);
      res.status(201).send(createdArticle);
    } catch (error) {
      if (error instanceof ForeignKeyViolationError) {
        error.message = 'Author does not exist.';
        res.status(400);
      }
      if (error instanceof ValidationError) {
        res.status(400);
      }
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const article = req.body;
    try {
      const updatedArticle = await Article.query().findById(id).patch(article);
      if(!updatedArticle) {
        const message = 'Article does not exist.';
        const error = new Error();
        error.message = message;
        res.status(400);
        throw error;
      }
      res.sendStatus(204);
    } catch(error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    const {id} = req.params;
    try {
      const deletedArticle = await Article.query().deleteById(id);
      if(!deletedArticle) {
        const message = 'Article does not exist.';
        const error = new Error();
        error.message = message;
        res.status(400);
        throw error;
      }

      res.sendStatus(204);
    } catch(error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ArticleController;
