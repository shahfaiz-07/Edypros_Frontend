export const calculateAverageCourseRating = (course) => {
    let avgRating = 0;
    avgRating = course.ratingAndReviews.reduce( (ratingAndReview) => acc + ratingAndReview.rating, 0)
    return avgRating
}