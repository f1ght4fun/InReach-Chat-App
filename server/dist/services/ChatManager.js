"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Registration_model_1 = require("../models/Registration.model");
var Message_model_1 = require("../models/Message.model");
var Enums_model_1 = require("../models/Enums.model");
var ChatManager = /** @class */ (function () {
    function ChatManager() {
        var _this = this;
        this.clients = new Map();
        this.history = new Array();
        this.prepareHandlers = function (socket) {
            var addClient = function () {
                _this.clients.set(socket.id, {});
            };
            var removeClient = function () {
                _this.clients.delete(socket.id);
            };
            var signIn = function (username, cb) {
                if (_this.validateName(username)) {
                    cb(username + ' username is already taken');
                    return;
                }
                _this.clients.set(socket.id, new Registration_model_1.Registration(username, socket));
                var entry = _this.generateEntry(socket.id, Enums_model_1.Action.Joined);
                _this.broadcastMessage(entry);
                cb(null);
            };
            var signOut = function (cb) {
                if (_this.getUser(socket.id)) {
                    var entry = _this.generateEntry(socket.id, Enums_model_1.Action.Left);
                    _this.broadcastMessage(entry);
                    removeClient();
                    cb(null);
                }
            };
            var onGetHistory = function (cb) {
                cb(_this.history.slice(0, 10));
            };
            var onMessage = function (message) {
                if (_this.getUser(socket.id)) {
                    var entry = _this.generateEntry(socket.id, Enums_model_1.Action.Said, message);
                    _this.broadcastMessage(entry);
                }
            };
            return {
                addClient: addClient,
                removeClient: removeClient,
                signIn: signIn,
                onGetHistory: onGetHistory,
                onMessage: onMessage,
                signOut: signOut
            };
        };
        this.broadcastMessage = function (message) {
            _this.clients.forEach(function (r) {
                if (r.socket)
                    r.socket.emit('message', message);
            });
        };
        this.generateEntry = function (socketId, action, message) {
            var user = _this.getUser(socketId);
            var text = '';
            switch (action) {
                case Enums_model_1.Action.Joined:
                    text = ' joined the chat';
                    break;
                case Enums_model_1.Action.Left:
                    text = ' left the chat';
                    break;
                case Enums_model_1.Action.Said:
                    text = message;
                    break;
            }
            var msg = new Message_model_1.Message(user.name, text, action);
            _this.history.push(msg);
            return msg;
        };
        this.getUser = function (socketId) {
            return _this.clients.get(socketId);
        };
        this.validateUser = function (socketId) {
            return _this.clients.has(socketId) && !!_this.clients.get(socketId);
        };
        this.validateName = function (username) {
            var e_1, _a;
            try {
                for (var _b = __values(_this.clients.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                    if (value && value.name === username)
                        return key;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return null;
        };
    }
    return ChatManager;
}());
exports.default = ChatManager;
