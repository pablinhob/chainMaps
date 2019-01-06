var MapView = Backbone.View.extend({
  tpl: _.template( $("#mapTemplate").html(), {} ),
  events: {

  },
  initialize: function(){

  },
  render: function(){
    var that = this;

    that.$el.html( that.tpl() );
  },

  showPlace: function(idPlace) {
    alert("Show in map "+ idPlace)
  }

});
