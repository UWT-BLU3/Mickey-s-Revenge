// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        this.backgroundEntities = [];
        this.attackEntities = [];
        this.background = null;

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};
        this.left = false;
        this.right = false;
        this.down = false;
        this.up = false;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        this.keyboardActive = false;
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y, radius: 0 };
        }
        function mouseListener (e) {
            that.mouse = getXandY(e);
        }
        function mouseClickListener (e) {
            that.click = getXandY(e);
            if (PARAMS.DEBUG) console.log(that.click);
        }
        function wheelListener (e) {
            e.preventDefault(); // Prevent Scrolling
            that.wheel = e.deltaY;
        }
        function keydownListener (e) {
            that.keyboardActive = true;
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
            }
        }
        function keyUpListener (e) {
            that.keyboardActive = false;
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
            }
        }

        that.mousemove = mouseListener;
        that.leftclick = mouseClickListener;
        that.wheelscroll = wheelListener;
        that.keydown = keydownListener;
        that.keyup = keyUpListener;

        this.ctx.canvas.addEventListener("mousemove", that.mousemove, false);

        this.ctx.canvas.addEventListener("click", that.leftclick, false);

        this.ctx.canvas.addEventListener("wheel", that.wheelscroll, false);

        this.ctx.canvas.addEventListener("keydown", that.keydown, false);

        this.ctx.canvas.addEventListener("keyup", that.keyup, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    addBackgroundEntity(entity) {
        this.backgroundEntities.push(entity);
    };

    addAttackEntity(entity) {
        this.attackEntities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if (this.background) {
            this.background.draw(this.ctx);
        }

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }

        // Draw latest things first
        for (let i = this.backgroundEntities.length - 1; i >= 0; i--) {
            this.backgroundEntities[i].draw(this.ctx, this);
        }

        for (let i = this.attackEntities.length - 1; i >= 0; i--) {
            this.attackEntities[i].draw(this.ctx, this);
        }

        this.camera.draw(this.ctx);
    };

    update() {
        let entitiesCount = this.entities.length;
        let backEntitiesCount = this.backgroundEntities.length;
        let attackEntitiesCount = this.attackEntities.length
        let i;

        // updating entities
        for (i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (i = 0; i < attackEntitiesCount; i++) {
            let entity = this.attackEntities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        // for (i = 0; i < backEntitiesCount; i++) {
        //     let entity = this.backgroundEntities[i];

        //     if (!entity.removeFromWorld) {
        //         entity.update();
        //     }
        // }

        this.camera.update();

        // removing if they are marked with removeFromWorld
        for (i = attackEntitiesCount - 1; i >= 0; --i) {
            if (this.attackEntities[i].removeFromWorld) {
                this.attackEntities.splice(i, 1);
            }
        }

        for (i = entitiesCount - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        for (i = backEntitiesCount - 1; i >= 0; --i) {
            if (this.backgroundEntities[i].removeFromWorld) {
                this.backgroundEntities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)