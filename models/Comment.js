var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    commentBody: {
        type: String,
        required: "A comment is required"
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;