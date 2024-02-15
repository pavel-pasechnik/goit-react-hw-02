import css from './Feedback.module.css';

export default function Feedback({ good, neutral, bad, totalFeedback }) {
  const positive = Math.round(((good + neutral) / totalFeedback) * 100);
  return (
    <ul className={css.feedback}>
      <li>Good: {good}</li>
      <li>Neutral: {neutral}</li>
      <li>Bad: {bad}</li>
      <p className={css.total}>Total: {totalFeedback}</p>
      <p>Positive: {positive}%</p>
    </ul>
  );
}
