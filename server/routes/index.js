const users = require("./users");
const child = require("./child");
const parent = require("./parent");
const nanny = require("./nanny");
const job = require("./job");

const constructorMethod = (app) => {
    app.use("/users", users);
    app.use("/child", child);
    app.use("/parent", parent);
    app.use("/nanny", nanny);
    app.use("/job", job);
    app.get("/", (req, res) => {
        res.json({ Hello: "There" });
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
