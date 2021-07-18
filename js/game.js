import Map from './map.js';
import Snake from './snake.js';
import Food from './food.js';
import Event from './event.js';

// 游戏类-控制器
export default class Game extends Event {
    constructor(el, rect, winValue) {
        super();
        // 创建地图
        this.map = new Map(el, rect);
        // 创建蛇类
        this.snake = new Snake(this.map);
        this.map.setData(this.snake.data);
        // 创建食物
        this.food = new Food(this.map.cells, this.map.rows);
        this.createFood();
        this.map.setData(this.food.data);
        // 渲染
        this.map.render();
        // 定义值
        this.grade = 0; // 分值
        this.timer = 0; // 定时器
        this.interval = 200; //蛇的移动频率速度
        this.winValue = winValue; // 胜利分值
        this.keyDown = this.keyDown.bind(this);
        // 初始化控制器
        this.control();
    }
    // 开始游戏
    start() {
        this.move();
    }
    // 暂停游戏
    stop() {
        clearInterval(this.timer);
    }
    // 向地图里面渲染数据
    render() {
        this.map.clearData();
        this.map.setData(this.snake.data);
        this.map.setData(this.food.data);
        this.map.render();
    }
    // 创建食物，并检查食物位置有没有和蛇冲突
    createFood() {
        this.food.create();
        if (this.map.include(this.food.data)) {
            this.createFood();
        }
    }
    // 控制移动
    move() {
        this.stop();
        this.timer = setInterval(() => {
            this.snake.move();
            if (this.isEat()) {
                console.log('吃到食物了');
                this.grade++;
                this.snake.eatFood();
                this.createFood();
                this.changeGrade(this.grade);
                this.interval *= 0.95;
                this.stop();
                this.start();
                if (this.grade >= this.winValue) {
                    this.over(1);
                    return;
                }
            }
            if (this.isOver()) {
                this.over(0);
                return;
            }
            this.render();
        }, this.interval);
    }
    // 是否吃到食物
    isEat() {
        return (
            this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y
        );
    }
    // 是否结束
    isOver() {
        // 判断蛇是否出了地图
        if (
            this.snake.data[0].x < 0 ||
            this.snake.data[0].x >= this.map.cells ||
            this.snake.data[0].y < 0 ||
            this.snake.data[0].y >= this.map.rows
        ) {
            return true;
        }
        // 判断蛇是否撞到了自己
        for (let i = 1; i < this.snake.data.length; i++) {
            if (
                this.snake.data[0].x === this.snake.data[i].x &&
                this.snake.data[0].y === this.snake.data[i].y
            ) {
                return true;
            }
        }
        return false;
    }
    // 游戏结束，0 = 中间停止 1 = 游戏胜利
    over(overState = 0) {
        this.stop();
        if (overState) {
            // this.toWin && this.toWin();
            this.dispatch('win');
        } else {
            // this.toOver && this.toOver();
            this.dispatch('over');
        }
    }
    // 分数改变
    changeGrade(grade) {
        this.dispatch('changeGrade', grade);
    }
    // 按键监听
    keyDown({ keyCode }) {
        let isDir;
        switch (keyCode) {
            // 左
            case 37:
                isDir = this.snake.changeDir('left');
                break;
            // 上
            case 38:
                isDir = this.snake.changeDir('top');
                break;
            // 右
            case 39:
                isDir = this.snake.changeDir('right');
                break;
            // 下
            case 40:
                isDir = this.snake.changeDir('bottom');
                break;
        }
        return isDir;
    }
    // 控制器
    control() {
        if (this.toControl) {
            this.toControl();
            return;
        }
        window.addEventListener('keydown', this.keyDown);
    }
    // 添加控制器
    addControl(fn) {
        fn.call(this);
        window.removeEventListener('keydown', this.keyDown);
    }
}
