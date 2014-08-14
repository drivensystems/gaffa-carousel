# gaffa-carousel

A simple image carousel for gaffa

## usage

    Carousel = require('gaffa-carousel');

    gaffa.registerConstructor(Carousel);

    var carousel = new Carousel();

## Properties:

### items (get)

    an array of URL's to the carousels images

### value (get, set)

    the current item