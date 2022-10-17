"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../model/users");
const jwt = require("jsonwebtoken");
// 页面相关的路由，路由就是一个典型的控制器(属于controller层)
function default_1(app) {
    // 登录
    app.post('/api/login', async (req, res) => {
        const user = req.body;
        // console.log(user)
        const { success, data } = await (0, users_1.readLoginData)(user);
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        else if (data.length === 0) {
            res.json({ success: false, message: "用户名或密码错误" });
            return;
        }
        // 如果用户登录成功，需要生成token
        // jwt.sign(object,key,option),object加密数据对象，key秘钥(解密token需要和该值一致)，
        //option是token配置，一般配置过期时间。
        const token = jwt.sign({ id: data[0].id }, "hzyhzy123", {
            expiresIn: 24 * 60 * 60 // 设置token的过期时间
        });
        res.json({ success: true, data: { email: data[0].email, avatar: data[0].avatar, token } });
    });
    // 注册
    app.post('/api/saveUser', async (req, res) => {
        const user = req.body;
        // console.log(user)
        const { success, data } = await (0, users_1.saveData)(user);
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        res.json({ success: true, message: "添加用户成功" });
    });
}
exports.default = default_1;
