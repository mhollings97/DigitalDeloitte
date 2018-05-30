function User(pr) {
    this.prefix = pr;
}

User.prototype.toString = function(message) {
    return "["+this.prefix+"] " + message;
};

module.exports = User;