// import { useState } from "react";

// export function useSocialFollowers() {
//   const [loading, setLoading] = useState(false);
//   const [followers, setFollowers] = useState(0);
//   const [error, setError] = useState(null);

//   const getFollowers = async (links) => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Send links to your backend (backend handles API calls to YouTube, Twitter, etc.)
//       const query = new URLSearchParams(links).toString();
//       const res = await fetch(`/api/followers?${query}`);
//       const data = await res.json();

//       setFollowers(data.total || 0);
//       return data.total || 0;
//     } catch (err) {
//       setError(err.message);
//       return 0;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { followers, loading, error, getFollowers };
// }


import { useEffect, useState } from "react";

const fakeFetchFollowers = async (link) => {
  // mock by platform detection
  if (link.includes("youtube.com")) return 1200;
  if (link.includes("instagram.com")) return 4500;
  if (link.includes("twitter.com")) return 800;
  if (link.includes("facebook.com")) return 3200;
  if (link.includes("tiktok.com")) return 2100;
  return 0;
};

export function useFollowers(socialLinks) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
    //   let sum = 0;
    //   for (const key in socialLinks) {
    //     const link = socialLinks[key];
    //     if (link) {
    //       const count = await fakeFetchFollowers(link);
    //       sum += count;
    //     }
    //   }
    const query = new URLSearchParams(socialLinks).toString();
      const res = await fetch(`/api/followers?${query}`);
      const data = await res.json();
      setTotal(data.total || 0);
    };

    fetchData();
  }, [socialLinks]);

  return total;
}


