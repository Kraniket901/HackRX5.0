from transformers import pipeline

def simple_qa(question, context, model_name="deepset/roberta-base-squad2"):
    # Load the question-answering pipeline
    qa_pipeline = pipeline("question-answering", model=model_name)
    # Perform the question-answering task
    result = qa_pipeline(question=question, context=context)
    return result["answer"]