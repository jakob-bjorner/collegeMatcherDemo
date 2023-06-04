import React, { useState, Suspence } from "react";
import PersonalBreakdown from "../components/PersonalBreakdown";
import ProfileCarousel from "../components/ProfileCarousel";

export default function SearchFeedback({feedback, name, prompt, essay}) {
    return (
        <>
            {feedback != null ? (
                <>
                    <PersonalBreakdown feedback={feedback} essay={{name: name, prompt:prompt, body: essay}} />
                    <ProfileCarousel essay={essay} prompt={prompt} essayDescriptions={feedback.descriptions} />
                </>
            ) : (
                <></>
            )}
        
        </>
    )
}