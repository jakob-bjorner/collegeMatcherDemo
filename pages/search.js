import { useState } from "react";
import styles from "../styles/Search.module.css";
import Profile from "../components/Profile";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [essay, setEssay] = useState("");
  const [profiles, setProfiles] = useState([]);
  const data = [
    {
      id: 1,
      name: "John Smith",
      bio: "Successful Stanford Applicant",
      barProportions: [6,4,5,7],
      essays: [
        {
          title: "Essay 1",
          prompt:
            "What is the most significant challenge that society faces today? (50 words)",
          body: "The deterioration of political and personal empathy. There's been an aggressive devaluing of inclusive mindsets and common ground rules—the kind of solidarity of purpose necessary to accommodate divergent viewpoints, respect evidence, share burdens, and tackle national/international emergencies like climate change and immigration. We are fumbling—in backwards tribalism—while the world burns.",
        },
        {
          title: "Essay 2",
          prompt: "How did you spend your last two summers? (50 words)",
          body: "Learned to drive; internship in Silicon Valley (learned to live alone and cook for myself!); a government Honors program; wrote articles for a publication; lobbied at the Capitol; attended a young writers' program; read a whole lot.",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Doe",
      bio: "Successful Stanford Applicant",
      barProportions: [5,2,3,4],
      essays: [
        {
          title: "Essay 1",
          prompt:
            "What is the most significant challenge that society faces today? (50 words)",
          body: "Ignorance poses a paradoxical issue: we can't solve a problem that we don't know exists.\nFor fifteen years, I heard gentrification and thought humanitarian. The Oxford English Dictionary had even taught me that gentrification means “positive change.” How can such atrocities become noticed when our perceptions are so skewed?",
        },
        {
          title: "Essay 3",
          prompt:
            "What historical moment or event do you wish you could have witnessed? (50 words)",
          body: "Valentina Tereshkova's 1963 spaceflight. Tereshkova's skill, grit, and persistence carried her from working in a textile factory, through grueling tests and training, to becoming the first woman to fly solo in space. Her accomplishment remains symbolic of women's empowerment and the expanded progress that's possible with equity in STEM opportunities.",
        },
      ],
    },
    {
      id: 3,
      name: "Bob Johnson",
      bio: "Successful Stanford Applicant",
      barProportions: [2,1,2,3],
      essays: [
        {
          title: "Essay 1",
          prompt:
            "What is the most significant challenge that society faces today? (50 words)",
          body: "Where's Waldo books. \nBy searching for Waldo, we subconsciously teach children that certain people aren't meant to belong-they are meant to be hunted. Our brains may be hardwired to notice people who are different, but we are instructed to treat those people differently. \nSearching for Waldo must be consciously unlearned.",
        },
        {
          title: "Essay 2",
          prompt: "How did you spend your last two summers? (50 words)",
          body: "My goal: Adventure\n\n2015: Moved from North Carolina to Texas (mission trip to Birmingham, Alabama in between), vacationed in Orlando.\n\n2016: Pre-college math program in Boston, engineering program at another university, Ann Arbor, mission trip to Laredo, Texas, vacation to northern California including the lovely Palo Alto",
        },
      ],
    },
  ];
  const handleSearch = async (event) => {
    event.preventDefault();
    // const response = await fetch(`/api/search?term=${searchTerm}`);
    // const data = await response.json();
    setProfiles(data);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      {profiles.length != 0 ? (
        <div>
          <h3 className={styles.subtitle}>Most Aligned applications</h3>
          <div className={styles.profilesContainer}>
            {profiles.map((profile, index) => (
              <Profile profile={profile} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
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
    </div>
  );
}

export default Search;
