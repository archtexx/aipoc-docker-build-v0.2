import json
import logging
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.chat_models import ChatOpenAI

OPEN_AI_API_KEY ="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"

db = SQLDatabase.from_uri("sqlite:///C:\\Users\\ADMIN\\Downloads\\llm_sql_ui\\llm_sql_ui\\llmsql\\llm_sights.db")
llm = ChatOpenAI(openai_api_key=OPEN_AI_API_KEY, model_name='gpt-4')
toolkit = SQLDatabaseToolkit(db = db, llm = llm)

agentExecutor = create_sql_agent(
    llm= llm,
    toolkit= toolkit,
    verbose= True
)

PROMPT = """
Given an input question, this script will:
1. Create a syntactically correct SQLite query using the schema 'bill'.
2. Execute the query and analyze the results.
3. Generate a JSON response containing specific fields based on the query results.
The input question is: {question}.
The JSON response will include the following fields:
- 'response': The answer derived from the query results.
- 'labels': Labels relevant to the data (e.g., column names from the query).
- 'data': Do not truncate the data obtained from the query and make sure it can used in reactjs application without breaking the code.
- 'related_prompts': Suggestions for related queries or prompts based on the input question.
- 'chart_type': A suggested type of chart to visually represent the data. Possible values are "bar," "pie," "line," "table," or "none."
Note: The script focuses solely on constructing a well-formed JSON object tailored to the given question, without extraneous information. Make sure it acn be used in React js Application.
"""



# def askQuestion(query):
#     ans = agentExecutor.run(PROMPT.format(question=query))
#     return ans


def askQuestion(query):
    logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
    logging.info ("Entering sql_llm API call")
    ans = agentExecutor.run(PROMPT.format(question=query))
    print(ans)
    ans1=ans.replace('None', 'null').replace('...', '')
   
    if ans1[:3] == '```' and ans1[-3:] == '```':
        jsonData1 = ans[3:-3]
        response=validateJSON(jsonData1)
        logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
        logging.debug(f'Response is: {response}')
        print(response)
        if response==True:
             
            logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
            logging.debug(f'Response is: {jsonData1}')
            logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
            logging.info ("Exiting sql_llm API call")
            print(jsonData1)
            return jsonData1
        else:
            return "The response data was not processed by openAI. Please post another query"
    else:
        response=validateJSON(ans1)
        logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.DEBUG)
        logging.debug(f'Response is: {response}')
        if response==True:
            logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.INFO)
            logging.info ("Exiting sql_llm API call")
            return ans1
        else:
            return "The response data was not processed by openAI. Please post another query"
def validateJSON(jsonData):
    try:
        json.loads(jsonData)
    except ValueError as err:
        logging.basicConfig(format='%(asctime)s - %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p', level=logging.ERROR)
        logging.error("Exception has occured")
        return False
    return True

