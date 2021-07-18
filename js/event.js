// 工具类
export default class Event {
    events = {}; // 事件池：记录所有的相关事件及处理函数
    // 添加一个事件处理
    on(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        if (!this.events[eventName].includes(fn)) {
            this.events[eventName].push(fn);
        }
    }
    // 删除一个事件处理
    off(eventName, fn) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName] = this.events[eventName].filter((item) => item != fn);
    }
    // 触发事件
    dispatch(eventName, ...arg) {
        if (!this.events[eventName]) {
            return;
        }
        this.events[eventName].forEach((item) => {
            item.call(this, ...arg);
        });
    }
}
