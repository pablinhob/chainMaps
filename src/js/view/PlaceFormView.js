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
      title: '',
      desc: '',
      imageLink: '',
      lat: '',
      lng: '',
      zoom: ''
    };


    that.$el.html( that.tpl(tplData) );
    FormUtils.setFormMap('#placeLat','#placeLng','#placeZoom');
  }

});
