import axios from 'axios';

(async () => {
  const res = await axios.post('http://localhost:3001/api/query', {
    question: 'Vad är TypeScript?'
  });
  console.log(res.data);
})();
