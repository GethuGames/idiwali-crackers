
var FlowerPot = cc.Layer.extend({
    sparkEmitter: null,
    pointEmitter: null,
    glow: null,

    flowerPot: null,

    totalDuration: 0,

    ctor:function () {
        this._super();

        var size                =   cc.winSize;
        var self                =   this;
        var particleCount       =   1000;
        var totalDuration       =   10;

        var pot                 =   new cc.Sprite(res.flowerPot);
        pot.scale               =   0.8;
        pot.setPositionY(-20);
        this.addChild(pot, 2);
        this.flowerPot          =   pot;

        // Spark Line Emitter
        var texture             =   cc.textureCache.addImage(res.flowerParticle);
        var se                  =   new cc.ParticleFireworks();
        se.texture              =   texture;
        se.angle                =   90;
        se.angleVar             =   5;
        se.totalParticles       =   particleCount;
        se.startSize            =   12;
        se.startSizeVar         =   6;
        se.startColor           =   cc.color(255, 180, 50, 150);
        se.startColorVar        =   cc.color(50, 50, 50, 50);
        se.endColor             =   cc.color(255, 180, 50, 10);
        se.endColorVar          =   cc.color(50, 50, 50, 10);
        se.duration             =   totalDuration;
        se.blendAdditive        =   true;
        se.emissionRate         =   10;
        se.speed                =   20;
        se.life                 =   0.1;
        se.gravity              =   cc.p(0, se.gravity.y * 2.5);
        se.setPosition(cc.p(0, 0));
        this.sparkEmitter       =   se;
        this.addChild(this.sparkEmitter);

        // Point Emitter
        var texture             =   cc.textureCache.addImage(res.dotParticle);
        var pe                  =   new cc.ParticleFireworks();
        pe.texture              =   texture;
        pe.angle                =   90;
        pe.angleVar             =   5;
        pe.totalParticles       =   particleCount;
        pe.startSize            =   5;
        pe.startSizeVar         =   3;
        pe.startColor           =   cc.color(255, 180, 50, 150);
        pe.startColorVar        =   cc.color(50, 50, 50, 50);
        pe.endColor             =   cc.color(255, 180, 50, 10);
        pe.endColorVar          =   cc.color(50, 50, 50, 10);
        pe.duration             =   totalDuration;
        pe.blendAdditive        =   true;
        pe.emissionRate         =   10;
        pe.speed                =   20;
        pe.life                 =   0.1;
        pe.gravity              =   cc.p(0, pe.gravity.y * 2.5);
        pe.setPosition(cc.p(0, 0));
        this.pointEmitter       =   pe;
        this.addChild(this.pointEmitter);

        // Glow
        texture                 =   cc.textureCache.addImage(res.whiteParticle);
        var gl                  =   new cc.ParticleSun();
        gl.texture              =   texture;
        gl.totalParticles       =   200;
        gl.life                 *=  1.5
        gl.scaleX               =   2;
        gl.scaleY               =   4;
        gl.startSize            =   32;
        gl.startSizeVar         =   8;
        gl.startColor           =   cc.color(255, 210, 150, 2);
        gl.startColorVar        =   cc.color(0, 0, 0, 4);
        gl.endColor             =   cc.color(255, 210, 150, 1);
        gl.endColorVar          =   cc.color(0, 0, 0, 1);
        gl.duration             =   totalDuration;
        gl.setPosition(cc.p(0, 0));
        this.glow               =   gl;
        this.addChild(this.glow);

        cc.eventManager.addListener({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: true,
                        onTouchBegan: this.onTouchBegan,
                        onTouchMoved: this.onTouchMoved,
                        onTouchEnded: this.onTouchEnded
                    }, this);

        this.runAction(cc.sequence(
            cc.delayTime(totalDuration - 2),
            cc.callFunc(this.stopSystem, this)
        ));

        this.schedule(this.sparkEmissionUpdate);
        this.schedule(this.sparkSpeedUpdate);
        this.schedule(this.sparkLifeUpdate);

        return true;
    },

    sparkEmissionUpdate: function(dt) {
        this.sparkEmitter.emissionRate      +=  dt * 100;
        this.pointEmitter.emissionRate      +=  dt * 100;
        if ( this.sparkEmitter.emissionRate > 200) {
            this.unschedule(this.sparkEmissionUpdate);
        }
    },

    sparkSpeedUpdate: function(dt) {
        this.sparkEmitter.speed +=  dt * 200;
        this.pointEmitter.speed +=  dt * 200;
        if ( this.sparkEmitter.speed > 400) {
            this.unschedule(this.sparkSpeedUpdate);
        }
    },

    sparkLifeUpdate: function(dt) {
        this.sparkEmitter.life  +=  dt * 2.5;
        this.pointEmitter.life  +=  dt * 2.5;
        if ( this.sparkEmitter.life > 5) {
            this.unschedule(this.sparkLifeUpdate);
        }
    },

    stopSystem: function () {
        this.runAction(cc.sequence(
            cc.delayTime(6.0),
            cc.callFunc(this.removeSystem, this)
        )); 
    },

    removeSystem: function() {
        this.removeFromParent(true);
    },


    onTouchBegan:function(touch, event) {
        return true;
    },

    onTouchMoved:function(touch, event) {
    },

    onTouchEnded:function(touch, event) {
        var pos =   touch.getLocation();
        var pot                 =   new FlowerPot();
        pot.setPosition(pos);
        cc.director.getRunningScene().addChild(pot);
    }

});
