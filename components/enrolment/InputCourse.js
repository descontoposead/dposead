import { useState, useRef } from 'react'
import { useDebounce } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import like from '../../helpers/like'

const InputCourse = () => {
  const [step, stepNextStep] = useSharedStep()
  const [courses, setCourses] = useState([
    {
      name: 'Administração de negocios',
      area: 'Administração',
      hours: 400,
    },
    {
      name: 'Pedagogia para crianças do segundo grau',
      area: 'Pedagogia',
      hours: 200,
    },
    {
      name: 'Educação fisica nas escolas',
      area: 'Pedagogia',
      hours: 200,
    },
  ])
  const [coursesDesires, setCoursesDesires] = useState([])
  const [typed, setTyped] = useState('')
  const inputRef = useRef()
  useDebounce(() => similarCourseFrom(typed), 1000, [typed])

  const similarCourseFrom = (match) =>
    setCoursesDesires(
      courses
        .filter(({ name, area }) => like(match, name) || like(match, area))
        .splice(0, 2)
        .reverse() //just 2 firsts
    )

  return (
    currentStepIs('InputCourse', step) && (
      <>
        <div>
          <h1>Que curso você deseja iniciar?</h1>
        </div>
        <div>
          <textarea
            ref={inputRef}
            auto-complete="off"
            autoFocus
            name="course"
            onChange={({ target: { value } }) => setTyped(value)}
          ></textarea>
          {coursesDesires.length > 0 && (
            <div className="result">
              <strong>Encontramos esses:</strong>
              <ul>
                {coursesDesires.map((course, i) => (
                  <li
                    key={i}
                    onClick={() => (inputRef.current.value = course.name)}
                  >
                    {course.name} de <i>{course.hours} horas</i>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputPaymentValues' })}
          >
            É este que eu quero
          </button>
        </div>

        <style jsx global>{`
          div:nth-child(2) {
            height: 8vh;
          }
          div.result {
            border-top: 4px solid;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: center;
          }
          div.result ul {
            list-style: none;
            font-size: 1.2rem;
            margin-bottom: 70px;
            margin-top: 0;
            padding: 0;
          }
          div.result ul li {
            text-decoration: underline;
            cursor: pointer;
          }
          div.result strong {
            font-size: 2rem;
          }
        `}</style>
      </>
    )
  )
}

export default InputCourse
