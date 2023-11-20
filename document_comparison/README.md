# Project Setup Instructions

## Setting up the application 
* Install docker desktop - latest version based on the operating system

## Running the application 
* Backend python application -     docker run -p 5000:5000 jjayakeerthy/archtexx:doc_comparison_backend (on a new terminal window)
* Frontend NextJS application -    docker run -e NEXT_PUBLIC_BACKEND_URL=http://localhost:5001 -p 3001:3001 jjayakeerthy/archtexx:doc_comparison_frontend (on a new terminal window)
* To run the application – Go to browser and type the URL: http://192.168.1.50:3001
* Key point
   * The data point highlighted in RED should be changed according to the IP of your machine

## Current limitations

* Azure openAI APIs are not compatible with the Langchain OpenAI Multi Function agents.
* Hence as a workaround, the application runs with openAI key only.
* Only the predefined system prompt, custom prompting is not enabled yet. 

# Functionality 
* Please upload 2 documents only - PDFs
* These are uploaded one after the other
