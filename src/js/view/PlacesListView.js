var PlacesListView = Backbone.View.extend({
  tpl: _.template( $("#placesListTemplate").html(), {} ),
  events: {
  },
  initialize: function(){

  },
  render: function(){
    var that = this;
    //that.$el.html( that.tpl() );
  }

});
