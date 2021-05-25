const {Notification} = require('../_helpers/db')


async function createNotification(notificationParams){
    return new Notification(notificationParams).save()
}
