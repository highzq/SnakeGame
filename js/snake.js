// 贪吃蛇类
export default class Snake {
    constructor() {
        // 小蛇的初识位置
        this.data = [
            {
                x: 6,
                y: 2,
                color: 'green'
            },
            {
                x: 5,
                y: 2,
                color: 'white'
            },
            {
                x: 4,
                y: 2,
                color: 'white'
            },
            {
                x: 3,
                y: 2,
                color: 'white'
            },
            {
                x: 2,
                y: 2,
                color: 'white'
            }
        ];
        this.direction = 'right';
    }
    move() {
        let i = this.data.length - 1;
        this.lastData = {
            x: this.data[i].x,
            y: this.data[i].y,
            color: this.data[i].color
        };
        /* 让后面每一格走到前一格的位置上 */
        for (i; i > 0; i--) {
            this.data[i].x = this.data[i - 1].x;
            this.data[i].y = this.data[i - 1].y;
        }
        // 根据方向移动蛇头
        switch (this.direction) {
            case 'left':
                this.data[0].x--;
                break;
            case 'right':
                this.data[0].x++;
                break;
            case 'top':
                this.data[0].y--;
                break;
            case 'bottom':
                this.data[0].y++;
                break;
        }
    }
    // 改变前进方向
    changeDir(dir) {
        // 如果蛇现在在左右移动，那么蛇只能上下移动，否则蛇现在在上下移动，那么蛇只能左右移动
        if (this.direction === 'left' || this.direction === 'right') {
            if (dir === 'left' || dir === 'right') {
                return false;
            }
        } else {
            if (dir === 'top' || dir === 'bottom') {
                return false;
            }
        }
        this.direction = dir;
        return true;
    }
    // 吃食物
    eatFood() {
        this.data.push(this.lastData);
    }
}
