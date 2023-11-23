# Project Setup Instructions

## Setting up the application 
* Install docker desktop - latest version based on the operating system

## Running the application 
* Backend python application: docker run -p 5000:5000 jjayakeerthy/archtexx:doc_interactive_backend_v1.0 (on a new terminal window)
* Frontend NextJS application: docker run -e NEXT_PUBLIC_BACKEND_URL=http://localhost:5000 -p 3000:3000 jjayakeerthy/archtexx:doc_interactive_frontend_v1.0 (on a new terminal window)
* To run the application: Go to browser and type the URL: http://localhost:3000 

## Important Points to Remember

# Document Q&A
* Please upload a PDF document for testing.
* While uploading and ingestion process, you will not be able to query the document information and Upload button will be disabled (indicator for the process is in-progress)

# Data Analysis
* Please delete the document that was uploaded for document Q&A before moving to excel analysis.
* For excel analysis:
   * Avoid merged cells.
   * Ensure each column has a clear header.
   * Graphs will be displayed as a popup; close them to continue with the next query.
   * No hidden sheets or formulas
* Example Prompt for Excel Analysis:
   * You are an amazing data analyst and very good at plotting graphs and displaying it. If you are given an excel sheet, you will analyze and give the best results possible. In case you find merged cells, optimize and give me suitable answers; otherwise, you will    give me an error message.
 
# Test case generation 
* Example prompt for test case generation
   * As a senior test designer for UAT, generate a list of all positive and negative test cases which can be understood and be executed by a human tester for the following user story provide a list of all relevant test cases in German provide the result in a tabular format with following columns Testfall, detailed testfall beschreibung, erwartete ergebnis, positive/negativ testfall
