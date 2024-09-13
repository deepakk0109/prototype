import React, { useState } from "react";

const Searchbar = ({onClick}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Handle search input changes
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle keypress events
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      performSearch(searchQuery);
    }
  };

  // Perform search and highlight text
  const performSearch = (query) => {
    clearHighlights(); // Clear previous highlights

    if (query.trim() === "") {
      setResults(["Please enter a search query."]);
      showSnackbar();
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    let found = false;

    // Function to create a highlighted version of the text
    const highlightText = (text) => {
      // Escape special characters in the query for regex
      const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, "gi");
      return text.replace(regex, "<mark>$1</mark>");
    };

    // Walk through all text nodes and highlight matches
    const processTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        if (text.toLowerCase().includes(lowerCaseQuery)) {
          found = true;
          const span = document.createElement("span");
          span.innerHTML = highlightText(text);
          node.parentNode.replaceChild(span, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip script and style elements
        if (["SCRIPT", "STYLE"].includes(node.tagName)) {
          return;
        }
        node.childNodes.forEach(child => processTextNodes(child));
      }
    };

    processTextNodes(document.body);

    if (found) {
      setResults([`Found "${query}"`]);
    } else {
      setResults(["No results found"]);
    }
    showSnackbar();
  };

  // Clear highlights from the page
  const clearHighlights = () => {
    const markedElements = document.querySelectorAll("mark");
    markedElements.forEach((mark) => {
      mark.replaceWith(mark.textContent);
    });
  };

  // Show snackbar
  const showSnackbar = () => {
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000); // Hide after 3 seconds
  };

  return (
    <div onClick ={()=>{onClick()}} style={{ position: "relative", width: "100%", height: "100%" }}>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {snackbarVisible && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            zIndex: 1000,
            marginTop: "8px", // Space between input and snackbar
          }}
        >
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;




// import React, { useState } from "react";

// const Searchbar = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [snackbarVisible, setSnackbarVisible] = useState(false);

//   // Handle search input changes
//   const handleInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   // Handle keypress events
//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       performSearch(searchQuery);
//     }
//   };

//   // Perform search and highlight text
//   const performSearch = (query) => {
//     clearHighlights(); // Clear previous highlights

//     if (query.trim() === "") {
//       setResults(["Please enter a search query."]);
//       showSnackbar();
//       return;
//     }

//     const lowerCaseQuery = query.toLowerCase();
//     let found = false;

//     // Function to create a highlighted version of the text
//     const highlightText = (text) => {
//       // Escape special characters in the query for regex
//       const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
//       const regex = new RegExp(`(${escapedQuery})`, "gi");
//       return text.replace(regex, "<mark>$1</mark>");
//     };

//     // Walk through all text nodes and highlight matches
//     const processTextNodes = (node) => {
//       if (node.nodeType === Node.TEXT_NODE) {
//         const text = node.nodeValue;
//         if (text.toLowerCase().includes(lowerCaseQuery)) {
//           found = true;
//           const span = document.createElement("span");
//           span.innerHTML = highlightText(text);
//           node.parentNode.replaceChild(span, node);
//         }
//       } else if (node.nodeType === Node.ELEMENT_NODE) {
//         // Skip script and style elements
//         if (["SCRIPT", "STYLE"].includes(node.tagName)) {
//           return;
//         }
//         node.childNodes.forEach(child => processTextNodes(child));
//       }
//     };

//     processTextNodes(document.body);

//     if (found) {
//       setResults([`Found "${query}"`]);
//     } else
//      {
//       setResults(["No results found"]);
//     }
//     showSnackbar();
//   };

//   // Clear highlights from the page
//   const clearHighlights = () => {
//     const markedElements = document.querySelectorAll("mark");
//     markedElements.forEach((mark) => {
//       mark.replaceWith(mark.textContent);
//     });
//   };

//   // Show snackbar
//   const showSnackbar = () => {
//     setSnackbarVisible(true);
//     setTimeout(() => setSnackbarVisible(false), 3000); // Hide after 3 seconds
//   };

//   return (
//     <div style={{ position: "relative" , width:'100%',height:'100%'}}>
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchQuery}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyPress}
//         style={{ width: "100%" }}
//       />
//       {snackbarVisible && (
//         <div style={{
//           position: "absolute",
//           top: "100%",
//           left: 0,
//           right: 0,
//           backgroundColor: "#333",
//           color: "#fff",
//           padding: "10px",
//           borderRadius: "4px",
//           boxShadow:"#f0f0f0",
//           textAlign: "center",
//           zIndex: 1000,
//         }}>
//           <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
//             {results.map((result, index) => (
//               <li key={index}>{result}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Searchbar;
