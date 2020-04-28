## 基于vue的移动书城
### 简介
移动书城是一个在移动端浏览器访问的移动书城，它主要有两部分，sever（服务器），vue项目/shop（vue项目），服务器使用node.js+moogodb搭建。
### 使用
为了可以在手机端可以测试，需要把vue项目中请求的服务器地址改为本机在局域网的ip地址（在vue项目/shop/src/network/request.js修改baseURL），然后重新打包vue项目。(进入终端，在vue项目/shop的目录下输入：npm run build  生成dist文件，将这个文件夹放在sever下，再把里面的index.html放在sever/views目录下面)
进入终端：在sever的目录下输入命令行 node app 启动项目
在手机浏览器中输入http://192.168.1.105:3000（假设ip地址为192.168.1.105）可以访问书城。一般使用UC浏览器浏览。