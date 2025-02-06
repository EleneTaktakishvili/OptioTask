// lib/cors.js
export const cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // or use '*' for all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
   }
    next();
  };
  