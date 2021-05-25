module.exports = function sendMessage(res,message){
    res.json({message: message})
}
