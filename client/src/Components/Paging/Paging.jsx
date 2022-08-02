import React from "react";
import "./Paging.css";
export default function Paging({ countriesInPage, allCountries, paging }) {
  const pageNum = [];
  const max = 1 + Math.ceil((allCountries - 9) / countriesInPage);
  for (let i = 1; i <= max; i++) {
    pageNum.push(i);
  }
  return (
    <nav className="paging">
      <ul>
        {pageNum?.map((n) => (
          <button key={n} onClick={() => paging(n)} className="pagebutton">
            {n}
          </button>
        ))}
      </ul>
    </nav>
  );
}
