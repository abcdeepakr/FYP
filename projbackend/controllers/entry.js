const Entry = require("../models/entries") //*Entry is the database for storing databse entries 
const Sentiment =require("../models/sentiment")
const formidable = require("formidable") //* to store form data
const _ = require("lodash")
const fs = require("fs")


//* Sentiment Analysis
var natural = require('natural');
var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");

const { sortBy } = require("lodash");
const { Order } = require("../models/order");
const { selectFields } = require("express-validator/src/select-fields")

exports.getEntryById = (req, res,next, id) =>{
    Entry.findById(id).exec((err,entry) => {
        if(err){
            return res.status(402).json({
                error : err
            })
        }
        res.entry = entry //!can also be res.entry = entry (check it later)
        next();
    })
}
exports.createEntry = (req, res) =>{
    let form  = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err, fields,file) => {
        if(err){
            res.status(400).json({
                error: "Issues with the input"
            })
        }

        //destructing the fields
        
        // const {price,description, name, category,stock } = fields 
        
        const {title, entry,sentimentScore } = fields //* getting the sentiment score
        const{sentimentValues,days} = fields //* storing the sentimen in the sentiment.js models

        if(
            !title ||
            !entry
        ){
            return res.status(400).json({
                error : "Please include all the fields"
            })
        }
         let entryy = new Entry(fields) //* creating an object to get the entries and calculate sentiment 
         let charts = new Sentiment(fields) //* charts object to get sentiment and store inn the sentiment model
         
        //saving to DB
        entryy.save((err, Entry) =>{
            if(err){
                res.status(400).json({
                error : err
                })
            }
            res.status(Entry)  //* saving the entries in database
        })
        var sentiment = analyzer.getSentiment(entryy.entry.split(" "))
        entryy.sentimentScore = sentiment //* calculating and storing the sentiment 
        //TODO: VALUES ARE NOT BEING PUSHED IN SENTIMENT DATABASAE// NEED TO BE FIXED
        // charts.sentimentValues.push(sentiment) 
        // charts.days.push(entryy.createdAt)
        // //TODO: error after addition of this part 
        // charts.save((err, values) =>{
        //     if(err){
        //         res.status(400).json({
        //             error: err //TODO: resolve the error here
        //         })
        //     }
        //     res.json(values)
        // })
        entryy.save((err, score) =>{
            if(err){
                res.status(400).json({
                    error : "saved in DB but paralleling" //:TODO FIX THE PARALLEING ISSUE
                    })
            }
        })
     })


}

exports.getEntry = (req, res) =>{

    return res.json(res.entry)
}


exports.deleteEntry = (req, res) =>{

    let entry = res.entry
    entry.remove((err, deletedEntry) =>{
        if(err){
            return res.status(400).json({
                error : err
            })
        }
        res.json({
            Message : "Deletion was successful", deletedEntry
        })
    })
}

exports.updateEntry = (req, res) =>{
 
    let form  = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err, fields,file) => {
        if(err){
            res.status(400).json({
                error: "Issue with entered data"
            })
        }

        //destructing the fields
        

    //updation code
    let entry = res.entry
    entry = _.extend(entry,fields)
    //handling files here

    if(file.photo){
        if(file.photo.size>3000000){
            return res.status(400).json({
                error : "File to big"
            })
        }
        entry.photo.data = fs.readFileSync(file.photo.path)
        entry.photo.contentType = file.photo.type
    }

    //saving to DB
    entry.save((err, entry) =>{
        if(err){
            res.status(400).json({
            error : "updation of entry failed"
            })
        }
        res.json(entry)
    })
    })


}

exports.getAllEntries = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sort ? req.query.sort : "_id"
    
    return Entry.find()
    .exec((err, entries) =>{
        if(err){
            return res.status(400).json({
                error : "Cannot display entries"
            })
        }
        res.json(entries)
    })
}
