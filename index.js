var Gaffa = require('gaffa'),
    doc = require('doc-js'),
    crel = require('crel'),
    venfix = require('venfix'),
    DialRoller = require('dial-roller');

function Carousel(){}
Carousel = Gaffa.createSpec(Carousel, Gaffa.View);
Carousel.prototype._type = 'carousel';
Carousel.prototype.render = function(){
    var view = this,
        dial = new DialRoller();
    this.renderedElement = dial.element;
    this._dial = dial;
    dial.decelerate = function(){
        this.velocity*=0.8;
    };
    dial.faceWidth(window.innerWidth);
    dial.on('drag', function(interaction){
        var angle = interaction.getCurrentAngle(true);

        if(
            (angle<135 && angle>45) ||
            (angle>-135 && angle<-45)
        ){
            interaction.preventDefault();
        }
    });
    dial.on('change', function(){
        view.value.set(dial.value());
    });
    dial.renderItem = function(){
        this.element = crel('img', {src:this._data});
        this.element.style.display = 'block';
        this.element.style.position = 'absolute';
        this.element.style[venfix('backface-visibility')] = 'hidden';
    };
    doc(this.renderedElement).addClass('carousel');
    this.on('destroy', function(){
        dial.destroy();
    });
};
Carousel.prototype.items = new Gaffa.Property(function(view, items){
    if(!items){
        items = [];
    }else{
        while(items.length<5){
            items = items.concat(items);
        }
    }
    view._dial.items(items);
});
Carousel.prototype.value = new Gaffa.Property(function(view, item){
    view._dial.value(item);
});

module.exports = Carousel;