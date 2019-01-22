var PlaceFormView = Backbone.View.extend({
  tpl: _.template( $("#placeFormTemplate").html(), {} ),
  events: {
  },
  initialize: function(){

  },
  render: function(){
    var that = this;

    var tplData = {
      newPlace: true,
      ttIndex: '',
      title: false,
      desc: false,
      imageLink: false,
      lat: false,
      lng: false,
      zoom: false
    };


    that.$el.html( that.tpl(tplData) );
  }

});
