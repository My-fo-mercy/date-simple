安装完成后引入模块，

```javascript
const dateSimple = require("date-simple");
//time 为（返回 1970 年 1 月 1 日至之前某个时间的毫秒数）
//=>var time = 过去的时间（与new Date()生成的格式一致）.getTime()
dateSimple.formatTime(time);
```

eg:

```javascript
const dateSimple = require("date-simple");
console.log(dateSimple.formatTime(1563190210000));
```
