const job = {
    name: '前端工程师',
    scheduleFlag: false,
    sendOffer(offer) {
        console.log('发offer :', offer);
    }
}

const hr = {
    name: '小张',
    scheduleJob(offer) {
        const schedule = new Proxy(job, {
            set: (obj, prop, val) => {
                if (prop !== 'scheduleFlag') {
                    return
                }
                if (obj.scheduleFlag === false && val === true) {
                    obj.scheduleFlag = true
                    obj.sendOffer(offer)
                }
            }
        })
        setTimeout(() => {
            console.log('有职位安排了')
            schedule.scheduleFlag = true
        },2000)
    },
    sendOffer(price) {
        if(price > 10000) {
            hr.scheduleJob('Offer')
        } else {
            console.log('bye !');
        }
    }
}
hr.sendOffer(11500)
