import React, { useEffect, useState } from 'react';

import { Card, Form, Load } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-poppins font-bold text-[#63e1e0] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-poppins font-extrabold text-[#222328] text-[32px]">This is FWDiFly</h1>
        <p className="mt-2 font-poppins text-[#42484c] text-[14px] max-w-[500px]">You've landed where imaginative and visually stunning worlds are launched. Watch words engage the dynamic capabilities of AI to create spaces that elevate escape.</p>
      </div>

      <div className="mt-16">
        <Form
          labelName="Search"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Load />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-black text-xl mb-3">
                Here's what we found for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="Answers will land soon"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="Views will land soon"
                />
              )}
            </div>
          </>
        )}
      </div>

      <p className="py-5 mt-2 font-poppins text-[#42484c] text-[20px] max-w-[500px]"> Step boldly beyond impossibility. </p>
    </section>
  );
};

export default Home; 