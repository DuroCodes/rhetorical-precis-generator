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

    setLoading(false);
    setData(res.data.response);
  };

  const onChange = async (event: React.FormEvent<HTMLFormElement>) => {
    setArticle((event.target as HTMLTextAreaElement).value);
  };

  if (loading) {
    return (
      <div>
        <div className="text-white flex items-center justify-center gap-3">
          <h1 className="text-4xl font-extrabold mb-2">Loading...</h1>
          <svg className="fill-white animate-spin" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" /></svg>
        </div>
      </div>
    );
  }

  if (data !== '') {
    return loading
      ? (
        <div className="text-red-400">
          <h1 className="text-4xl font-extrabold mb-2">An Error Occured</h1>
          Please refresh your page and try again.
        </div>
      )
      : (
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
