import React, { useState } from 'react';
import axios from 'axios';

const InputForm: React.FC = () => {
  const [article, setArticle] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const submitArticle = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const res = await axios.get('/api/gpt', {
      params: { article }
    });

    console.log(res.data.response);

    setLoading(false);
    setData(res.data.response);
  };

  const onChange = async (event: React.FormEvent<HTMLFormElement>) => {
    setArticle((event.target as HTMLTextAreaElement).value);
  };

  if (loading) {
    return (
      <div className="text-white">
        <h1 className="text-4xl font-extrabold mb-2">Loading Response...</h1>
      </div>
    );
  }

  if (data !== '') {
    return (
      <div className="text-white">
        <h1 className="text-4xl font-extrabold mb-2">Response</h1>
        <p className="indent-10">{data}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xs my-2 overflow-hidden rounded shadow-lg text-white">
      <div className="px-6 py-4">
        <form className="flex flex-col" onSubmit={submitArticle} onChange={onChange} action="/api/gpt">
          <h1></h1>
          <label htmlFor="name" className="mb-2 text-2xl font-extrabold">Article URL</label>
          <input
            className="mb-4 border-b-2 rounded-lg text-black p-2"
            id="name"
            name="name"
            type="url"
            autoComplete="name"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-[hsl(280,100%,70%)] rounded-full hover:bg-[#9d4dc5]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
