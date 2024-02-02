class BackgroundObject {
    constructor(x, y, width, height, scale) {
        Object.assign(this, { x, y, width, height, scale });
    }

    updateBB(offsetBB) {
        this.BB = new BoundingBox(this.x + offsetBB.x, this.y + offsetBB.y, this.width * this.scale + offsetBB.w, this.height * this.scale + offsetBB.h);
    }

    updateSpritesheet(path) {
        this.spritesheet = ASSET_MANAGER.getAsset(path);
    }

    draw(ctx) {
        if (this.spritesheet) ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        if (PARAMS.DEBUG) this.BB.draw(ctx);
    }
}

class DestroyedDesertTower extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 393, 399, 0.5);
        this.updateSpritesheet("./assets/background/destroyedDesertTower.png");
        // change BB
        this.offsetBB = { x: 44, y: 10, w: -80, h: -20 };
        this.updateBB(this.offsetBB);
    }
}

class BarbedWire extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 83, 56, 1);
        this.updateSpritesheet("./assets/background/barbedwire1.png");
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.updateBB(this.offsetBB);
    }
}

class DesertTower extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 311, 324, 0.5);
        this.updateSpritesheet("./assets/background/deserttower.png");
        this.offsetBB = { x: 34, y: 0, w: -61, h: 0 };
        this.updateBB(this.offsetBB);
    }
}

class DeadTree extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 1920, 1920, 0.05);
        this.updateSpritesheet("./assets/background/deadtree.png");
        this.offsetBB = { x: 32, y: 8, w: -64, h: -10 };
        this.updateBB(this.offsetBB);
    }
}

class DeadBody extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 64, 34, 1);
        this.updateSpritesheet("./assets/background/deadbodies1.png");
        this.offsetBB = { x: 0, y: 4, w: 0, h: -6 };
        this.updateBB(this.offsetBB);
    }
}

class EmptyBarrel extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 72, 64, 1);
        this.updateSpritesheet("./assets/background/emptybarrel1.png");
        this.offsetBB = { x: 22, y: 24, w: -46, h: -28 };
        this.updateBB(this.offsetBB);
    }
}

class WallmartStoneHenge extends BackgroundObject {
    constructor(x, y) {
        super(x, y, 446, 370, 0.5);
        this.updateSpritesheet("./assets/background/walmartStoneHenge.png");
        this.offsetBB = { x: 37, y: 9, w: -68, h: -30 };
        this.updateBB(this.offsetBB);
    }
}

class Border extends BackgroundObject {
    constructor(x, y, width, height) {
        super(x, y, width, height, 1);
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.updateBB(this.offsetBB);
    }
}
