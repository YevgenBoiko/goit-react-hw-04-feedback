import { useState, useEffect } from 'react';
import Buttons from '../Buttons/Buttons';
import Statistics from '../Statistics/Statistics';
import Notification from '../Notification/Notification';
import PropTypes from 'prop-types';
import { ButtonList, Layout, Section } from './Feedback.styled';

export const Feedback = ({ initialValue }) => {
  const [good, setGood] = useState(initialValue);
  const [neutral, setNeutral] = useState(initialValue);
  const [bad, setBad] = useState(initialValue);
  const [total, setTotal] = useState(initialValue);
  const [percentage, setPercentage] = useState(initialValue);

  const handleIncrement = e => {
    const button = e.target.name;
    switch (button) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    setTotal(good + neutral + bad);
  }, [good, neutral, bad]);

  useEffect(() => {
    setPercentage(Math.round((good * 100) / total));
  }, [good, total]);

  return (
    <Layout>
      <Section>
        <h2>Please leave Feedback</h2>
        <ButtonList>
          <Buttons onHandleIncrement={handleIncrement} />
        </ButtonList>
      </Section>
      <Section>
        {!bad && !neutral && !good ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={percentage}
          />
        )}
      </Section>
    </Layout>
  );
};

Feedback.propTypes = {
  initialValue: PropTypes.number.isRequired,
};
