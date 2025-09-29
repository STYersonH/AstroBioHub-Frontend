import React, { useState } from "react";

const AuthorList = ({ authors }) => {
  if (!authors) return null;
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [visibleAuthors, setVisibleAuthors] = useState([
    authors[0],
    authors[1],
  ]);

  const handleShowAuthors = () => {
    if (showAllAuthors) {
      setShowAllAuthors(false);
      setVisibleAuthors([authors[0], authors[1]]);
    } else {
      setShowAllAuthors(true);
      setVisibleAuthors(authors);
    }
  };

  return (
    <div className="gap-xs text-ui-2xs-m flex flex-wrap items-center text-gray-400">
      {visibleAuthors.map((author) => (
        <div className="px-xs py-2xs rounded-xs border">{author}</div>
      ))}
      <p className="cursor-pointer" onClick={() => handleShowAuthors()}>
        {showAllAuthors ? "...See less" : "...See all"}
      </p>
    </div>
  );
};

export default AuthorList;
