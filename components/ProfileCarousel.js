import React, { useState, useEffect } from 'react';
import {ProfileSingleEssay} from '../components/Profile';
import styles from './ProfileCarousel.module.css';
import fetchProfiles from '../lib/api/fetchProfiles'
const ProfileCarousel = ({ essay, prompt, essayDescriptions }) => {
    const [profiles, setProfiles] = useState(null);
    const [error, setError] = useState(null);
    const [searchType, setSearchType] = useState({'full essay': 1, 'tone': 0, 'style': 0, 'structure': 0, 'hook': 0, 'anecdotes & imagery': 0, 'creativity of format': 0})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchProfiles(essayDescriptions, essay, prompt, searchType, 0);
                setProfiles(result.profiles);
            } catch (error) {
                setError(error.message);
                console.log(error);
            }
        }
        fetchData();
    }, [searchType, essayDescriptions]);

    // a sorting ui for the profiles which allows the user to controll how much of each search type contributes to the sorting of the profiles
    const handleSearchTypeChange = (event) => {
        const newSearchType = {...searchType};
        newSearchType[event.target.name] = event.target.checked ? 1 : 0;
        setSearchType(newSearchType);
    }


    


    return (
        <div>
            {/* create two buttons for sorting either by name or bio */}
            {error ? <div>There is an error: {error}</div> : <></>}
            <h3 className={styles.subtitle}>Sort By</h3>
            <div className={styles.searchTypeContainer}>
                <div className={styles.searchTypeHeaderContainer}>
                    <h3>Search Type</h3>
                    <p>Click on the search type to control how much it affects the sorting of the profiles</p>
                </div>
                <div className={styles.searchTypeButtonsContainer}>
                    {/* create a slider for each search type */}
                    {Object.keys(searchType).map((searchTypeName, index) => {
                        return (
                            <div key={index} className={styles.searchTypeButtonContainer}>
                                <input type="checkbox" id={searchTypeName} name={searchTypeName} onChange={handleSearchTypeChange} checked={searchType[searchTypeName]} />
                                <label htmlFor={searchTypeName}>{searchTypeName}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <h3 className={styles.subtitle}>Most Aligned Applications</h3>
            <div className={styles.profilesContainer}>
                {profiles != null ? 
                profiles.map((profile, index) => (
                <ProfileSingleEssay key={profile.id} profile={profile} index={index} />
                )) : 
                <></>}
            </div>
        </div>
    );
};

export default ProfileCarousel;