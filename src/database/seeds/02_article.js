const tableName = 'article';

exports.seed = (knex) => {
  return knex(tableName)
    .del()
    .then(() => {
      return knex(tableName).insert([
        {
          title: 'Monolith First',
          summary: 'Why you shouldn\'t start a new project with microservices',
          first_paragraph: '<p>As I hear stories about teams using a microservices architecture, I\'ve noticed a common pattern.</p>',
          body: '<p>1. Almost all the successful microservice stories have started with a monolith that got too big and was broken up.</p> <p>Almost all the cases where I\'ve heard of a system that was built as a microservice system from scratch, it has ended up in serious trouble.</p>',
          author_id: 1,
          category: 'microservices'
        },
        {
          title: 'Everyday Systems That Help Me',
          summary: 'Systems that improves everyday life',
          first_paragraph: '<p>At some point in my life, I read A Case Against Optimizing Your Life , and I took it to heart, and I lived by it. Now I think Wise People Have Rules For Themselves is the right approach for me.</p>',
          body: '<p>The former basically says, "don\'t worry about trying to set up the perfect system; nothing will ever be perfect, so just relax and get used to chaos, and try to put all your focus on one thing at a time". The latter says, "set up self-imposed personal rules, because your quality of life will improve when your standards are clear".</p>',
          author_id: 2,
          category: 'productivity'
        },
      ]);
    });
};
