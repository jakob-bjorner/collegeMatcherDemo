// A placeholder function for searching profiles
const fetchFeedback = async (name, prompt, essay) => {
  const res = await fetch("http://127.0.0.1:5000/v1/essay/feedback",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      question: prompt,
      body: essay,
    })
  });
  if (res.status !== 200) {
    throw Error(res.statusText);
  }
  const data = await res.json();
  console.log(data);
  return data;
}
export default fetchFeedback;