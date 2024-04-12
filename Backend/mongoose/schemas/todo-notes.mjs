import mongoose from "mongoose";

const TODONotesSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MainUser",
        required: true,
    },
    noteIndex: {
        type: mongoose.Schema.Types.Number,
    },
    note: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    addedAt: {
        type: mongoose.Schema.Types.Date,
        default: () => new Date(Date.now() + (3 * 60 * 60 * 1000)),
    },
    editedAt: {
        type: mongoose.Schema.Types.Date,
    },
    doneAt: {
        type: mongoose.Schema.Types.Date,
    }
}, { versionKey: false });

TODONotesSchema.pre("save", async function(next) {
    try {
        if (!this.noteIndex) {
            const latestNote = await this.constructor.findOne({ userID: this.userID }, {}, { sort: { noteIndex: -1 } });
            const newIndex = latestNote ? latestNote.noteIndex + 1 : 1;
            this.noteIndex = newIndex;
        }
        next();
        
    } catch (err) {
        next(err);
    }
});

export const TODONote = mongoose.model("TODO-Notes", TODONotesSchema);