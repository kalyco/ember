// Array.find polyfill from https://developer.mozilla.org/en-US/docs/wev/Javacsript
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

var posts = [
  {
    id: 1,
    title: 'Bananas',
    author: 1,
    body: 'The most controversial aspect of the banana is whether it should be opened from the bottom or the top.'
  },
  {
    id: 2,
    title: 'Monkeys',
    author: 1,
    body: 'Monkeys are pretty cool animals. While true, tigers are still the bestest animals of all.'
  }
 ];

var authors  = [{
  id: 1,
  name: 'Persony Personson',
  posts: [1,2]
}];

module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  postsRouter.get('/', function(req, res) {
    res.send({
      "posts": posts,
      "authors": authors
    });
  });

  postsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
    res.send({
      "post": posts.find(function(post) {        return post.id == req.params.id
      }),
      "authors": authors
    });
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
