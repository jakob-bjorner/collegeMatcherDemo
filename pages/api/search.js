export default async function handler(req, res) {
    const searchTerm = req.query.term;
  
    // Perform search based on the search term
    const profiles = await searchProfiles(searchTerm);
  
    // Return the search results as JSON
    res.status(200).json(profiles);
  }
  
  // A placeholder function for searching profiles
  async function searchProfiles(term) {
    // In a real application, we would perform a database query or API request to retrieve the search results
    // For this example, we'll just return some dummy data
    const profiles = [
      { id: 1, name: "John Smith", bio: "A software developer from New York" },
      { id: 2, name: "Jane Doe", bio: "A graphic designer from San Francisco" },
      { id: 3, name: "Bob Johnson", bio: "A marketing executive from Chicago" },
    ];
  
    return profiles.filter((profile) =>
      profile.name.toLowerCase().includes(term.toLowerCase()) || profile.bio.toLowerCase().includes(term.toLowerCase())
    );
  }