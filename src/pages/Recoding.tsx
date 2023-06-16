import React, { useState, useEffect } from 'react';
import axios from 'axios';

// TODO: Move this to Backend for the security
import { Configuration, OpenAIApi, Model } from "openai";
const configuration = new Configuration({
    organization: "org-98JUxKH77FiK3YYBOr0PCzue",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Recoding() {
  
  useEffect(() => {

    // TODO: Move this to Backend
    const fetchCompletion = async () => {
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "Hello world",
        });
        console.log(completion.data.choices[0].text);
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
    };

    fetchCompletion();
    }, []);

  return (
    <>
      <h1>Recoding</h1>
      
    </>
  )
}

export default Recoding