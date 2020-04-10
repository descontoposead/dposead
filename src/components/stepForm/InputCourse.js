import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle, useDebounce } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import goToNext from '../../helpers/goToNext'
import like from '../../helpers/like'

const InputCourse = () => {
  const [step, setNextStep] = useSharedStep()
  const [courses, setCourses] = useState([])
  const [coursesDesires, setCoursesDesires] = useState([])
  const [typed, setTyped] = useState('')
  const [fetchedGrade, setFetchedGrade] = useState([])
  const [isToggleGradeButton, setToggleGradeButton] = useState(false)
  const [isSelectedOption, setSelectedOption] = useState(false)

  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef(null)

  useVibrate(vibrating, timers, isInfiniteLoop)
  useDebounce(() => similarCourseFrom(typed), 1000, [typed])

  const similarCourseFrom = (match) =>
    setCoursesDesires(
      courses
        .filter(({ name }) => like(match, name))
        .splice(0, 20)
        .reverse() //just 20 firsts
    )

  // scrap-fetch courses
  useEffect(() => {
    let page = 0

    ;(async function paginate() {
      const stream = await fetch('/api/courses/' + page++)
      const res = await stream.json()

      if (stream.status === 200) {
        setCourses((data) => [...data, ...res])
      } else {
        return
      }

      await paginate()
    })()
  }, [])

  useEffect(() => {
    setOptNextStep({
      inputEl: () => inputRef.current,
      setNextFn: () =>
        setNextStep({
          currentStep: 'InputPayMethodCourse',
          progressValue: step.progressValue + 7.69,
        }),
      vibrateFn: () => toggleVibrating(),
    })

    //set cache value to input
    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name] || ''
    }
  }, [step])

  const controlInputValue = (target) =>
    setSharedValues(
      Object.assign(values, {
        [target.name]: target.value,
      })
    )

  const onSelectCourse = () => ({ target }) => {
    if (!target.value) {
      setSelectedOption(false)
      return
    }

    const optionSelected = JSON.parse(
      target.options[target.selectedIndex].getAttribute('data-object')
    )

    setSelectedOption(true)

    fetch(optionSelected._detail)
      .then((res) => res.json())
      .then(setFetchedGrade)
      .catch(console.log)

    setFetchedGrade([])
    setToggleGradeButton(false)
    controlInputValue(target)
  }

  const onSearchCourse = (target) => {
    if (target.value) {
      setTyped(target.value)
      controlInputValue(target)
    } else {
      // controlInputValue(target)
    }

    setFetchedGrade([])
    setToggleGradeButton(false)
    setSelectedOption(false)
  }

  return (
    currentStepIs('InputCourse', step) && (
      <>
        <div>
          <h1>Que curso você deseja iniciar?</h1>
        </div>
        <div>
          <div>
            <textarea
              ref={inputRef}
              name="courseName"
              onChange={({ target }) => {
                target.value = target.value.replace(/(?:^|\s)\S/g, (word) =>
                  word.toUpperCase()
                )
                onSearchCourse(target)
              }}
              autoComplete="off"
              autoFocus
            ></textarea>
            <strong className="hasError">Você nem pesquisou o curso!</strong>
          </div>
          {coursesDesires.length > 0 && (
            <div className="result">
              {!values.courseName && (
                <label htmlFor="courseNameSelected">
                  <strong>É algum desses?</strong>
                </label>
              )}
              {values.courseName && (
                <label htmlFor="courseNameSelected">
                  Este é o curso que você deseja estudar
                </label>
              )}
              <select
                ref={inputRef}
                onChange={onSelectCourse()}
                name="courseName"
                id="courseNameSelected"
              >
                <option value="">Escolha aqui...</option>
                {coursesDesires.map((course, i) => (
                  <option
                    key={i}
                    value={course.name}
                    data-object={JSON.stringify(course)}
                  >
                    {course.name}
                  </option>
                ))}
              </select>
              {!isToggleGradeButton && isSelectedOption && (
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    setToggleGradeButton(true)
                  }}
                >
                  Ver a grade
                </button>
              )}
              {isToggleGradeButton &&
                (fetchedGrade.length ? (
                  <ul>
                    {fetchedGrade.map((grade, i) => (
                      <li key={i}>
                        <span>{grade.discipline}</span>
                        <mark>{grade.hours}</mark>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="fetching">
                    Buscando no servidor, isso pode levar alguns segundos...
                  </div>
                ))}
              <strong className="hasError">
                Você precisa escolher um curso!
              </strong>
            </div>
          )}
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputGroupGraduation',
                progressValue: step.progressValue - 7.69,
              })
            }
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            É este que eu quero
          </button>
        </div>

        <style jsx>{`
          div:nth-child(2) textarea.selected {
            color: #ff9800;
            font-weight: bold;
          }
          div.result {
            margin-top: -8px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: center;
          }
          div.result > div.fetching {
            font-weight: bold;
            margin-top: 28px;
            font-size: 1.3rem;
          }
          div.result select {
            font-size: 1.3rem;
            width: 100%;
            border: 4px solid #292929;
            background: #fff;
            padding: 5px 0px;
            font-weight: 700;
            border-radius: 6px;
          }
          div.result strong {
            font-size: 2rem;
          }
          div.result > button {
            margin-top: 10px;
            padding: 5px;
            border-radius: 6px;
          }
          div.result > ul {
            list-style: none;
            padding: 0;
            font-size: 1.5rem;
            height: 31vh;
            overflow-y: auto;
          }
          div.result > ul li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          div.result > ul li mark {
            padding: 0 5px;
            margin-left: 10px;
            align-self: center;
          }
          div.result > ul li span {
            text-align: left;
            line-height: 1;
          }
        `}</style>
      </>
    )
  )
}

export default InputCourse
