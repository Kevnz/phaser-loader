(function (root) {
    
    console.log(root);
    root.phaserLoader = {        
        entities: [],
        createGame: function createGame(/*...*/) {
            function PhaserGameWrapper(args) {
                return Phaser.Game.apply(this, args);
            }
            PhaserGameWrapper.prototype = Phaser.Game.prototype;
            var states = {
                preload: function () {
                    images.forEach(function (img) {
                        game.load.image(img[0], img[1]);            
                    });
                },
            }
            
            return new PhaserGameWrapper([].slice.call(arguments, 0));
        },
        createEntity: function createEntity(o) {
            var entity = game.add.sprite(o.x, o.y, o.type);
            game.physics.enable(entity, PHYSICS);                
            entity.body.velocity.x = o.vx || 0;
            entity.body.velocity.y = o.vy || 0;                
            //entity.body.debug = true;                
            if (typeof o.mass != 'undefined') {
                entity.body.mass = o.mass;
            }
            if (o.kinematic) 
                entity.body.kinematic = true;

            entity.body.mass = 1;
            entity.original = o;
            this.entities.push(entity);
        },
        loadLevel: function loadLevel (gamedata, index) {
            var level = gamedata.levels[index];
            level.objects.forEach(this.createEntity);            
        },
        loadImages: function loadImages (game,gamedata) {
            gamedata.images.forEach(function (img) {
                game.load.image(img[0], img[1]);            
            });        
        },
        
        initPhysics: function initPhysics (game, physics) {
            game.physics.startSystem(physics);
            // TODO this is only p2 for now
            game.physics.p2.gravity.y = 120;
        }
    };
})(window);    
console.log(window.phaserLoader);
