import { useEffect, useState } from 'react';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import css from './App.module.css';

export default function App() {
  const [reviews, setReviews] = useState(() => {
    const storedReviews = localStorage.getItem('reviews');
    return storedReviews ? JSON.parse(storedReviews) : { good: 0, neutral: 0, bad: 0 };
  });

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;

  const updateFeedback = feedbackType => {
    setReviews(prevReviews => ({
      ...prevReviews,
      [feedbackType]: prevReviews[feedbackType] + 1,
    }));
  };

  useEffect(() => {
    totalFeedback ? localStorage.setItem('reviews', JSON.stringify(reviews)) : '';
  }, [reviews]);

  const resetFeedback = () => {
    setReviews({
      good: 0,
      neutral: 0,
      bad: 0,
    });
    localStorage.removeItem('reviews');
  };

  return (
    <div className={css.app}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback <= 0 ? (
        <Notification />
      ) : (
        <Feedback
          good={reviews.good}
          neutral={reviews.neutral}
          bad={reviews.bad}
          totalFeedback={totalFeedback}
        />
      )}
    </div>
  );
}
