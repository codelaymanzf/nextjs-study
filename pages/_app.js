import App from "next/app";

import "antd/dist/antd.css"; // 此种写法不会按需引入antd样式，这样写有两点原因：1）webpack mini-css-extract-plugin有bug，暂时未很好的解决(https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250) 2)antd css文件相对于js文件来说也不是很大

export default App;
