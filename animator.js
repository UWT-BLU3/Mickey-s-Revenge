class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration , loopback, reverse) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, loopback, reverse});

        this.elapsedTime = 0;
        if (loopback){
            this.totalTime = (frameCount * 2 - 1) * frameDuration;
        }else {
            this.totalTime = frameCount * frameDuration;
        };
    };

    drawFrame(tick, ctx, x, y, w, h) {
        this.elapsedTime += tick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        if (this.loopback){
            var xPos = this.xStart;
            if (this.reverse && frame > (this.frameCount/2) + 1) {
                var newframe = frame - Math.floor(this.frameCount/2) - 1;
                xPos = (this.xStart - this.width*this.frameCount) + this.width*newframe;
            }else if (frame > (this.frameCount/2) + 1){
                var newframe = frame - Math.floor(this.frameCount/2) - 1;
                xPos = (this.xStart + this.width*this.frameCount) - this.width*newframe;
            }else if (this.reverse) {
                xPos = this.xStart - this.width*frame;
            }else{
                xPos = this.xStart + this.width*frame;
            };
            console.log(xPos);
            ctx.drawImage(this.spritesheet,
                xPos, this.yStart,
                this.width, this.height,
                x, y,
                w, h);
        }else{
           ctx.drawImage(this.spritesheet,
                    this.xStart + this.width*frame, this.yStart,
                    this.width, this.height,
                    x, y,
                    w, h);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};