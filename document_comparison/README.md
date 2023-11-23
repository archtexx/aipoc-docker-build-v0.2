# Project Setup Instructions

## Setting up the application 
* Install docker desktop - latest version based on the operating system

## Running the application 
* Backend python application: docker run -p 5001:5001 jjayakeerthy/archtexx:document_comparison_backend_v1.0 (on a new terminal window)
* Frontend NextJS application: docker run -e NEXT_PUBLIC_BACKEND_URL=http://localhost:5001 -p 3001:3001 jjayakeerthy/archtexx:document_comparison_frontend_v1.0 (on a new terminal window)
* To run the application: Go to browser and type the URL: http://localhost:3001

## Current limitations
* Azure openAI APIs are not compatible with the Langchain OpenAI Multi Function agents.
* Hence as a workaround, the application runs with openAI key only.
* Only the predefined system prompt, custom prompting is not enabled yet. 

# Functionality 
* Please upload 2 documents only - PDFs
* These are uploaded one after the other
