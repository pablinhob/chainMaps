var PlacesListView = Backbone.View.extend({
  tpl: _.template( $("#placesListTemplate").html(), {} ),
  tplListElement: _.template( $("#placesListElementTemplate").html(), {} ),
  events: {
  },
  initialize: function(){

  },
  render: function(){
    var that = this;

    var listElement = that.tplListElement({id:10,title:'Ola mundo elemento'});

    that.$el.html( that.tpl({list:listElement}) );
  }

});
