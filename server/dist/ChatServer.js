"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIO = require("socket.io");
var ChatManager_1 = require("./services/ChatManager");
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.createServer();
        this.setupSocketIO();
        this.start();
    }
    ChatServer.prototype.createServer = function () {
        this.server = http_1.createServer(express());
        this.io = socketIO(this.server);
    };
    ChatServer.prototype.setupSocketIO = function () {
        var _this = this;
        this.manager = new ChatManager_1.default();
        this.io.on('connect', function (socket) {
            console.log("Connected client " + socket.id + " on port " + ChatServer.PORT);
            var _a = _this.manager.prepareHandlers(socket), addClient = _a.addClient, signIn = _a.signIn, onGetHistory = _a.onGetHistory, onMessage = _a.onMessage, signOut = _a.signOut, removeClient = _a.removeClient;
            addClient();
            socket.on('USERNAME_REGISTER', signIn);
            socket.on('USER_GETHISTORY', onGetHistory);
            socket.on('USER_LEAVE', signOut);
            socket.on('message', onMessage);
            socket.on('disconnect', function () {
                console.log("Client " + socket.id + " Disconnected...");
                removeClient();
            });
            socket.on('error', function (err) {
                console.log("Client " + socket.id + " error " + err);
            });
        });
    };
    ChatServer.prototype.start = function () {
        this.server.listen(ChatServer.PORT, function () {
            console.log('Running server on port %s', ChatServer.PORT);
        });
    };
    ChatServer.PORT = 4000;
    return ChatServer;
}());
exports.default = ChatServer;
