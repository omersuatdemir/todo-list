import { Router } from "express";
import { MainUser } from "../mongoose/schemas/main-users.mjs";
import { TODONote } from "../mongoose/schemas/todo-notes.mjs";

const router = Router();

router.get("/", (request, response) => {
    console.log(request.signedCookies.NotesCookie.notes);
    return response.send(`Cookie'deki Notlar:\n${ request.signedCookies.NotesCookie.notes }`);
});

router.post("/", async (request, response) => {
    try {
        const userID = request.session.passport?.user;
        if(userID) {
            const user = await MainUser.findOne({ _id: userID });
            const note = new TODONote({ userID: user._id, note: request.body.note });
            const errors = note.validateSync();

            if (errors && errors.errors && errors.errors.noteIndex) {
                console.error("Validation Error:", errors.errors.noteIndex.message);
                return response.sendStatus(400);
            }
    
            const savedNote = await note.save();
            return response.status(201).send(savedNote);
        }

        else {
            let noteCookie = request.signedCookies.NotesCookie;
            if(!noteCookie) noteCookie = { notes: [] };

            noteCookie.notes.push(request.body.note);
            response.cookie("NotesCookie", noteCookie, { maxAge: 1000 * 60 * 60 * 24 * 7 , signed: true });
            console.log(request.signedCookies.NotesCookie);
            return response.status(201).send("Temporary Note Created and Associated with Cookie.");          
        }
       
    } catch (err) {
        console.log(`ERROR, Adding Note\n${err}`);
        return response.sendStatus(400);
    }
});

export default router;