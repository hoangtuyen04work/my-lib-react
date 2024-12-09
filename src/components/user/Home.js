import React, { useState } from 'react';
import Header from './Header';
import Body from './Body';

const HomePage = () => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Header
        onCategoryChange={setCategory}
      />
      <Body
        category={category}
      />
    </>
  );
};

export default HomePage;
