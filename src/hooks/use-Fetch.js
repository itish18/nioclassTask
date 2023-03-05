import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (ques) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${ques}`
        );
        setData(res?.data);
        setLoading(false);
      };
      fetchData();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, [ques]);

  return { data, loading };
};

export default useFetch;
