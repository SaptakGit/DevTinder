# Scheduling a CRON Job in Node
    1) install 'npm i node-cron' in backend
    2) in util create a file cronjob.js
    3) in cronjob.js
        const cron = require("node-cron");

        cron.schedule("* * * * * *",() => {
            console.log("Hello World"+ new Date());
            // API / Logic will be here
        })

    4) add cronjob.js in app.js

    *** Cron String ***

    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *

    field         |	     value
    --------------|---------------
    second	      | 0-59
    minute	      | 0-59
    hour	      | 0-23
    day of month  |	1-31
    month         | 1-12 (or names)
    day of week   | 0-7 (or names, 0 or 7 are sunday)

    https://crontab.guru/

# for handling date 'npm i date-fns'