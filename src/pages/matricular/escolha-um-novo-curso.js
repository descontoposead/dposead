import { useRef, useEffect, useState } from 'react'
import {
  useVibrate,
  useToggle,
  useSessionStorage,
  useDebounce,
} from 'react-use'

import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import withStepLayout from '../../components/StepLayout'
import like from '../../helpers/like'

const Step = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [validatesBeforeNavigation, setValidatesBeforeNavigation] = useState()
  const [stepPage] = useState({
    prev: '/matricular/formacao-academica',
    next: '/matricular/escolha-o-metodo-de-pagamento-do-curso',
  })
  const [coursesDesires, setCoursesDesires] = useState([])
  const [typed, setTyped] = useState('')
  const [fetchedGrade, setFetchedGrade] = useState([])
  const [isToggleGradeButton, setToggleGradeButton] = useState(false)
  const [isSelectedOption, setSelectedOption] = useState(false)

  const [{ courses }] = useSessionStorage('scrap', {})
  const [values, setValues] = useSessionStorage('values', {})

  const inputRef = useRef(null)

  useVibrate(vibrating, timers, isInfiniteLoop)

  useDebounce(
    function filterCoursesByTypedAfter1s() {
      if (!typed) return

      setCoursesDesires(
        courses
          .filter(({ name }) => like(typed, name))
          .splice(0, 20)
          .reverse()
      ) //just 20 firsts
    },
    1000,
    [typed]
  )

  useEffect(function validateBeforeNavigation() {
    setValidatesBeforeNavigation({
      inputEl: () => inputRef.current,
      navigationByStep: async () => {
        sessionStorage.setItem('values', JSON.stringify(values))
        window.location.assign(stepPage.next)
      },
      vibrateOnError: () => toggleVibrating(),
    })
  }, [])

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

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
    mergeInputValue(target)
  }

  const onSearchCourse = (target) => {
    if (target.value) {
      setTyped(target.value)
      mergeInputValue(target)
    }

    setFetchedGrade([])
    setToggleGradeButton(false)
    setSelectedOption(false)
  }

  return (
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
            defaultValue={values.courseName}
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
          onClick={() => window.location.assign(stepPage.prev)}
        >
          Voltar
        </button>
        <button className="next" onClick={goToNext(validatesBeforeNavigation)}>
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
}

export default withStepLayout(Step, { progressValue: 67.5 })
