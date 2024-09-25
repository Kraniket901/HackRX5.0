from flask import Flask, request
from textblob import TextBlob
from paraphrase import paraphrase
from predict import run_prediction
from predict2 import simple_qa
from io import StringIO
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
answers = []

def load_questions_short():
    questions_short = []
    with open('data/questions_short.txt', encoding="utf8") as f:
        questions_short = f.readlines()
    return questions_short

def getContractAnalysis(selected_response):
    print("Analyzing contract answer")
    print(selected_response)
    if selected_response == "":
        return "No answer found in document"
    else:
        blob = TextBlob(selected_response)
        polarity = blob.sentiment.polarity
        print(f"Polarity: {polarity}")
        if polarity > 0:
            return "Positive"
        elif polarity < 0:
            return "Negative"
        else:
            return "Neutral"

questions_short = load_questions_short()

@app.route('/questionsshort')
def getQuestionsShort():
    return questions_short

@app.route('/contracts/', methods=["POST"])
def getContractResponse():
    # Check if file and question are present in the request
    if 'file' not in request.files or 'question' not in request.form:
        print("File or question not provided")
        return "File or question not provided", 400

    file = request.files["file"]
    question = request.form['question']

    # Log details to verify data reception
    print(f"Received file: {file.filename}, size: {len(file.read())} bytes")
    file.seek(0)  # Reset file pointer after reading for logging purposes
    print(f"Received question: {question}")

    # Process the text file
    try:
        stringio = StringIO(file.getvalue().decode("utf-8"))
        paragraph = stringio.read()
        print(f"File content preview: {paragraph[:200]}...")  # Log the first 200 characters of the file
    except Exception as e:
        print(f"Error reading file content: {e}")
        return "Error reading file content", 500

    if len(paragraph) == 0 or len(question) == 0:
        print("Empty paragraph or question")
        return "Empty paragraph or question", 400

    try:
        print('Getting predictions...')
        answer = simple_qa(question, paragraph)
        print("Answer:", answer)
        # predictions = run_prediction([question], paragraph, 'marshmellow77/roberta-base-cuad', n_best_size=5)
        print("Predictions received successfully")
    except Exception as e:
        print(f"Error during prediction: {e}")
        return "Error during prediction", 500
    
    return json.dumps(answer)

    # answer = []
    # if predictions['0'] == "":
    #     answer.append({
    #         "answer": 'No answer found in document',
    #         "probability": ""
    #     })
    # else:
    #     try:
    #         with open("nbest.json", encoding="utf8") as jf:
    #             data = json.load(jf)
    #             for i in range(int(5)):
    #                 answer.append({
    #                     "answer": data['0'][i]['text'],
    #                     "probability": f"{round(data['0'][i]['probability']*100, 1)}%",
    #                     "analyse": getContractAnalysis(data['0'][i]['text'])
    #                 })
    #     except Exception as e:
    #         print(f"Error loading nbest.json: {e}")
    #         return "Error processing predictions", 500

    # return json.dumps(answer)

@app.route('/contracts/paraphrase/<path:selected_response>', methods=['GET'])
def getContractParaphrase(selected_response):
    print("Received paraphrase request")
    print(selected_response)
    if selected_response == "":
        return "No answer found in document"
    else:
        print('Getting paraphrases...')
        paraphrases = paraphrase(selected_response)
        print(paraphrases)
        return paraphrases

if __name__ == '__main__':
    app.run()
