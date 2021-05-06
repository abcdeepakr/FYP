
const Sentiment =require("../models/sentiment")


exports.getSentimentValues = (req,res) => {
    return Sentiment.find()
    .exec((err, values) =>{
        if(err){
            return res.status(400).json({
                error : "Cannot display entries"
            })
        }
        res.json(values)
    })
}
