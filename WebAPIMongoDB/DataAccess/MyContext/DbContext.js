const uri =
    "<Your Atlas Connection String>";



const db = mongoose.connection;

db.once('open', ()=> {
    console.log('Se conecto :) !!!');
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;

