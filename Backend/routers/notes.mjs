import { Router } from "express";
import { MainUser } from "../mongoose/schemas/main-users.mjs";
import { TODONote } from "../mongoose/schemas/todo-notes.mjs";

const router = Router();

//Kullanıcı oturum açmış ise Database'deki notları listeler, oturum açılmamış ise Cookie'lerdeki notlar listelenir.
router.get("/", async (request, response) => {
    try {
        const userID = request.session.passport?.user;
        if(userID) {
            const notesDB = await TODONote.find({ userID: userID });
            return response.status(200).send(notesDB);
        }

        else {
            const notesCookie = request.signedCookies.NotesCookie;
            if(notesCookie) return response.send(request.signedCookies.NotesCookie);
            return response.status(204).send("Add a New Note, Now!");
        }
        
    } catch (err) {
        console.log(`ERROR, Listing Notes\n${err}`);
        return response.sendStatus(400);
    }    
});

//Kullanıcı oturum açmış ise eklenen notlar Database'e eklenir, oturum açılmamış ise Cookie'ye kaydedilir.
router.post("/", async (request, response) => {
    try {
        const userID = request.session.passport?.user;
        if(userID) {
            const user = await MainUser.findOne({ _id: userID });
            const note = new TODONote({ userID: user._id, note: request.body.note });
            const errors = note.validateSync();

            if (errors.errors.noteIndex) {
                console.error("Validation Error:", errors.errors.noteIndex.message);
                return response.sendStatus(400);
            }
    
            const savedNote = await note.save();
            return response.status(201).send(savedNote);
        }

        else {
            let noteCookie = request.signedCookies.NotesCookie;
            if(!noteCookie) noteCookie = { notes: [] };

            const datenow = new Date(new Date().getTime() + (1000 * 60 * 60 * 3));
            const note = {
                "note": request.body.note,
                "addedAt": datenow.toISOString(),
                "noteIndex": noteCookie.notes ? noteCookie.notes[noteCookie.notes.length - 1].noteIndex + 1 : 1,
            }

            noteCookie.notes.push(note);
            response.cookie("NotesCookie", noteCookie, { maxAge: 1000 * 60 * 60 * 24 * 7 , signed: true });
            console.log(request.signedCookies.NotesCookie);
            return response.status(201).send("Temporary Note Created and Associated with Cookie.");          
        }
       
    } catch (err) {
        console.log(`ERROR, Adding Note\n${err}`);
        return response.sendStatus(400);
    }
});

//Kullanıcının seçtiği notu günceller ve "Güncellenme Tarihi" ekler.
router.put("/", async (request, response) => {
    try {
        const userID = request.session.passport?.user;
        if(userID) {
            const updatedNote = await TODONote.findOneAndUpdate({ userID: userID, noteIndex: request.body.noteIndex }, { $set: { note: request.body.note, editedAt: new Date(Date.now() + (1000 * 60 * 60 * 3)) } }, { new: true } );
            if(!updatedNote) return response.status(400).send("Note Not Found!");
            return response.status(200).send("Note Editing Completed Succesfully!");
        }

        else {
            const noteCookie = request.signedCookies.NotesCookie;
            const updatedNoteCookie = noteCookie.notes.map(note => { 
                if (note.noteIndex === request.body.noteIndex) {
                    return {
                        ...note,
                        "note": request.body.note,
                        "editedAt": new Date(new Date().getTime() + (1000 * 60 * 60 * 3)).toISOString(),
                    };
                }

                return note;
            });

            response.cookie("NotesCookie", { notes: updatedNoteCookie }, { maxAge: 1000 * 60 * 60 * 24 * 7 , signed: true });
            return response.sendStatus(200);
        }

    } catch (err) {
        console.log(`ERROR, Editing Note\n${err}`);
        return response.sendStatus(400);
    }
});

//Kullanıcının seçtiği notu siler.
router.delete("/", async (request, response) => {
    try {
        const userID = request.session.passport?.user;
        if(userID) {
            const deletedNote = await TODONote.findOneAndDelete({ userID: userID, noteIndex: request.body.noteIndex });
            if(!deletedNote) return response.status(400).send("Note Not Found!");
            return response.status(200).send("Note Deletion Completed Successfully!");
        }

        else {
            const noteCookie = request.signedCookies.NotesCookie;
            const updatedNoteCookie = noteCookie.notes.filter(note => note.noteIndex !== request.body.noteIndex);
            response.cookie("NotesCookie", { notes: updatedNoteCookie }, { maxAge: 1000 * 60 * 60 * 24 * 7 , signed: true });
            return response.sendStatus(200);
        }

    } catch (err) {
        console.log(`ERROR, Deleting Note\n${err}`);
        return response.sendStatus(400);
    }
});

export default router;