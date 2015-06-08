import Ember from 'ember';

export default Ember.Route.extend({
  mode: function() {
    return this.store.find('post');
  }
});

