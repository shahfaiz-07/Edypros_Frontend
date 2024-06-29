import moment from "moment";
export const totalSectionDuration = (section) => {
    let duration = 0
    duration = section.videos.reduce( (acc, video) => acc + Number(video.duration), 0);

    return duration
}

export const totalCourseDuration = (course) => {
    let duration = 0
    duration = course.sections.reduce( (acc, section) => acc + totalSectionDuration(section), 0);
    // console.log("Course Duration in seconds",duration)
    return duration
}

export const formatDuration = (seconds) => {
    const duration = moment.duration(seconds, 'seconds');
    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours() - (days)*24);
    const minutes = Math.floor(duration.asMinutes() - Math.floor(days)*1440 - Math.floor(hours)*60);
    const second = Math.floor(seconds - Math.floor(days)*86400 - Math.floor(hours)*3600 - Math.floor(minutes)*60)

    // return {
    //     second,
    //     minutes,
    //     hours,
    //     days
    // };
    let overAllTime = "";
    if(second) {
        overAllTime = second + "s"
    }

    if(minutes) {
        overAllTime = minutes + "m " + overAllTime
    }

    if(hours) {
        overAllTime = hours + "h " + overAllTime
    }

    if(days) {
        overAllTime = days + "d " + overAllTime
    }
    return overAllTime
}

// console.log("OverAllTime : ", formatDuration(189500))