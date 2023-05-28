const fetchProfiles = async (essayDescriptions, essay, prompt, searchType, id) => {
    const res = await fetch(
        // "http://127.0.0.1:5000/v1/essay/related",
        "https://cledge-essay-metrics.azurewebsites.net/v1/essay/related",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            question: prompt,
            descriptions: {...essayDescriptions, 'full essay': essay},
            searchType: searchType,
        }),
    });
    if (res.status === 200) {
        const data = await res.json();
        return data
    } else {
        throw Error(`status code not 200 instead ${res.status}`);
    }
}

export default fetchProfiles;