const functions = require("firebase-functions");

const admin = require('firebase-admin');

admin.initializeApp();

const algoliasearch = require('algoliasearch');

const MAX_BOOK = 2;

const NOB = 0;

const client = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);

const index = client.initIndex('books');

exports.indexAdd = functions.firestore.document('books/{isbn}')
                .onCreate((snap,context)=>{
                    const data = snap.data();
                    const objectID = snap.id;
                    return index.saveObject({
                        'objectID': objectID,
                        ...data
                    }).then(()=>{
                        console.log('Successfully Done');
                    }).catch((err)=>{console.log(err);})
                });


exports.indexUpdate = functions.firestore.document('books/{isbn}')
                .onUpdate((change)=>{
                    const newData = change.after.data();
                    newData.objectID = change.after.id;

                    return index.saveObject(newData).then(()=>{
                        console.log('Successfully Done');
                    }).catch((err)=>{console.log(err);})
                });


exports.indexDelete = functions.firestore.document('books/{isbn}')
                    .onDelete((snap,context)=>{
                        const objectId = snap.id;
                        return index.deleteObject(objectId);
                    })


exports.reject = functions.https.onCall(async (data,context)=>{
    if(!context.auth.token.admin){
        throw new functions.https.HttpsError(
            'aborted',
            'Only admin can reject'
        )
    }
    const request = admin.firestore().collection('requested').doc(data.id);
    const requestDoc = await request.get();
    const user = admin.firestore().collection('users').doc(requestDoc.data().requestBy);

    return user.update({
        requested: admin.firestore.FieldValue.arrayRemove(requestDoc.data().book_isbn)
    }).then(()=>{
        request.delete();
        return{
            success : 'Successfully rejected the request'
        }
    }).catch(err=>{
        throw err;
    })
})


exports.accept = functions.https.onCall(async (data, context)=>{
    if(!context.auth.token.admin){
        throw new functions.https.HttpsError(
            'aborted',
            'only admin can accept'
        )
    }
    const request = admin.firestore().collection('requested').doc(data.id);
    const requestDoc = await request.get();
    const user = admin.firestore().collection('users').doc(requestDoc.data().requestBy);
    const book = admin.firestore().collection('books').doc(requestDoc.data().book_isbn);
    const userData = await user.get();
    if(userData.data().haveBooks>1){
        throw new functions.https.HttpsError(
            'cancelled',
            'Student already have two books not returned'
        )
    }

    const borrow = admin.firestore().collection('borrowed');

    return borrow.doc(data.id).set({
        book_isbn : requestDoc.data().book_isbn,
        borrowed_by : userData.data().email,
        borrowed_uid:requestDoc.data().requestBy,
        book_name : requestDoc.data().book_name,
        borrowed_date : admin.firestore.FieldValue.serverTimestamp(),
    }).then(()=>{
        request.delete().then(()=>{});
        user.update({
            haveBooks : admin.firestore.FieldValue.increment(1),
            requested: admin.firestore.FieldValue.arrayRemove(requestDoc.data().book_isbn),
            borrowed: [...userData.data().borrowed, requestDoc.data().book_isbn]
        })
        book.update({
            nob:admin.firestore.FieldValue.increment(-1),
        })
        return {
            success:'Successfully accepted the borrow request'
        }
    }).catch(err=>{throw err;})

});

exports.acceptReturn = functions.https.onCall(async (data, context)=>{
    if(!context.auth.token.admin){
        throw new functions.https.HttpsError(
            'aborted',
            'only admin can accept'
        )
    }
    const borrowed = admin.firestore().collection('borrowed').doc(data.id);
    const borrowedDoc = await borrowed.get();
    const user = admin.firestore().collection('users').doc(borrowedDoc.data().borrowed_uid);
    const book = admin.firestore().collection('books').doc(borrowedDoc.data().book_isbn);
    const history = admin.firestore().collection('history').doc(data.id); // add this line
    const borrowedData = borrowedDoc.data(); // add this line
    return user.update({
        haveBooks: admin.firestore.FieldValue.increment(-1),
        borrowed : admin.firestore.FieldValue.arrayRemove(borrowedData.book_isbn),
        history : admin.firestore.FieldValue.arrayUnion(history.id) // add this line
    }).then(()=>{
        // move record to history collection
        return Promise.all([
            history.set(borrowedData),
            borrowed.delete(),
            book.update({
                nob:admin.firestore.FieldValue.increment(1)
            })
        ]);
    }).then(()=>{
        return{
            success :'Receive the books from the student'
        }
    });
});


exports.getUserByEmail = functions.https.onCall((data, context)=>{
    if(!context.auth.token.admin){
        throw new functions.https.HttpsError(
            'aborted',
            'only admin can view this'
        )
    }
    return admin.auth()
        .getUserByEmail(data.email)
        .then(userRecord=>{
            return userRecord;
        }).catch(err=>{
            throw err;
    })
})

exports.deleteUser = functions.https.onCall(async (data, context)=>{
    if(!context.auth.token.admin){
        throw new functions.https.HttpsError(
            'aborted',
            'only admin can delete a user'
        )
    }
    const userData = admin.firestore().collection('users').doc(data.uid);
    const doc = await userData.get();
    if(doc.data().haveBooks>0){
        throw new functions.https.HttpsError(
            'cancelled',
            'student have not returned all borrowed book'
        )
    }

    return admin.auth()
        .deleteUser(data.uid)
        .then(()=>{
            userData.delete().then(()=>{}).catch(err=>{throw err;})
            admin.firestore().collection('userInfo').doc(data.uid).delete().then(()=>{}).catch(err=>{throw err;});
            admin.firestore().collection('users').doc(data.uid).delete().then(()=>{}).catch(err=>{throw err})
            return{
                success : 'The User Have Been Deleted'
            };
        })
})

exports.addPremium = functions.https.onCall((data, context) => {
    // get user and add admin custom claim
    if ( context.auth.token.admin !== true ) {
      return { error: 'Only admins can add other admins' }
    }

    return admin.auth().getUserByEmail(data.email).then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        premium: true
      })
    }).then(() => {
      return {
        success: `Success! ${data.email} has been made premium.`
      }
    }).catch(err => {
      return err;
    });
});

exports.addAdmin = functions.https.onCall((data,context)=> {
        if(context.auth.token.admin!==true){
            throw new functions.https.HttpsError(
                'aborted',
                'Only Admin can make other admin'
            );
        }
        if (!context.auth.token.email_verified) {
            throw new functions.https.HttpsError(
                'aborted',
                'verify your email first'
            );
        }
        return admin.auth().getUserByEmail(data.email).then(user=>{
            return admin.auth().setCustomUserClaims(user.uid,{
                admin: true
            })
        }).then(()=>{
            return{
                success : `Success! ${data.email} has been made admin.`
            }
        })
});

exports.requestBook = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'only authenticated users can request for books'
        );
    }
    if (!context.auth.token.email_verified) {
        throw new functions.https.HttpsError(
            'aborted',
            'verify your email first'
        );
    }
    if(!context.auth.token.premium){
        throw new functions.https.HttpsError(
            'aborted',
            'only premium user can request, go to library to become premium'
        );
    }
    const user = admin.firestore().collection('users').doc(context.auth.uid);
    const book = admin.firestore().collection('books').doc(data.isbn);

    const doc = await user.get();
    if (doc.data().haveBooks > MAX_BOOK) {
        throw new functions.https.HttpsError(
            'cancelled',
            'you can only have two books with you at a time'
        );
    }
    const book_data = await book.get();
    if(book_data.data().nob<=NOB){
        throw new functions.https.HttpsError(
            'cancelled',
            `We have no book left you can't borrow`
        )
    }
    if (doc.data().requested.includes(data.isbn) || doc.data().borrowed.includes(data.isbn)){
        throw new functions.https.HttpsError(
            'cancelled',
            'you have already requested for this book'
        );
    }
    // Get user email from Firebase Authentication API
    const userRecord = await admin.auth().getUser(context.auth.uid);
    const userEmail = userRecord.email;

    await user.update({
        requested:[...doc.data().requested, data.isbn]
    });

    //requested array
    return admin.firestore().collection('requested').add({
        book_isbn : data.isbn,
        requestBy : context.auth.uid,
        email: userEmail,
        book_name : book_data.data().book_name,
    }).then(()=>{
        return{
            success :`Successfully Requested The Book`
        }
    }).catch(err=>{
        return err;
    })

})


exports.addBook = functions.https.onCall((data,context)=>{
    if(context.auth.uid==null){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'You are not authenticated to do that'
        )
    }
    if(context.auth.token.admin !== true){
        throw new functions.https.HttpsError(
            'aborted',
            'only admin can create'
        );
    }
    if(context.auth.token.email_verified!=true){
        throw new functions.https.HttpsError(
            'cancelled',
            'Email is not verified, or login once again'
        );
    }
    return admin.firestore().collection('books').doc(data.isbn).set({
        book_name : data.book_name,
        isbn: data.isbn,
        nob : data.nob,
        writer : data.writer,
        img_url : data.img_url,
        have_pdf: data.have_pdf
    },{merge:true}).then(()=>{
        return{
            success :`Success ${data.book_name} has been added`
        }
    }).catch(err=>{
        return err;
    })
})


exports.newUserSignUp = functions.auth.user().onCreate(user=>{
    return admin.firestore().collection('users').doc(user.uid).set({
        email : user.email,
        borrowed :[],
        haveBooks:0,
        requested: [],
    });
});