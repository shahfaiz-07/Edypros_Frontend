export const totalCourseLectures = (course) => {
    let lectures = course.sections.reduce( (acc, section) => acc + section.videos.length, 0)
    return lectures
}