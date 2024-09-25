import { useEffect, useState } from 'react';
import { NavBar } from '../components/navbar';
import axios from 'axios';
import AccessDenied from '../components/access-denied';
import { useSession } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileUpload: React.FC = () => {
  const [selectedResponse, setSelectedResponse] = useState<string>('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const { data: session, status } = useSession();
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/questionsshort');
      const data = await response.json();
      console.log(data);
      setQuestions(data);
    } catch (error) {
      console.log('Error fetching questions:', error);
    }
  };
  const handleQuestionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuestion(event.target.value);
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);

    fetch('http://127.0.0.1:5000/contracts/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].answer);
        setSelectedResponse(data[0].answer);
        console.log(data[0].answer);

        const textareaContent = data
          .map(
            (res: { answer: any; probability: any; analyse: any }, index: number) =>
              `Answer ${index + 1}: ${res.answer} (${res.probability}) (${res.analyse})`
          )
          .join('\n');

        const textarea = document.getElementById('response') as HTMLTextAreaElement;
        textarea.value = textareaContent;

        // Update answer colors based on analysis
        data.forEach((res: { answer: any; analyse: any }) => {
          const answerIndex = data.findIndex((item: { answer: any }) => item.answer === res.answer);
          const answerElement = document.getElementById(`answer-${answerIndex + 1}`);

          if (answerElement) {
            if (res.analyse === 'positive') {
              answerElement.style.color = 'green';
            } else if (res.analyse === 'negative') {
              answerElement.style.color = 'red';
            } else {
              answerElement.style.color = 'inherit';
            }
          }
        });
        document.getElementById('explanation')!.innerHTML = '';
      })
      .catch((error) => console.log(error));
  };
  const handleExplanationClick = () => {
    if (selectedResponse !== '') {
      const encodedSelectedResponse = encodeURIComponent(selectedResponse);
      const apiUrl =
        'http://127.0.0.1:5000/contracts/paraphrase/' + encodedSelectedResponse;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const htmlContent = data
            .map((element: string) => `<p>${element}</p>`)
            .join('');
          document.getElementById('explanation')!.innerHTML = htmlContent;
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    < >
    <NavBar/>
      <div className='dashboard'>

        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          {/* <input type="file" name="file" /> */}
          <label htmlFor="images" className="drop-container">
          <img width="100" height="100" src="./assets/img/iconn.png" alt="upload--v1"/>
            <span className="drop-title" style={{color:"#e8b11c"}}>Drop Files Here</span>
            or
            <input type="file" className='file-upload' name="file" required />
          </label>
          <p className='mt-3 mb-2'>Choose Question from the Dropdown</p>
          <select name="question" className="select-box" >
            {questions && questions.map((question, index) => (
              <option key={index} value={question}>
                {question}
              </option>
            ))}
          </select>
          <input className="custom-btn btn-8" type="submit" value="Generate Response" />
          <br />
          <p className='mt-3 mb-2'>Or Enter Question Manually</p>
          <input className='select-box' placeholder='Enter Question Here'/>
          <input className="custom-btn btn-8" type="submit" value="Generate Response" />
        </form>
        <div id="response"></div>
        <div className="code-container" style={{margin:"5rem 0"}}>
          <section className="augs bg" data-augmented-ui>
            <input className="title" value="Get Response" />
            <div className="code highcontrast-dark" style={{padding:"1rem"}}>
              <textarea id="response" className="code-textarea" rows={10} placeholder="Generate Response Here..." readOnly>
              </textarea>
            </div>
          </section>
        </div>
        <button className="custom-btn btn-9" onClick={handleExplanationClick}><span>Explain response</span></button>
        <div className="ccode highcontrast-dark" id="explanation"></div>
        <div className="ccode highcontrast-dark" id="analysis"></div>
      </div>
    </>
  );
};

export default FileUpload;
