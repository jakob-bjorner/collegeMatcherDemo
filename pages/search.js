import { useState } from "react";
import styles from "../styles/Search.module.css";
import Profile from "../components/Profile";
import Image from "next/image";
import fetchFeedback from "../lib/api/fetchFeedback";
import SearchFeedback from "../components/SearchFeedback";
import { set } from "date-fns";
import RadarChart from "../components/RadarChart";
function Search() {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [essay, setEssay] = useState("");
  const [personalFeedback, setPersonalFeedback] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const handleSearch = async (event) => {
    event.preventDefault();
    if (prompt === "a") { // dummy data
      const data = {
        "descriptions": {
            "anecdotes & imagery": "The essay does not use anecdotes or imagery, instead relying on factual evidence and persuasive arguments.",
            "creativity of format": "The essay uses a standard format and does not experiment with creative formats or styles.",
            "hook": "The essay starts with a thought-provoking statement that captures the reader's attention and sets the tone for the rest of the essay. The hook is relevant to the essay's topic and highlights the urgency of the issue.",
            "structure": "The essay follows a standard structure, starting with an introduction that sets the context, followed by the main arguments, and concluding with a summary. The ideas are arranged in a logical order that builds up to the conclusion.",
            "style": "The writer uses concise and direct language, sticking to the point without unnecessary detours. The sentence length is reasonable, with a mix of long and short sentences for variety.",
            "tone": "The tone of the essay is serious, highlighting the gravity of the issues. The language is academic and analytical, with a touch of urgency."
        },
        "feedbackBreakdown": {
            "Anecdotes & Imagery": "The essay does not use anecdotes or imagery, instead relying on factual evidence and persuasive arguments. The essay is persuasive and well-argued, but could benefit from adding some personal anecdotes to make the issue feel more personal. To enhance the essay's emotional appeal, the writer could include personal anecdotes or stories that illustrate the impact of the issues on individuals and communities.",
            "Creativity Of Format": "The essay uses a standard format and does not experiment with creative formats or styles. The essay is well-written and persuasive, but could benefit from some experimentation with creative formats to make it stand out. To elevate the creativity of the essay, the writer could try using a non-standard format, such as a poem or an infographic, to highlight the urgency and impact of the issues.",
            "Hook": "The essay starts with a thought-provoking statement that captures the reader's attention and sets the tone for the rest of the essay. The hook is relevant to the essay's topic and highlights the urgency of the issue. The essay has a strong hook that grabs the reader's attention. To make the hook even stronger, the writer could try using a metaphor or analogy to help the reader visualize the issue and its impact.",
            "Structure": "The essay follows a standard structure, starting with an introduction that sets the context, followed by the main arguments, and concluding with a summary. The ideas are arranged in a logical order that builds up to the conclusion. The essay has a good structure that is easy to follow and builds up to a clear conclusion. To elevate the structure, the writer could experiment with using different techniques such as a montage to show the different angles of the issue, or a narrative to highlight personal stories that help contextualize the issue.",
            "Style": "The writer uses concise and direct language, sticking to the point without unnecessary detours. The sentence length is reasonable, with a mix of long and short sentences for variety. The essay is well-written, with clear and concise language. To further improve the style, the writer could experiment with using metaphors or analogies to help the reader connect with the issues more personally.",
            "Tone": "The tone of the essay is serious, highlighting the gravity of the issues. The language is academic and analytical, with a touch of urgency. The essay has a suitable tone that matches the weight of the topics. To take the essay to the next level, the writer could experiment with adding a personal touch to the essay by sharing their experience with environmental issues or immigration and how it has affected them or their community."
        },
        "fullFeedback": "\n            {\n                \"Tone\": {\n                    \"description\": \"The tone of the essay is serious, highlighting the gravity of the issues. The language is academic and analytical, with a touch of urgency.\",\n                    \"Judgement\": \"The essay has a suitable tone that matches the weight of the topics.\",\n                    \"score\": 8,\n                    \"suggestion\": \"To take the essay to the next level, the writer could experiment with adding a personal touch to the essay by sharing their experience with environmental issues or immigration and how it has affected them or their community.\"\n                },\n                \"Style\": {\n                    \"description\": \"The writer uses concise and direct language, sticking to the point without unnecessary detours. The sentence length is reasonable, with a mix of long and short sentences for variety.\",\n                    \"Judgement\": \"The essay is well-written, with clear and concise language.\",\n                    \"score\": 9,\n                    \"suggestion\": \"To further improve the style, the writer could experiment with using metaphors or analogies to help the reader connect with the issues more personally.\"\n                },\n                \"Structure\": {\n                    \"description\": \"The essay follows a standard structure, starting with an introduction that sets the context, followed by the main arguments, and concluding with a summary. The ideas are arranged in a logical order that builds up to the conclusion.\",\n                    \"Judgement\": \"The essay has a good structure that is easy to follow and builds up to a clear conclusion.\",\n                    \"score\": 8,\n                    \"suggestion\": \"To elevate the structure, the writer could experiment with using different techniques such as a montage to show the different angles of the issue, or a narrative to highlight personal stories that help contextualize the issue.\"\n                },\n                \"Hook\": {\n                    \"description\": \"The essay starts with a thought-provoking statement that captures the reader's attention and sets the tone for the rest of the essay. The hook is relevant to the essay's topic and highlights the urgency of the issue.\",\n                    \"Judgement\": \"The essay has a strong hook that grabs the reader's attention.\",\n                    \"score\": 9,\n                    \"suggestion\": \"To make the hook even stronger, the writer could try using a metaphor or analogy to help the reader visualize the issue and its impact.\"\n                },\n                \"Anecdotes & imagery\": {\n                    \"description\": \"The essay does not use anecdotes or imagery, instead relying on factual evidence and persuasive arguments.\",\n                    \"Judgement\": \"The essay is persuasive and well-argued, but could benefit from adding some personal anecdotes to make the issue feel more personal.\",\n                    \"score\": 7,\n                    \"suggestion\": \"To enhance the essay's emotional appeal, the writer could include personal anecdotes or stories that illustrate the impact of the issues on individuals and communities.\"\n                },\n                \"Creativity of format\": {\n                    \"description\": \"The essay uses a standard format and does not experiment with creative formats or styles.\",\n                    \"Judgement\": \"The essay is well-written and persuasive, but could benefit from some experimentation with creative formats to make it stand out.\",\n                    \"score\": 6,\n                    \"suggestion\": \"To elevate the creativity of the essay, the writer could try using a non-standard format, such as a poem or an infographic, to highlight the urgency and impact of the issues.\"\n                }\n            }\n            ",
        "id": 0,
        "scores": {
            "anecdotes & imagery": 7,
            "creativity of format": 6,
            "hook": 9,
            "structure": 8,
            "style": 9,
            "tone": 8
        }
      };
      setFeedback(data);
      setEssay("People disregard open-mindedness and common ground, essential for handling diverse viewpoints, evidence recognition, cooperation, global challenges such as climate change and immigration. We regress into tribalism, hindering our ability to tackle pressing issues and harming the environment.");
    } else {
      try {
        const data = await fetchFeedback(name, prompt, essay);
        setFeedback(data);
      } catch (err) {
        setError(err)
        console.log(error);
      }
    }
    window.scrollTo(0, 0);
  };
  const imgScale = 500;
  return (
    <div className={styles.container}>
      {/* display error if not null */}
      {error && <p className={styles.error}>{JSON.stringify(error)}</p>}
      <SearchFeedback feedback={feedback} name={name} prompt={prompt} essay={essay}/>
      <h3 className={styles.title}>Stanford Alignment</h3>
      <p className={styles.description}>
        Give us your college essay, and we will tell you how close you are to a
        successful Stanford Applicant.
      </p>

      <form onSubmit={handleSearch} className={styles.form}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <label className={styles.label} htmlFor="essay-prompt">
          Prompt
        </label>
        <input
          className={styles.input}
          type="text"
          id="prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          required
        />
        <label className={styles.label} htmlFor="essay">
          Essay
        </label>
        <textarea
          className={styles.textarea}
          id="essay"
          value={essay}
          onChange={(event) => setEssay(event.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      <div className={styles.previewImage}>
        <h2>Example of feedback</h2>
        <Image
          src="/images/feedback-example.png"
          alt="Screenshot of example feedback"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // sizes={"100hw"}
          height={3.25 * imgScale}
          width={1 * imgScale}
        />
      </div>
    </div>
  );
}

export default Search;
