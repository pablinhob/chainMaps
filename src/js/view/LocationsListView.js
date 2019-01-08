var LocationsListView = Backbone.View.extend({
  tpl: _.template( $("#locationFormTemplate").html(), {} ),
  events: {
  },
  initialize: function(){

  },
  render: function(){
    var that = this;
    that.$el.html( that.tpl() );
  }

});
