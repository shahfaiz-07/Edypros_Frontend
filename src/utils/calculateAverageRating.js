export const calculateAverageCourseRating = (course) => {
    let avgRating = 0;
    avgRating = course.ratingAndReviews.reduce( (acc, ratingAndReview) => acc + ratingAndReview.rating, 0)
    return avgRating
}