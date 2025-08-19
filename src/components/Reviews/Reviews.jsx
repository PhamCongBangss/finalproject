import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Reviews.module.css";
import { Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

// Hàm tính thời gian dạng "vừa xong / x phút / x giờ / x ngày"
const timeAgo = (date) => {
  const now = new Date();
  const diff = (now - new Date(date)) / 1000; // chênh lệch giây

  if (diff < 60) return "vừa xong";
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
};

function Reviews() {
  const { productId } = useParams();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/products/${productId}/reviews`,
          { withCredentials: true }
        );
        setReviews(res.data.data.reviews || []);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const data = { rating, review: reviewText };

    try {
      const res = await axios.post(
        `http://localhost:3001/api/products/${productId}/reviews`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const newReview = res.data.data.review;

      setReviews([
        {
          ...newReview,
          user: {
            _id: user._id,
            name: user.name,
            username: user.username,
          },
        },
        ...reviews,
      ]);

      // Reset form
      setRating(0);
      setHover(0);
      setReviewText("");
    } catch (err) {
      console.error(
        "Lỗi gửi review:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className={styles.reviewsContainer}>
      <h2>Đánh giá sản phẩm</h2>

      {user ? (
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`${styles.starIcon} ${
                  star <= (hover || rating) ? styles.filled : ""
                }`}
              />
            ))}
          </div>

          <textarea
            placeholder="Viết đánh giá..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />

          <button type="submit">Gửi đánh giá</button>
        </form>
      ) : (
        <p onClick={() => navigate("/login")} className={styles.login}>
          Đăng nhập để viết đánh giá.
        </p>
      )}

      <div className={styles.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((r, index) => {
            const reviewerName =
              r.user && typeof r.user === "object"
                ? r.user.name || r.user.username || "Ẩn danh"
                : "Ẩn danh";

            return (
              <div key={r._id || index} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <div className={styles.userInfo}>
                    <strong>{reviewerName}</strong>
                    <span className={styles.timeAgo}>
                      {timeAgo(r.createdAt)}
                    </span>
                  </div>
                  <div className={styles.starRatingSmall}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={`${styles.starIcon} ${
                          star <= r.rating ? styles.filled : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p>{r.review}</p>
              </div>
            );
          })
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;
