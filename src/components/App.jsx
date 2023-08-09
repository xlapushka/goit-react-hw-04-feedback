import React, { useState } from 'react';

import css from './styles.module.css';

import { Section } from './section/section';
import { Notification } from './notification/notification';
import { FeedbackStatistic } from './feedbackStatistic/feedbackStatistic';
import { FeedbackButtons } from './feedbackButtons/feedbackButtons';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = e => {
    let option = e.target.name;

    switch (option) {
      case 'good':
        setGood(prev => prev + 1);
        break;

      case 'neutral':
        setNeutral(prev => prev + 1);
        break;

      case 'bad':
        setBad(prev => prev + 1);
        break;

      default:
        console.log('Ooops! Something went wrong');
    }
  };

  const countTotalFeedback = () => {
    return +good + +neutral + +bad;
  };

  const countPositiveFeedbackPercentage = () => {
    let total = +good + +neutral + +bad;
    return Math.round((+good / total) * 100);
  };

  return (
    <div className={css.wrapper}>
      <Section title="Please leave us your feedback">
        <FeedbackButtons
          options={Object(['good', 'neutral', 'bad'])}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="">
        {good === 0 && neutral === 0 && bad === 0 && (
          <Notification message="There is no feedback" />
        )}

        {(good !== 0 || neutral !== 0 || bad !== 0) && (
          <FeedbackStatistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positive={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
};
