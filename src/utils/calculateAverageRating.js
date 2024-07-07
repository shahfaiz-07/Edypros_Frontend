export const calculateAverageCourseRating = (course) => {
    let avgRating = 0;
    avgRating = course.ratingAndReviews.reduce( (acc, ratingAndReview) => acc + ratingAndReview.rating/course.ratingAndReviews.length, 0)
    return avgRating
}