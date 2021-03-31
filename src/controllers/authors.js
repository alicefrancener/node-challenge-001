const { ValidationError } = require('objection');
const Author = require('../models/authors');

class AuthorController {
  async show(req, res, next) {
    const { id } = req.params;
    try {
      const author = await Author.query()
        .findById(id)
        .select('name', 'picture');

      if (!author) {
        const message = 'Author not found.';
        const error = new Error();
        error.message = message;
        res.status(404);
        throw error;
      }
      res.json(author);
    } catch (error) {
      next(error);
    }
  }

  async index(req, res) {
    const authors = await Author.query().select('name', 'picture');
    return res.json(authors);
  }

  async create(req, res, next) {
    const author = req.body;
    try {
      const createdAuthor = await Author.query().insert(author);
      res.status(201).send(createdAuthor);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400);
      }
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const author = req.body;
    try {
      const updatedAuthor = await Author.query().findById(id).patch(author);
      if (!updatedAuthor) {
        const message = 'Author does not exist.';
        const error = new Error();
        error.message = message;
        res.status(400);
        throw error;
      }
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;
    try {
      const deletedAuthor = await Author.query().deleteById(id);
      if (!deletedAuthor) {
        const message = 'Author does not exist.';
        const error = new Error();
        error.message = message;
        res.status(400);
        throw error;
      }
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthorController;
