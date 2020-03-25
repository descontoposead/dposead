import { useState, useRef } from 'react'
import { useDebounce } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
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
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef()

  useDebounce(() => similarCourseFrom(typed), 1000, [typed])

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  const setSelectedCourse = (name) => {
    inputRef.current.value = name
    inputRef.current.classList.add('selected')
    assignNewValue(inputRef.current)
  }

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
            onChange={({ target: { value } }) => setTyped(value)}
            ref={inputRef}
            autoComplete="off"
            autoFocus
            name="course"
          ></textarea>
          {coursesDesires.length > 0 && (
            <div className="result">
              <strong>Encontramos esses:</strong>
              <ul>
                {coursesDesires.map((course, i) => (
                  <li key={i} onClick={() => setSelectedCourse(course.name)}>
                    {course.name} de <i>{course.hours} horas</i>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              stepNextStep({ currentStep: 'InputGroupGraduation' })
            }
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => stepNextStep({ currentStep: 'InputPaymentMethod' })}
          >
            É este que eu quero
          </button>
        </div>

        <style jsx global>{`
          div:nth-child(2) {
            height: 250px;
          }
          div:nth-child(2) textarea {
            height: 43%;
          }
          div:nth-child(2) textarea.selected {
            color: #ff9800;
            font-weight: bold;
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
