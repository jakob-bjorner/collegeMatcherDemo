import BarChart from "../components/BarChart";
import { useState } from 'react';
import styles from './ProfileCard.module.css';
import EssayCard from "./EssayCard";
function ProfileCard({ profile, index }) {
  const [showEssays, setShowEssays] = useState(index == 0 ? true : false);

  const toggleEssays = () => {
    setShowEssays(!showEssays);
  };

  return (
    <div key={profile.id} className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <h4 className={styles.profileName}>{profile.name}</h4>
        <p className={styles.profileBio}>{profile.bio}</p>
        <div className={"bar-chart" + profile.id}></div>
        <BarChart indexName={profile.id} barProportions={profile.barProportions} maxY={7}></BarChart>
      </div>
      <div className={styles.carrotContainer}>
        <div className={styles.carrotButton} onClick={toggleEssays}>
          View essays &#x25BC;
        </div>
        <div className={`${styles.graphics} ${showEssays ? styles.showEssays : styles.dontshowEssays}`}>
            <div className={styles.essayDropdowns}>
            <ul>
                {
                    profile.essays.map((essay, index) => {
                        return (
                            <li>
                                <EssayCard title={essay.title} prompt={essay.prompt} body={essay.body} index={index}/>
                            </li>
                        )
                    })
                }
                
            </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
