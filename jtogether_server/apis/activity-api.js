const {Activity} = require('../_helpers/db')

module.exports = {
    getActivity,
    saveActivity
}

async function getActivity(id){ // TODO dunno how to handle ids
    //return Activity.findOne({id: id});
}

function saveActivity(activityParams){
    return new Activity(activityParams).save()
}
