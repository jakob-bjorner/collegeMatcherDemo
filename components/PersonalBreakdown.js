import React, { useState } from "react";
import styles from "./PersonalBreakdown.module.css";
import BarChart from "../components/BarChart";
import EssayCard from "./EssayCard";

export default function PersonalBreakdown({feedback, essay}) {
    // given a feedback object containing fullFeedback, scores, feedbackBreakdown,
    // create a chart and display the feedback.
    // above the feedback but below the chart have the essay collapsed, and able to be expanded to view.
    // have the feedback able to be collapsed and expanded as well but open by default.
    const [showFeedback, setShowFeedback] = useState(true);
    const toggleFeedback = () => {
        setShowFeedback(!showFeedback);
    }

    const profileid = -1;
    const profilebarProportions = feedback.scores;
    return (
        <div>
          <h3 className={styles.subtitle}>Essay Feedback</h3>
          <div className={styles.personalBreakdownContainer}>
            <div className={styles.feedbackContainer}>
                <h4>Your Essay Breakdown</h4>
                <div className={"bar-chart" + profileid}></div>
                <BarChart indexName={profileid} barProportions={profilebarProportions}></BarChart>
                <EssayCard {...essay} index={0} title={"Submitted Essay"}/>
                <div className={styles.feedbackList}>
                    {Object.keys(feedback.feedbackBreakdown).map((feedbackName, index) => {return <div key={index}><h4 className={styles.feedbackNameHeader}>{feedbackName}</h4><p>{feedback.feedbackBreakdown[feedbackName]}</p></div>})}
                </div>
            </div>
          </div>
        </div>
    );
}
