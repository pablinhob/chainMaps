#!/bin/bash

if [ -z "$1" ]
  then
    echo "argument deploy dir"
else
  echo "deploy to $1"
  cp -R src/css $1/css
  cp -R src/img $1/img
  cp -R src/js $1/js
  cp -R src/vendorStatic $1/vendorStatic
  cp -R src/index.html $1/


  mkdir -p $1/vendor/bootstrap/dist/{js,css}
  cp src/vendor/bootstrap/dist/css/bootstrap.min.css $1/vendor/bootstrap/dist/css/bootstrap.min.css
  cp src/vendor/bootstrap/dist/js/bootstrap.min.js $1/vendor/bootstrap/dist/js/bootstrap.min.js

  mkdir -p $1/vendor/bootstrap/dist/{fonts,css}
  cp src/vendor/font-awesome/css/font-awesome.min.css $1/vendor/font-awesome/css/font-awesome.min.css
  cp src/vendor/font-awesome/fonts/* $1/vendor/font-awesome/fonts/
  
  mkdir -p $1/vendor/bootstrap-select/dist/{js,css}
  cp src/vendor/bootstrap-select/dist/css/bootstrap-select.min.css $1/vendor/bootstrap-select/dist/css/bootstrap-select.min.css
  cp src/vendor/bootstrap-select/dist/js/bootstrap-select.min.js $1/vendor/bootstrap-select/dist/js/bootstrap-select.min.js

  mkdir -p $1/vendor/leaflet/dist
  cp src/vendor/leaflet/dist/leaflet.css $1/vendor/leaflet/dist/leaflet.css
  cp src/vendor/leaflet/dist/leaflet.js $1/vendor/leaflet/dist/leaflet.js

  mkdir -p $1/vendor/leaflet.markercluster/dist
  cp src/vendor/leaflet.markercluster/dist/MarkerCluster.Default.css $1/vendor/leaflet.markercluster/dist/MarkerCluster.Default.css
  cp src/vendor/leaflet.markercluster/dist/leaflet.markercluster.js $1/vendor/leaflet.markercluster/dist/leaflet.markercluster.js

  mkdir -p $1/vendor/jquery/dist
  cp src/vendor/jquery/dist/jquery.min.js $1/vendor/jquery/dist/jquery.min.js

  mkdir -p $1/vendor/jquery-validation/dist
  cp src/vendor/jquery-validation/dist/jquery.validate.min.js $1/vendor/jquery-validation/dist/jquery.validate.min.js

  mkdir -p $1/vendor/underscore
  cp src/vendor/underscore/underscore-min.js $1/vendor/underscore/underscore-min.js

  mkdir -p $1/vendor/backbone
  cp src/vendor/backbone/backbone-min.js $1/vendor/backbone/backbone-min.js


  mkdir -p $1/vendor/leaflet.icon.glyph
  cp src/vendor/leaflet.icon.glyph/Leaflet.Icon.Glyph.js $1/vendor/leaflet.icon.glyph/Leaflet.Icon.Glyph.js







fi
